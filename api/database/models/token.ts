import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import {
  ProjectAttributes,
  Status,
  TokenAttributes,
} from "../../interfaces/models";

// const tokenSchema = {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//   },
//   token: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   reason: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   isRevoked: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
//   staffId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
// };

// const Token: ModelDefined<ProjectAttributes, ""> = db.sequelize.define(
//   "Projects",
//   tokenSchema
// );

// Token.hasOne(Staff, {
//   foreignKey: "staffId",
//   as: "staff",
// });

module.exports = (sequelize: any, DataTypes: any) => {
  class Token
    extends Model<InferAttributes<Token>, InferCreationAttributes<Token>>
    implements TokenAttributes
  {
    declare id: string;
    declare token: string;
    declare reason: number;
    declare isRevoked: string;
    declare staffId: number;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;

    static associate(models: any) {
      // define association here
      Token.belongsTo(models.staffs);
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isRevoked: {
        type: DataTypes.STRING,
        defaultValue: "active",
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
      modelName: "tokens",
    }
  );
  return Token;
};
