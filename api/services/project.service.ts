import models from "../database/models";
import { ErrorResponse, SuccessResponse } from "../interfaces";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { validationResult, check } from "express-validator";

const { staffs, projects } = models;

export class ProjectService {
  private static classInstance?: ProjectService;
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProjectService();
    }
    return this.classInstance;
  }

  async findOne(projects: any, id: string, comments?: any, tasks?: any) {
    return await projects.findOne({
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
  }

  async findAll(id: any, tasks: any, comments: any) {
    return await projects.findAll({
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
  }
}
