import { Request, Response } from "express";
import { StaffService } from "../services/staff.services";
import models from "../database/models";
// import { UtilService } from "../services/util.service";
import { Status } from "../interfaces/models";
import { UtilService } from "../services/util.services";

const staffService = StaffService.getInstance();
const utilService = UtilService.getInstance();

const { comments } = models;

export class CommentController {
  private static classInstance?: CommentController;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new CommentController();
    }
    return this.classInstance;
  }

  async read(req: any, res: Response) {
    const allProjects = await comments.findAll();
    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: allProjects,
      },
      res,
      200
    );
  }

  async readCommentsByProjectId(req: any, res: Response) {
    const { projectId } = req.params;

    const allCommentsOfProject = await comments.findAll({
      where: {
        projectId,
      },
    });
    return utilService.successMessage(
      {
        message: "successfully Retrieved",
        data: allCommentsOfProject,
      },
      res,
      200
    );
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const project = await comments.findOne({
      where: {
        id,
      },
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

  async create(req: any, res: Response) {
    const { content } = req.body;
    const { projectId } = req.params;

    try {
      const comment = await comments.create({
        content,
        projectId,
      });

      await comment.save();

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

  async update(req: any, res: Response) {}

  async delete(req: any, res: Response) {
    const { id } = req.params;

    await comments.destroy({
      where: { id },
    });

    return utilService.successMessage(
      {
        message: "comment deletion success",
        data: "00",
      },
      res,
      201
    );
  }
}
