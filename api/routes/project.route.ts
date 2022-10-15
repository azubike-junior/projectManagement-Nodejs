import { Router } from "express";
import { AuthService } from "./../services/auth.services";
import { ProjectController } from "./../controllers/project";
import { UtilService } from "./../services/util.services";

const projectRoutes = Router();

const utilService = UtilService.getInstance();
const authService = AuthService.getInstance();
const controller = ProjectController.getInstance();

projectRoutes
  .get("/", authService.verifyToken, controller.read)
  .get("/:id", authService.verifyToken, controller.readOne)
  .get(
    "/readStaffsAssignedToProject/:id",
    authService.verifyToken,
    controller.readStaffsAssignedToProject
  )
  .post(
    "/",
    utilService.projectValidation,
    utilService.validateInput,
    authService.verifyToken,
    controller.create
  )
  .post(
    "/assignStaffs/:id",
    utilService.AssignStaffValidation,
    utilService.validateInput,
    authService.verifyToken,
    controller.assignStaffsToProject
  );

// staffRoutes.post("/login", controller.login);09132698984

export default projectRoutes;
