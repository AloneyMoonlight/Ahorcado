import { pool } from "./db.js";

export const agregarPalabra = async (palabra) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO palabras (texto) VALUES (?)",
      [palabra]
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
export const getPalabras = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM palabras");
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};
export const getPalabra = async (id) => {
  try {
    const [result] = await pool.query("SELECT * FROM palabras WHERE id = ?", [
      id,
    ]);
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};

export const palabraRandom = async () => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM palabras ORDER BY RAND() LIMIT 1"
    );
    console.table(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const agregarPuntaje = async (puntaje, nombre) => {
  //obtener la fecha actual como YYYY-MM-DD
  let date_ob = new Date();
  let year = date_ob.getFullYear();
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let day = ("0" + date_ob.getDate()).slice(-2);
  let fecha = year + "-" + month + "-" + day;
  console.log(fecha);
  try {
    const [result] = await pool.query(
      "INSERT INTO puntajes (nombre_usuario, valor_puntaje,fecha_puntaje) VALUES (?, ?,?)",
      [nombre, puntaje, fecha]
    );
    console.log(result);
    return "puntaje agregado";
  } catch (error) {
    console.error(error);
    return "hubo un error al agregar el puntaje";
  }
};
export const getPuntajes = async () => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM puntajes ORDER BY id_puntaje DESC LIMIT 5;"
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
