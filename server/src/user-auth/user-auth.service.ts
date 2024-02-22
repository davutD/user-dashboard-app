import { Injectable } from '@nestjs/common';
import { Node } from 'neo4j-driver';

export type User = Node;

@Injectable()
export class UserAuthService {}
