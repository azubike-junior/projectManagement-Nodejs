import { Request, Response } from "express";
import { StaffService } from "../services/staff.services";
import models from "../database/models";
// import { UtilService } from "../services/util.service";
import { Status } from "../interfaces/models";
import { UtilService } from "../services/util.services";

const staffService = StaffService.getInstance();
const utilService = UtilService.getInstance();

const { staffs, passwords } = models;

export class UserController {
  private static classInstance?: UserController;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UserController();
    }
    return this.classInstance;
  }

  async create(req: Request, res: Response) {
    try {
      const { email, password, staffName } = req.body;
      const staff = await staffs.findOne({
        where: { email },
      });

      if (staff) {
        return utilService.errorMessage(
          { error: "", msg: "Staff Already Exist" },
          res,
          400
        );
      }

      const newStaff = await staffs.create({
        staffName,
        email,
        status: "inactive",
      });

      await newStaff.save();

      const hashPassword = await passwords.create({
        hash: password,
        salt: 10,
        status: "pending",
        staffId: newStaff.id,
      });

      await hashPassword.save();

      return utilService.successMessage(
        { message: "Staff Created", data: newStaff },
        res,
        201
      );
    } catch (e) {
      throw e;
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const staff = await staffs.findOne({
      where: {
        email,
      },
    });

    if (!staff) {
      return utilService.errorMessage(
        { msg: "Invalid Login Credentials", error: "" },
        res,
        401
      );
    }

    // if (staff.status === "inactive") {
    //   return utilService.errorMessage(
    //     { msg: "Please verify user", error: "User not verified" },
    //     res,
    //     401
    //   );
    // }

    const authenticated = await staffService.authenticate(password, staff, res);
    // console.log(">>>>", authenticated)

    return authenticated;
  }

  async read(req: Request, res: Response) {
    const allStaffs = await staffs.findAll();

    return utilService.successMessage(
      {
        message: "retrieved success",
        data: allStaffs,
      },
      res,
      200
    );
  }
}
