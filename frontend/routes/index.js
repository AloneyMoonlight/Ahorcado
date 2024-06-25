import { Router } from "express";
import {
  getPalabras,
  getPuntajes,
  palabraRandom,
  agregarPuntaje,
} from "../../db/dbLogic.js";

const indexRouter = Router();
async function palabraRandomm() {
  return await palabraRandom();
}

indexRouter.get("/", async (req, res) => {
  let puntajes = await getPuntajes();
  res.render("index", { puntajes });
});

indexRouter.get("/palabraRandom", async (req, res) => {
  let palabra = await palabraRandomm();
  res.send(palabra[0].texto);
});

indexRouter.post("/agregarPuntaje", async (req, res) => {
  console.log(req.body);
  const { puntaje, nombre } = req.body;
  let a = await agregarPuntaje(puntaje, nombre);
  res.send(a);
});

export default indexRouter;
