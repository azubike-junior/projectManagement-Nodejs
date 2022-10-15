import models from "../database/models";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { UtilService } from "./util.services";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

dotenv.config();

const utilService = new UtilService();

export class AuthService {
  private static classInstance?: AuthService;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AuthService();
    }
    return this.classInstance;
  }

  tokenExist(req: Request, res: Response, next: NextFunction) {
    let token;
    try {
      token =
        req.header("Authorization") ||
        req.body.headers["Authorization"] ||
        req.get("Authorization") ||
        req.body.headers["authorization"] ||
        req.get("authorization");

      if (!token) {
        res.status(401).json({
          error: "auth token missing",
          msg: "unauthorized request",
        });
      }
      // console.log(">>>>token", token);

      return token;
    } catch (e) {
      res.status(401).json({
        error: "auth token missing",
        msg: "unauthorized request",
      });
    }
  }

  async verifyToken(req: any, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    try {
      if (!token)
        return res.status(401).json({
          error: "auth token missing s",
          msg: "unauthorized request",
        });

      const staffToken = token.split(" ")[1];
      const decodedToken = utilService.decodeToken(staffToken, config);
      req.staff = decodedToken;
      next();
    } catch (e) {
      return res.status(401).json({
        error: e,
        msg: "Invalid token",
      });
    }
  }
}
