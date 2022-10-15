import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { PasswordAttributes, Status } from "../../interfaces/models";
import { Staff } from "../../interfaces/user";
import bcrypt, { hash } from "bcryptjs";
import { AuthService } from "./../../services/auth.services";
import { UtilService } from "../../services/util.services";

const utilService = new UtilService();

module.exports = (sequelize: any, DataTypes: any) => {
  class Password
    extends Model<InferAttributes<Password>, InferCreationAttributes<Password>>
    implements PasswordAttributes
  {
    declare id: string;
    declare hash: string;
    declare salt: number;
    declare status: string;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;

    static associate(models: any) {
      Password.belongsTo(models.staffs);

      this.beforeCreate((staff: any, options: any) => {
        staff.password = utilService.hashPassword(staff.hash, 10);
        return staff.password;
      });
    }
  }
  Password.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "passwords",

      hooks: {
        beforeCreate: (staff, options) => {
          const hashedPassword = bcrypt.hashSync(
            staff.hash,
            bcrypt.genSaltSync(10)
          );
          staff.hash = hashedPassword;
        },
      },
    }
  );
  return Password;
};
