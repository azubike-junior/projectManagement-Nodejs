import { Router } from "express";
import { AuthService } from "./../services/auth.services";
import { UtilService } from "./../services/util.services";
import { CommentController } from "./../controllers/comment";

const commentRoutes = Router();

const utilService = UtilService.getInstance();
const authService = AuthService.getInstance();
const controller = CommentController.getInstance();

commentRoutes
  .get("/", authService.verifyToken, controller.read)
  .get("/:id", authService.verifyToken, controller.readOne)
  .get(
    "/project/:projectId",
    authService.verifyToken,
    controller.readCommentsByProjectId
  )
  .post(
    "/:projectId",
    utilService.commentValidation,
    utilService.validateInput,
    authService.verifyToken,
    controller.create
  )
  .delete(
    "/:id",
    authService.verifyToken,
    controller.delete
  );

// staffRoutes.post("/login", controller.login);09132698984

export default commentRoutes;
