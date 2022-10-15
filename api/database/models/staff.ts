import {
  ProjectAttributes,
  StaffAttributes,
  Status,
} from "../../interfaces/models";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Staff
    extends Model<InferAttributes<Staff>, InferCreationAttributes<Staff>>
    implements StaffAttributes
  {
    declare id: string;
    declare staffName: string;
    declare email: string;
    // declare password: string;
    declare status: string;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;

    static associate(models: any) {
      // define association here
      // Staff.hasMany(models.projects);
      Staff.hasOne(models.passwords);
      Staff.hasOne(models.tokens);
      Staff.belongsToMany(models.projects, {
        through: "project_staff",
        as: "projects",
        foreignKey: "staffId",
      });
      Staff.belongsToMany(models.tasks, {
        through:"staff_tasks",
        as: "tasks",
        foreignKey:"staffId"
      })
    }
  }
  Staff.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      staffName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "inactive",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },

    {
      timestamps: true,
      sequelize,
      modelName: "staffs",
    }
  );
  return Staff;
};
