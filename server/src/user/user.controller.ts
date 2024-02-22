import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUser } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('dashboard')
  async getAll(): Promise<CreateUserDto[]> {
    const result = await this.userService.getAll();
    return result;
  }

  @Post('user')
  async addUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const result = await this.userService.addUser(createUserDto);
    return result;
  }

  @Put('user')
  async updateUser(
    @Body() userId: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UpdateUser> {
    const result = await this.userService.updateUser(
      createUserDto.id,
      createUserDto,
    );
    return result;
  }

  @Delete('user')
  async deleteUserById(@Body() body: { userId: string }): Promise<string> {
    const { userId } = body;
    const result = await this.userService.deleteUserById(userId);
    return result;
  }
}
