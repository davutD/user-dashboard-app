import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [Neo4jModule, EncryptionModule],
  providers: [UserAuthService],
  controllers: [UserAuthController],
  exports: [UserAuthService],
})
export class UserAuthModule {}
