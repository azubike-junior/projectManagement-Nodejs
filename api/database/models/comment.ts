import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { CommentAttributes } from "../../interfaces/models";
// import Project from "./project";

module.exports = (sequelize: any, DataTypes: any) => {
  class Comment
    extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>>
    implements CommentAttributes
  {
    declare id: string;
    declare content: string;
    declare updatedAt: string;
    declare createdAt: string;
    declare deletedAt?: string;

    static associate(models: any) {
      Comment.belongsTo(models.projects);
    }
  }
  Comment.init(
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "comments",
    }
  );
  return Comment;
};
