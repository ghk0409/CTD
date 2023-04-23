import { Injectable } from '@nestjs/common';
import { ClaudeResponseDto } from './dtos/claude.dto';
import { AiEntity } from './entities/ai.entity';
import { DataSource } from 'typeorm';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AiService {
    constructor(
        private dataSource: DataSource,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    private readonly apiKey: string = this.configService.get('API_KEY');
    private readonly apiUrl: string = this.configService.get('API_URL');

    async claude(userId: number): Promise<ClaudeResponseDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        // 트랜잭션 시작
        console.log('트랜잭션 시작');
        await queryRunner.startTransaction();

        const aiRepository = queryRunner.manager.getRepository(AiEntity);
        const todoRepository = queryRunner.manager.getRepository(TodoEntity);

        try {
            // 해당 유저의 To-Do 가져오기 (최근 3개)
            const todos = await todoRepository.find({
                where: { user: { id: userId } },
                order: { createdAt: 'DESC' },
                take: 3,
            });

            // To-Do가 없으면 에러
            if (todos === undefined || todos.length === 0) {
                throw new Error('ToDo 리스트가 없습니다');
            }

            // To-Do 내용만 가져오기
            const userTodos = todos
                .map((todo, i) => {
                    return `${i + 1}.${todo.content}`;
                })
                .join(' ');

            // 클로드 API 호출
            const result = await this.claudeApi(userTodos);

            if (result.data) {
                let userAi = await aiRepository.findOne({
                    where: { user: { id: userId } },
                });

                if (userAi) {
                    // 기존에 있으면 업데이트
                    userAi.sentence = result.data.completion;
                } else {
                    // 없으면 생성
                    userAi = aiRepository.create({
                        user: { id: userId },
                        sentence: result.data.completion,
                    });
                }

                // DB에 저장
                await aiRepository.save(userAi);
            }
            // 트랜잭션 커밋
            await queryRunner.commitTransaction();

            return {
                ok: true,
                data: {
                    userId,
                    claude: result.data.completion,
                },
            };
        } catch (error) {
            // 트랜잭션 롤백
            await queryRunner.rollbackTransaction();
            return {
                ok: false,
                error: `클로드 호출 실패: ${error.message}`,
            };
        } finally {
            // 트랜잭션 종료
            await queryRunner.release();
        }
    }

    // 클로드 API 호출 메서드
    private claudeApi(userTodos: string): Promise<any> {
        const userQuestion = `\n\nHuman: 내 투두 리스트 어떻게 생각해? ${userTodos}\n\nAssistant:`;
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
        };

        const datas = {
            prompt: userQuestion,
            model: 'claude-v1.3',
            max_tokens_to_sample: 500,
            stop_sequences: ['\n\nHuman'],
        };

        return this.httpService.axiosRef({
            method: 'post',
            url: this.apiUrl,
            data: datas,
            headers: headers,
        });
    }
}
