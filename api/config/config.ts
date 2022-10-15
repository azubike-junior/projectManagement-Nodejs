import { Config } from "../interfaces";
import dotenv from "dotenv";

dotenv.config();

export const config: Config = {
  production: {
    url: "postgresql://postgres:intimacy-119900@localhost:5432/pm3",
  },
  development: {
    url: "postgresql://postgres:intimacy-119900@localhost:5432/pm3",
  },
  expiresIn: process.env.expiresIn ,
  secret: process.env.secret || "",
};
