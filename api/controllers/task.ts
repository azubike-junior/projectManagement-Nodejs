import { Request, Response } from "express";
import { StaffService } from "../services/staff.services";
import models from "../database/models";
import { UtilService } from "../services/util.services";

const staffService = StaffService.getInstance();
const utilService = UtilService.getInstance();

const { projects, staffs, comments, tasks, project_staffs, staff_tasks } =
  models;

export class TaskController {
  private static classInstance?: TaskController;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new TaskController();
    }
    return this.classInstance;
  }

  async read(req: any, res: Response) {
    const { id } = req.params;
    const allTasks = await tasks.findAll({
      where: {
        projectId: id,
      },
    });
    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: allTasks,
      },
      res,
      200
    );
  }

  async readTasksByStaffId(req: any, res: Response) {
    const { staffId } = req.staff;
    const allTasksByStaff = await tasks.findAll({
      where: {
        staffId,
      },
    });
    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: allTasksByStaff,
      },
      res,
      200
    );
  }

  async assignStaffsToTask(req: any, res: Response) {
    const { staffId, projectId } = req.body;
    const { id } = req.params;

    const task = await tasks.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      return utilService.errorMessage(
        {
          error: "",
          msg: "Not Found",
        },
        res,
        404
      );
    }

    console.log(">>>got here one");

    //check if staffs is under the task's project
    const projectStaffs = await project_staffs.findOne({
      where: {
        staffId,
        projectId,
      },
    });

    console.log(">>>>>>project Staffs");

    if (!projectStaffs) {
      return utilService.errorMessage(
        {
          error: "",
          msg: "This staff is not assigned to the project",
        },
        res,
        404
      );
    }

    console.log(">>>got here two");
    //check if staff has been assigned to task already
    const isTaskAssignedToStaff = await staff_tasks.findOne({
      where: {
        staffId,
      },
    });

    if (isTaskAssignedToStaff) {
      return utilService.errorMessage(
        {
          error: "",
          msg: "This staff has been assigned to this task already",
        },
        res,
        404
      );
    }

    console.log(">>>got here three");

    const assignStaffToTask = await staff_tasks.create({
      taskId: id,
      staffId,
    });

    assignStaffToTask.save();

    return utilService.successMessage(
      {
        data: "",
        message: "staff Assigned successfully",
      },
      res,
      201
    );
  }

  async readStaffsAssignedToTasks(req: Request, res: Response) {
    const { id } = req.params;

    const staffs = await staff_tasks.findAll({
      where: {
        taskId: id,
      },
    });

    return utilService.successMessage(
      {
        message: "successfully retrieved",
        data: staffs,
      },
      res,
      200
    );
  }

  async readTasksByProjectId(req: Request, res: Response) {
    const { projectId } = req.params;

    const allTasksOfProject = await tasks.findAll({
      where: {
        projectId,
      },
    });

    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: allTasksOfProject,
      },
      res,
      200
    );
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const task = await tasks.findOne({
      where: {
        id,
      },
    });
    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: task,
      },
      res,
      200
    );
  }

  async create(req: any, res: Response) {
    const { content } = req.body;
    const { id } = req.params;

    try {
      const task = await tasks.create({
        content,
        projectId: id,
      });

      await task.save();

      return utilService.successMessage(
        {
          message: "successfully created",
          data: "00",
        },
        res,
        201
      );
    } catch (e) {
      console.log(e);
    }
  }

  async readTasksByStatus(req: Request, res: Response) {
    const { status } = req.body;

    const allTasks = tasks.findAll({
      where: {
        status,
      },
    });

    return utilService.successMessage(
      {
        message: "successfully retrieved",
        data: allTasks,
      },
      res,
      200
    );
  }

  async update(req: any, res: Response) {}

  async delete(req: any, res: Response) {
    const { id } = req.params;

    await tasks.destroy({
      where: { id },
    });

    return utilService.successMessage(
      {
        message: "project deletion success",
        data: "00",
      },
      res,
      200
    );
  }
}
