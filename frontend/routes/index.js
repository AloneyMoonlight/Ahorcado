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
  if (puntajes.length == 0) {
    puntajes = [
      {
        nombre_usuario: "No hay puntajes",
        valor_puntaje: 0,
        fecha_puntaje: "0000-00-00",
      },
    ];
  }
  res.render("index", { puntajes });
});

indexRouter.get("/palabraRandom", async (req, res) => {
  let palabra = await palabraRandomm();
  res.send(palabra);
});

indexRouter.post("/agregarPuntaje", async (req, res) => {
  console.log(req.body);
  const { puntaje, nombre } = req.body;
  let a = await agregarPuntaje(puntaje, nombre);
  res.send(a);
});

export default indexRouter;
