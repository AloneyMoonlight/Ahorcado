// Declaración de variables globales
let palabra; // Variable para almacenar la palabra a adivinar
let intentos = 5; // Número de intentos permitidos
let puntaje = 100; // Puntaje inicial del jugador
let victoria = false; // Bandera para indicar si se ha ganado el juego

// Función para obtener una palabra aleatoria del servidor
function obtenerPalabraRandom() {
  fetch("http://localhost:3000/palabraRandom")
    .then((response) => response.json())
    .then((data) => {
      // Al recibir la palabra aleatoria, la asignamos a la variable 'palabra'
      palabra = data[0].texto;
      mostrarPalabraSecreta(); // Llamamos a la función para mostrar la palabra como "_ _ _ ..."
      mostrarIntentos(); // Mostramos los intentos disponibles
    });
}

// Llamamos a la función para obtener una palabra aleatoria al cargar la página
obtenerPalabraRandom();

// Función para agregar el puntaje del jugador al servidor
function agregarPuntaje(puntaje, nombre) {
  fetch("http://localhost:3000/agregarPuntaje", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ puntaje, nombre }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    });
  location.reload(); // Recargamos la página después de agregar el puntaje
}

// Función para mostrar la palabra secreta como "_ _ _ ..." en el HTML
function mostrarPalabraSecreta() {
  let mostrarPalabra = document.getElementById("palabra_secreta");
  mostrarPalabra.innerHTML = "";
  for (let i = 0; i < palabra.length; i++) {
    mostrarPalabra.innerHTML += "_ ";
  }
}

// Función para mostrar los intentos restantes en el HTML
function mostrarIntentos() {
  document.getElementById("intentos_permitidos").textContent = intentos;
}

// Función para verificar si la letra ingresada está en la palabra a adivinar
function verificarLetra() {
  let letra = document.getElementById("letra").value;

  if (palabra.includes(letra)) {
    // Si la letra está en la palabra
    let mostrarPalabra = document.getElementById("palabra_secreta");
    let palabraSecreta = mostrarPalabra.innerHTML.split(" ");
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraSecreta[i] = letra; // Reemplazamos los "_" por la letra correcta
      }
    }
    mostrarPalabra.innerHTML = palabraSecreta.join(" ");
  } else {
    // Si la letra no está en la palabra
    intentos -= 1;
    puntaje -= 20; // Penalizamos al jugador por letra incorrecta
    mostrarIntentos(); // Actualizamos los intentos mostrados
    if (intentos === 0) {
      alert("Perdiste"); // Si se acabaron los intentos, mostramos mensaje de derrota
      location.reload(); // Recargamos la página
    }
  }
}

// Función para verificar si se ha ganado el juego (se adivinaron todas las letras)
function verificarVictoria() {
  let mostrarPalabra = document.getElementById("palabra_secreta");
  let palabraSecreta = mostrarPalabra.innerHTML.split(" ");
  if (!palabraSecreta.includes("_")) {
    // Si ya no quedan "_" en la palabra secreta
    victoria = true; // Se ha ganado el juego
    if (victoria) {
      alert("Ganaste"); // Mostramos mensaje de victoria
      let nombre = prompt("Ingrese su nombre"); // Pedimos al jugador que ingrese su nombre
      agregarPuntaje(puntaje, nombre); // Llamamos a la función para agregar el puntaje con el nombre del jugador
    }
  }
}

// Event listener para verificar la letra ingresada al presionar Enter
document.getElementById("letra").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    verificarLetra(); // Verificamos la letra ingresada
    document.getElementById("letra").value = ""; // Limpiamos el campo de entrada
    verificarVictoria(); // Verificamos si se ha ganado el juego
  }
});
