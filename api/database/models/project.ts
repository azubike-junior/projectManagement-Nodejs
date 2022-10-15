import { ProjectAttributes, Status } from "../../interfaces/models";
// import staffModel from "./staff";
import db from "./index";
// import Staff from "./staff";

import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

// const projectSchema = {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM(...Object.values(Status)),
//     defaultValue: Status.Active,
//   },
//   commentId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   taskId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   staffId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
// };
// // Project.hasMany()

module.exports = (sequelize: any, DataTypes: any) => {
  class Project
    extends Model<InferAttributes<Project>, InferCreationAttributes<Project>>
    implements ProjectAttributes
  {
    declare id: string;
    declare title: string;
    declare status: string;
    declare description: string;
    declare staffId: number;
    declare taskId: number;
    declare commentId: number;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;

    static associate(models: any) {
      // define association here
      Project.hasMany(models.comments);
      Project.hasMany(models.tasks);
      Project.belongsTo(models.staffs);
      Project.belongsToMany(models.staffs, {
        through: "project_staff",
        as: "staffs",
        foreignKey: "projectId",
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      commentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      taskId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      staffId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "projects",
    }
  );
  return Project;
};
