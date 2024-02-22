import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Node } from 'neo4j-driver';
import { EncryptionService } from 'src/encryption/encryption.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import 'dotenv/config';
import { SignInDto } from 'src/user-auth/dto/user-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtExpiration } from 'src/shared/enums';

export type User = Node;

@Injectable()
export class AuthService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    signInDto: SignInDto,
  ): Promise<{ access_token: string } | null | string> {
    try {
      const { email, password } = signInDto;

      const user = await this.neo4jService.read(
        'MATCH(u:User{email:$email}) RETURN u as user',
        { email },
      );

      // if (!user)
      //   throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      if (
        await this.encryptionService.compare(
          password,
          user.records[0].get('user').properties.password,
        )
      ) {
        const user_properties = user.records[0].get('user').properties;
        const payload = {
          email: user_properties.email,
          name: user_properties.name,
          surname: user_properties.surname,
          sub: user_properties.id,
        };

        signInDto.signInTime = new Date();

        return {
          access_token: this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: JwtExpiration.ONE_HOUR,
          }),
        };
      } else {
        throw new HttpException(
          'Password does not match',
          HttpStatus.BAD_REQUEST,
        );
      }
      //return 'Passwords does not match, enter correct password.';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(
    email: string,
    name: string,
    surname: string,
    password: string,
  ): Promise<CreateUserDto> {
    try {
      const result = await this.neo4jService.write(
        `CREATE(u:User)
      SET u+=$properties, u.id=randomUUID()
      RETURN u as user`,
        {
          properties: {
            email,
            name,
            surname,
            password: await this.encryptionService.hash(password),
          },
        },
      );

      return result.records[0].get('user').properties;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
