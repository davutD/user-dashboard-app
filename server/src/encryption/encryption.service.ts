import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  async hash(plain: string): Promise<string> {
    try {
      return hash(
        plain,
        await this.configService.get<number>(process.env.HASH_ROUNDS, 10),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }
}
