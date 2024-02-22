import { Request as ExpressRequest } from 'express';

export interface CustomRequest extends ExpressRequest {
  user?: { access_token: string }; // Define the user property with the appropriate structure
}
