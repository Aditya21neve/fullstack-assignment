import { Request } from "express";

declare module "express" {
  export interface Request {
    file?: any;
    user?: {
      id: string;
      email: string;
    };
  }
}
