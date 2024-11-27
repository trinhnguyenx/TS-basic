import e from "express";

interface decoded{
  userId: string;
  iat: number;
  exp: number;
}

interface Profile extends decoded {
  
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
} // Profile will be {userId, iat, exp, name, bio, avatarUrl}
interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export type { Profile, Token, decoded };
