import { Router } from "express";
import { UserController } from "../controllers/staff";
import { StaffService } from "../services/staff.services";

const staffRoutes = Router();

const staffService = StaffService.getInstance();
const controller = UserController.getInstance();

staffRoutes
  .get("/", controller.read)
  .post(
    "/",
    staffService.staffSignupValidation,
    staffService.validateInput,
    controller.create
  )
  .post("/login", controller.login);

// staffRoutes.post("/login", controller.login);

export default staffRoutes;
