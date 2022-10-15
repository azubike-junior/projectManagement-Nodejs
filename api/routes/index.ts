import { Router } from "express";
import staffRoutes from "./staff.route.";
import projectRoutes from './project.route';
import commentRoutes from './comment.route';
import taskRoutes from './task.route';

const appRouter = Router();

appRouter.use("/staffs", staffRoutes);
appRouter.use("/projects", projectRoutes)
appRouter.use("/comments", commentRoutes);
appRouter.use("/tasks", taskRoutes);



export default appRouter