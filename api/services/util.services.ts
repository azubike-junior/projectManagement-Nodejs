import models from "../database/models";
import { ErrorResponse, SuccessResponse } from "../interfaces";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { validationResult, check } from "express-validator";

import { Staff } from "../interfaces/user";
import { Status } from "../interfaces/models";

// const { staffs, passwords } = models;

export class UtilService {
  private static classInstance?: UtilService;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UtilService();
    }
    return this.classInstance;
  }

  public generateString(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  successMessage = (
    responseData: SuccessResponse,
    res: Response,
    statusCode: number
  ) => res.status(statusCode).json({ ...responseData, status: true });

  errorMessage = (
    errorData: ErrorResponse,
    res: Response,
    statusCode: number
  ) => res.status(statusCode).json({ ...errorData, status: false });

  generateToken(staffId: string, configs: any) {
    const { secret, ...options } = configs;
    try {
      return jwt.sign({ staffId }, secret, options);
    } catch (e) {
      throw e;
    }
  }

  decodeToken(token: string, config: any) {
    try {
      const { secret, ...options } = config;
      const stuff = jwt.verify(token, secret);
      return stuff;
    } catch (e) {
      throw e;
    }
  }

  hashPassword(password: string, salt: number) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(salt));
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async validateInput(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    return next();
  }

  projectValidation = [
    check("title", "Please enter project title").notEmpty(),
    check("description", "Please enter project description").notEmpty(),
  ];

  AssignStaffValidation = [
    check("staffId", "Please enter staffId").notEmpty().isUUID(),
  ];

  commentValidation = [
    check("content", "Please enter project title").notEmpty(),
  ];
}
