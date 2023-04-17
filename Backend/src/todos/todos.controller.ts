import { Controller } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    // @Post()
    // @HttpCode(201)
    // @ApiOperation({
    //     summary: '유저 회원가입 API',
    //     description: '유저를 생성한다',
    // })
    // @ApiCreatedResponse({
    //     description: '유저 회원가입 성공',
    //     type: CreateAccountResponseDto,
    // })
    // @ApiBody({ type: CreateAccountRequestDto })
    // async createTodo(
    //     @Body() createAccountRequestDto: CreateAccountRequestDto,
    // ): Promise<CreateAccountResponseDto> {
    //     return this.usersService.createAccount(createAccountRequestDto);
    // }
}
