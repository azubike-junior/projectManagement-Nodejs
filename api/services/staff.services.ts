import models from "../database/models";
import dotenv from "dotenv";
import { validationResult, check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { Staff } from "../interfaces/user";
import { Status } from "../interfaces/models";
import { UtilService } from "./util.services";

dotenv.config();

const { staffs, passwords, tokens } = models;

const utilService = new UtilService();

export class StaffService {
  private static classInstance?: StaffService;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new StaffService();
    }
    return this.classInstance;
  }

  staffSignupValidation = [
    check("email", "Please enter a valid email").isEmail(),
    check("staffName", "Please enter a staff Name").notEmpty(),
    check(
      "password",
      "Password must start with uppercase, have symbols and numbers"
    ).isStrongPassword({ minLength: 7, minSymbols: 1, minUppercase: 1 }),
  ];

  async getStaffWithEmail(email: string, res?: Response) {
    const staff = await staffs.findOne({
      where: {
        email,
      },
    });
    if (!staff) {
      return res?.status(400).json({
        msg: "Email does not exist",
        error: "user not found",
      });
    }
    return staff;
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

  async authenticate(password: string, staff: Staff, res: Response) {
    try {
      const staffPassword = await passwords.findOne({
        where: {
          staffId: staff.id,
          // status: Status.Active,
        },
      });

      const passwordMatch = utilService.comparePassword(
        password,
        staffPassword.hash
      );

      if (!passwordMatch) {
        return utilService.errorMessage(
          { error: "", msg: "Invalid Login Credential" },
          res,
          400
        );
      }

      const config = {
        secret: process.env.secret,
        expiresIn: process.env.expiresIn,
      };

      const token = utilService.generateToken(staff.id, config);

      const refreshToken = await tokens.create({
        reason: Status.REFRESHTOKEN,
        token: utilService.generateString(100),
        staff: staff.id,
      });

      const savedRefreshToken = await refreshToken.save();

      return utilService.successMessage(
        {
          message: "Login Successfully",
          data: { token, refreshToken: savedRefreshToken.token, staff },
        },
        res,
        200
      );
    } catch (e: any) {

      return utilService.errorMessage(
        { msg: "server error", error: e },
        res,
        500
      );
    }
  }
}
