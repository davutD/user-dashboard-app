import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { CreateUserDto, UpdateUser } from './dto/create-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAll(): Promise<CreateUserDto[]> {
    try {
      const result = await this.neo4jService.read(
        `MATCH (p:Person) RETURN p as person`,
        {},
      );
      const data = result.records.map(
        (record) => record.get('person').properties,
      );

      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const result = await this.neo4jService.write(
        `CREATE(p:Person)
        SET p+=$properties, p.id=randomUUID()
        RETURN p as person`,
        {
          properties: {
            ...createUserDto,
          },
        },
      );

      return result.records[0].get('person');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(
    userId: string,
    updateUser: UpdateUser,
  ): Promise<UpdateUser> {
    try {
      const validationErrors = await validate(updateUser);
      console.log(validationErrors);
      if (validationErrors.length > 0) {
        throw new BadRequestException('Validation failed');
      }

      const allowedFields = [
        'name',
        'surname',
        'id',
        'address',
        'gender',
        'country',
        'jobTitle',
        'birthDate',
        'email',
      ];
      const updateUserKeys = Object.keys(updateUser);
      const extraFields = updateUserKeys.filter(
        (key) => !allowedFields.includes(key),
      );

      if (extraFields.length > 0) {
        throw new BadRequestException(
          `Extra fields not allowed: ${extraFields.join(', ')}`,
        );
      }

      const result = await this.neo4jService.write(
        `MATCH(p:Person{id:$userId})
        SET p+=$properties
        RETURN p as person`,
        {
          userId,
          properties: updateUser,
        },
      );

      return result.records[0].get('person');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserById(userId: string): Promise<string> {
    try {
      const result = await this.neo4jService.write(
        `MATCH (p:Person {id: $userId})
        DELETE p
        RETURN COUNT(p) as deletedCount`,
        { userId },
      );

      const deletedCount = result.records[0].get('deletedCount').toNumber();

      return deletedCount;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
