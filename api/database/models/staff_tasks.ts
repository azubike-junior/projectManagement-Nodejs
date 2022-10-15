import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { StaffTaskAttributes } from "../../interfaces/models";
// import Project from "./project";

module.exports = (sequelize: any, DataTypes: any) => {
  class StaffTask
    extends Model<
      InferAttributes<StaffTask>,
      InferCreationAttributes<StaffTask>
    >
    implements StaffTaskAttributes
  {
    declare id: string;
    declare taskId: string;
    declare staffId: string;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;
  }
  StaffTask.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      taskId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      staffId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "staff_tasks",
    }
  );
  StaffTask.removeAttribute("id");
  return StaffTask;
};
