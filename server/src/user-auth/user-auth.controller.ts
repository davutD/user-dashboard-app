import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { SignInDto, SignUpDto } from '../user-auth/dto/user-auth.dto';

@Controller()
export class UserAuthController {}
