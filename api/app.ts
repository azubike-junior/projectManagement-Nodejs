import express from "express";
import db from "./database/models";
import appRouter from "./routes";
const app = express();

const port = 4003;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", appRouter);

db.sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection to DB has been established successfully.");
    // await db.sequelize.sync({});
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("server up and running");
});

app.listen(port, () => console.log(`app running on ${port}`));

export default app;
