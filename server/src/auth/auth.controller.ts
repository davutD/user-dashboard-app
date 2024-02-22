import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CustomRequest } from './custom-request';
import { SignUpDto } from '../user-auth/dto/user-auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  async signIn(
    @Req() request: CustomRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    // response.cookie('jwt', request.user?.access_token, { httpOnly: true });
    // return request.user?.access_token;

    const jwtToken = request.user?.access_token;
    response.cookie('jwt', jwtToken, { httpOnly: false });
    return {
      jwtToken,
      message: 'Signin successful',
    };
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<CreateUserDto> {
    const user = await this.authService.signUp(
      signUpDto.email,
      signUpDto.name,
      signUpDto.surname,
      signUpDto.password,
    );

    return user;
  }

  @Post('signout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Success!',
    };
  }
}
