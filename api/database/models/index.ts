// "use strict";
import { config } from "../../config/config";
import fs from "fs";
import path from "path";
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db: any = {};

let sequelize: any;
const configPath =
  env === "development" ? config.development : config.production;

sequelize =
  env === "development"
    ? new Sequelize(configPath.url, { dialect: "postgres" })
    : new Sequelize(configPath.url, { dialect: "postgres" });

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
