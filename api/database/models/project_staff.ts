import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { ProjectStaffAttributes } from "../../interfaces/models";
// import Project from "./project";

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectStaff
    extends Model<
      InferAttributes<ProjectStaff>,
      InferCreationAttributes<ProjectStaff>
    >
    implements ProjectStaffAttributes
  {
    // declare id: string;
    declare id: string;
    declare projectId: string;
    declare staffId: string;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;
  }
  ProjectStaff.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      projectId: {
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
      modelName: "project_staffs",
    }
  );
  ProjectStaff.removeAttribute("id");
  return ProjectStaff;
};
