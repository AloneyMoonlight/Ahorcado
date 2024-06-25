import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

indexRouter.get("/*", (req, res) => {
  res.render("404", { title: "404" });
});

export default indexRouter;
