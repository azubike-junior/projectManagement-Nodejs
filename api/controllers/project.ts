import { Request, Response } from "express";
import { StaffService } from "../services/staff.services";
import models from "../database/models";
// import { UtilService } from "../services/util.service";
import { Status } from "../interfaces/models";
import { UtilService } from "../services/util.services";
import { off } from "process";
import { ProjectService } from "./../services/project.service";

const staffService = StaffService.getInstance();
const utilService = UtilService.getInstance();
const projectService = ProjectService.getInstance();

const { staffs, projects, comments, tasks, project_staffs } = models;

export class ProjectController {
  private static classInstance?: ProjectController;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProjectController();
    }
    return this.classInstance;
  }

  async read(req: any, res: Response) {
    const { staffId } = req.staff;
    const allProjects = await projects.findAll({
      where: {
        staffId,
      },
      include: [
        {
          model: tasks,
        },
        {
          model: comments,
        },
      ],
    });

    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: allProjects,
      },
      res,
      200
    );
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const project = await projects.findOne({
      where: {
        id,
      },
      include: [
        {
          model: tasks,
        },
        {
          model: comments,
        },
      ],
    });

    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: project,
      },
      res,
      200
    );
  }

  async assignStaffsToProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { staffId } = req.body;
      const project = await projects.findOne({
        where: {
          id,
        },
      });

      const staff = await staffs.findOne({
        where: {
          id: staffId,
        },
      });

      if (!project) {
        return utilService.errorMessage(
          {
            error: "",
            msg: "Not Found",
          },
          res,
          404
        );
      }

      if (!staff) {
        return utilService.errorMessage(
          {
            error: "",
            msg: "Not Found",
          },
          res,
          404
        );
      }

      const projectAssigned = await project_staffs.create({
        projectId: id,
        staffId,
      });

      await projectAssigned.save();

      return utilService.successMessage(
        {
          data: "00",
          message: "Project Assigned success",
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

  async create(req: any, res: Response) {
    const { title, description } = req.body;
    const { staffId } = req.staff;

    try {
      const project = await projects.create({
        title,
        description,
        staffId,
      });

      await project.save();

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

  async readProjectByStatus(req: Request, res: Response) {
    const { status } = req.body;

    const allProjects = projects.findAll({
      where: {
        status,
      },
      include: {
        model: [comments, tasks],
      },
    });

    return utilService.successMessage(
      {
        message: "successfully retrieved",
        data: allProjects,
      },
      res,
      200
    );
  }

  async readStaffsAssignedToProject(req: Request, res: Response) {
    const {id} = req.params;

    const staffs = await project_staffs.findAll({
      where: {
        projectId: id
      }
    })

     return utilService.successMessage(
       {
         message: "successfully retrieved",
         data: staffs,
       },
       res,
       200
     );
    
  }

  async update(req: any, res: Response) {}

  async delete(req: any, res: Response) {
    const { id } = req.params;

    await projects.destroy({
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
