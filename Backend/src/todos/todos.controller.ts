import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiQuery,
} from '@nestjs/swagger';
import {
    CreateTodoRequestDto,
    CreateTodoResponseDto,
} from './dtos/create-todo.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { EditTodoRequestDto, EditTodoResponseDto } from './dtos/edit-todo.dto';
import { DeleteTodoResponseDto } from './dtos/delete-todo.dto';
import { ListTodoResponseDto } from './dtos/list-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({
        summary: '유저 To-DO 조회 API',
        description: '해당 유저의 ToDo를 조회한다',
    })
    @ApiCreatedResponse({
        description: 'ToDo 조회 성공',
        type: ListTodoResponseDto,
    })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async getTodos(
        @AuthUser() authUser: UserEntity,
    ): Promise<ListTodoResponseDto> {
        return this.todosService.getTodos(authUser.id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({
        summary: '유저 To-DO 생성 API',
        description: '해당 유저의 ToDo를 생성한다',
    })
    @ApiCreatedResponse({
        description: 'ToDo 생성 성공',
        type: CreateTodoResponseDto,
    })
    @ApiBody({ type: CreateTodoRequestDto })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async createTodo(
        @AuthUser() authUser: UserEntity,
        @Body() createTodoRequestDto: CreateTodoRequestDto,
    ): Promise<CreateTodoResponseDto> {
        return this.todosService.createTodo(authUser.id, createTodoRequestDto);
    }

    @Patch('/:todoId')
    @HttpCode(200)
    @ApiOperation({
        summary: '유저 To-DO 수정 API',
        description: '해당 유저의 ToDo를 수정한다',
    })
    @ApiCreatedResponse({
        description: 'ToDo 수정 성공',
        type: EditTodoResponseDto,
    })
    @ApiQuery({
        name: 'todoId',
        type: Number,
        required: true,
        description: '수정할 ToDo의 ID',
        example: 1,
    })
    @ApiBody({
        type: EditTodoRequestDto,
        description: '수정할 내용',
    })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async editTodo(
        @AuthUser() authUser: UserEntity,
        @Param('todoId') todoId: number,
        @Body() editTodoRequestDto: EditTodoRequestDto,
    ): Promise<EditTodoResponseDto> {
        return this.todosService.editTodo(
            authUser.id,
            todoId,
            editTodoRequestDto,
        );
    }

    @Delete('/:todoId')
    @HttpCode(200)
    @ApiOperation({
        summary: '유저 To-DO 삭제 API',
        description: '해당 유저의 ToDo를 삭제한다',
    })
    @ApiCreatedResponse({
        description: 'ToDo 삭제 성공',
        type: DeleteTodoResponseDto,
    })
    @ApiQuery({
        name: 'todoId',
        type: Number,
        required: true,
        description: '삭제할 ToDo의 ID',
        example: 1,
    })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async deleteTodo(
        @AuthUser() authUser: UserEntity,
        @Param('todoId') todoId: number,
    ): Promise<DeleteTodoResponseDto> {
        return this.todosService.deleteTodo(authUser.id, todoId);
    }
}
