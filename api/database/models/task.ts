// import { ModelDefined, DataTypes } from "sequelize";
import { TaskAttributes, Status } from "../../interfaces/models";
// import db from "./index";

// const taskSchema = {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//   },
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM(...Object.values(Status)),
//     defaultValue: Status.Active,
//   },
//   staffId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
// };

// const Task: ModelDefined<ProjectAttributes, ""> = db.define(
//   "Projects",
//   taskSchema
// );

import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { CommentAttributes } from "../../interfaces/models";

module.exports = (sequelize: any, DataTypes: any) => {
  class Task
    extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>
    implements TaskAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare id: string;
    declare content: string;
    declare staffId: number;
    declare status: string;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;

    static associate(models: any) {
      // define association here
      Task.belongsTo(models.projects);
      // Task.hasMany(models.staffs);
      Task.belongsToMany(models.staffs, {
        through: "staff_tasks",
        as:"tasks",
        foreignKey:"staffId"
      })
    }
  }
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      staffId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "tasks",
    }
  );
  return Task;
};
