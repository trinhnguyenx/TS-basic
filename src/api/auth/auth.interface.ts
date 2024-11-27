import { Request } from 'express';

interface Login {
  email: string;
  password: string;
}
interface Token {
  accessToken: string;
  refreshToken: string;
  // expiresIn: number;
  tokenType: string;
}

//  interface AuthenticatedRequest extends Request {
//   user: {
//     userId: string; // Adjust these fields based on the decoded JWT payload
//     iat: number;
//     exp: number;
//   };
  
// }
interface AuthenticatedRequest extends Request {
  user?: string | object;
}

export type { Login, Token, AuthenticatedRequest };
