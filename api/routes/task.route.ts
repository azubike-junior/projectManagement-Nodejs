import { Router } from "express";
import { TaskController } from "../controllers/task";
import { StaffService } from "../services/staff.services";
import { AuthService } from "./../services/auth.services";

const taskRoutes = Router();

const staffService = StaffService.getInstance();
const controller = TaskController.getInstance();
const authService = AuthService.getInstance();

taskRoutes
  .get("/readAll/:id", authService.verifyToken, controller.read)
  .get("/:id", authService.verifyToken, controller.readOne)
  .get(
    "/readTasksByStaffId",
    authService.verifyToken,
    controller.readTasksByStaffId
  )
  .get(
    "/readStaffsAssignedToTasks/:id",
    authService.verifyToken,
    controller.readStaffsAssignedToTasks
  )
  .get(
    "/readTasksByProjectId",
    authService.verifyToken,
    controller.readTasksByProjectId
  )
  .get(
    "/readTasksByStatus",
    authService.verifyToken,
    controller.readTasksByStatus
  )
  .post("/:id", authService.verifyToken, controller.create)
  .post(
    "/assignStaffs/:id",
    authService.verifyToken,
    controller.assignStaffsToTask
  )
  .delete("/", authService.verifyToken, controller.delete);

export default taskRoutes;
