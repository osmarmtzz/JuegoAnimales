var puntuacion = 0;
const animales = [
  {
    nombre: "Perro",
    sonido: "Sonidos/Perro.mp3",
    imagen: "imagenes/Perro.jpg",
    casa: "imagenes/casaPerro.jpg",
  },
  {
    nombre: "Gato",
    sonido: "Sonidos/Gato.mp3",
    imagen: "imagenes/Gato.jpg",
    casa: "imagenes/casaGato.jpg",
  },
  {
    nombre: "Cerdo",
    sonido: "Sonidos/Cerdo.mp3",
    imagen: "imagenes/Cerdo.jpg",
    casa: "imagenes/casaCerdo.jpg",
  },
  {
    nombre: "Lobo",
    sonido: "Sonidos/Lobo.mp3",
    imagen: "imagenes/Lobo.jpg",
    casa: "imagenes/casaLobo.jpg",
  },
  {
    nombre: "Pato",
    sonido: "Sonidos/Pato.mp3",
    imagen: "imagenes/Pato.jpg",
    casa: "imagenes/casaPAto.jpg",
  },
  {
    nombre: "Elefante",
    sonido: "Sonidos/ELEPHANT.mp3",
    imagen: "imagenes/Elefante.jpg",
    casa: "imagenes/casaElefante.jpg",
  },
  {
    nombre: "Caballo",
    sonido: "Sonidos/Caballo.mp3",
    imagen: "imagenes/Caballo.jpg",
    casa: "imagenes/casaCaballo.jpg",
  },
  {
    nombre: "Gallo",
    sonido: "Sonidos/Gallo.mp3",
    imagen: "imagenes/Gallo.jpg",
    casa: "imagenes/casaGallo.jpg",
  },
  {
    nombre: "Leon",
    sonido: "Sonidos/Leon.mp3",
    imagen: "imagenes/Leon.jpg",
    casa: "imagenes/casaLeon.jpg",
  },
];
// Función para obtener una matriz aleatoria de longitud n
function obtenerAleatorios(arr, n) {
  const resultado = new Array(n);
  const copia = [...arr];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * copia.length);
    resultado[i] = copia.splice(index, 1)[0];
  }
  return { seleccionados: resultado, restantes: copia };
}

// Obtener tres animales aleatorios y los restantes
const { seleccionados, restantes } = obtenerAleatorios(animales, 3);

console.log('Animales seleccionados:', seleccionados);
console.log('Animales restantes:', restantes);
function mostrarCasas(casas) {
  console.log('Casas recibidas:', casas);
  const contenedorCasas = document.getElementById("casa");
  // Limpiar el contenido anterior
  contenedorCasas.innerHTML = "";
  // Barajar las casas
  casas.sort(() => Math.random() - 0.5);
  // Mostrar las casas en divs separados con IDs únicos
  casas.forEach((casa, index) => {
    const divCasa = document.createElement("div");
    divCasa.className = "casa";
    divCasa.id = "casa" + (index + 1);
    divCasa.addEventListener("drop", drop);
    divCasa.addEventListener("dragover", allowDrop);
    divCasa.setAttribute('alt', casa.nombre); // Estableciendo el atributo alt con el nombre de la casa
    contenedorCasas.appendChild(divCasa);
    const imagenCasa = document.createElement("img");
    imagenCasa.src = casa.casa;
    imagenCasa.alt = casa.nombre;

    divCasa.appendChild(imagenCasa);
  });
}

// Función para mostrar los animales en el contenedor de animales con IDs únicos y en orden aleatorio
function mostrarAnimales(animales) {
  const contenedorAnimales = document.getElementById("contenedor-animales");
  // Limpiar el contenido anterior
  contenedorAnimales.innerHTML = "";
  // Barajar los animales
  animales.sort(() => Math.random() - 0.5);
  // Mostrar los animales en el contenedor de animales con IDs únicos
  animales.forEach((animal, index) => {
    const divAnimal = document.createElement("div");
    divAnimal.className = "animal";
    divAnimal.id = "animal" + (index + 1);
    divAnimal.draggable = true;
    divAnimal.addEventListener("dragstart", drag);
    contenedorAnimales.appendChild(divAnimal);
    const imagenAnimal = document.createElement("img");
    imagenAnimal.src = animal.imagen;
    imagenAnimal.alt = animal.nombre;
    divAnimal.appendChild(imagenAnimal);
    const nombreParrafo = document.createElement("p");
    nombreParrafo.className = "nombre-animal";
    nombreParrafo.innerText = animal.nombre;

    divAnimal.appendChild(nombreParrafo);
  });
}

// Función para permitir el arrastre de los animales
function drag(ev) {
  var animal = ev.target;
  var nombreAnimal = animal.getAttribute("data-nombre");
  var nombreAlt = animal.getAttribute("alt"); // Usamos el atributo alt como referencia
  ev.dataTransfer.setData("text", nombreAlt); // Establecemos el atributo alt como dato de arrastre
}

// Función para permitir soltar los animales en las casas
function allowDrop(ev) {
  ev.preventDefault();
}

// Función para manejar el evento de soltar un animal en una casa
// Función para manejar el evento de soltar un animal en una casa
// Control de estado para evitar la duplicación del evento
var dropEventHandled = false;

// Función para manejar el evento de soltar un animal en una casa
function drop(ev) {
  ev.preventDefault();

  // Si el evento ya ha sido manejado, salir
  if (dropEventHandled) {
    return;
  }

  var nombreAnimal = ev.dataTransfer.getData("text");
  var casa = ev.target;
  var nombreCasa = casa.getAttribute("alt"); // Cambiamos de "data-nombre" a "alt"

  // Verificar si el animal pertenece a la casa
  if (nombreAnimal && nombreCasa && nombreAnimal === nombreCasa) {
    reproducirSonidoAnimal(nombreAnimal);
    // Sumar 1 punto al puntaje
    sumarPuntuacion(1);
    // Eliminar la imagen del animal
    var imagenAnimal = casa.querySelector('img[alt="' + nombreAnimal + '"]');
    if (imagenAnimal) {
      imagenAnimal.parentNode.removeChild(imagenAnimal);
    }
    // Eliminar la imagen del animal del contenedor de animales
    var imagenArrastrada = document.getElementById("contenedor-animales").querySelector('img[alt="' + nombreAnimal + '"]');
    if (imagenArrastrada) {
      imagenArrastrada.parentNode.removeChild(imagenArrastrada);
    }
    // Verificar si se ha alcanzado el final del juego
    verificarFinJuego();
  } else {
    // Restar 1 punto al puntaje
    sumarPuntuacion(-1);
  }

  // Marcar el evento como manejado
  dropEventHandled = true;

  // Restablecer el control de estado después de un breve período para permitir nuevos eventos
  setTimeout(function() {
    dropEventHandled = false;
  }, 100);
}

function reproducirSonidoAnimal(nombreAnimal) {
  // Obtener el elemento de audio
  var audioAnimal = document.getElementById("audioAnimal");

  // Configurar la fuente del sonido del animal
  var animalSeleccionado = animales.find((animal) => animal.nombre === nombreAnimal);
  if (animalSeleccionado) {
    audioAnimal.src = animalSeleccionado.sonido;
    audioAnimal.play();
  }
}

// Función para sumar o restar puntos a la puntuación
function sumarPuntuacion(puntos) {
  var puntuacionElement = document.getElementById("puntuacion");
  var puntuacionActual = parseInt(puntuacionElement.innerText.split(":")[1].trim());
  var nuevaPuntuacion = puntuacionActual + puntos;
  puntuacionElement.innerText = "▶︎PUNTUACIÓN: " + nuevaPuntuacion;

  // Actualizar la puntuación global
  puntuacion = nuevaPuntuacion;

  // Verificar si se suma correctamente a la puntuación global
  if (puntos === 1) {
    bandera++; // Incrementar la bandera
  }

  // Verificar si se ha alcanzado la puntuación máxima
  if (bandera >= 6) {
    detenerJuego();
  }
}

// Llamada inicial para mostrar la puntuación inicial (0)
sumarPuntuacion(0);

// Llamada a las funciones para mostrar los animales y las casas
mostrarAnimales(seleccionados);
mostrarCasas(seleccionados);

//cm
var cronometroElement = document.getElementById('cronometro');
var seconds = 0; // Tiempo en segundos
var minutes = 0; // Tiempo en minutos
var cronometro;

// Función para iniciar el cronómetro
function startCronometro() {
  mostrarAlias(); // Mostrar el alias del jugador
  cronometro = setInterval(function() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    cronometroElement.textContent = "▶︎TIEMPO TRANSCURRIDO: " + formattedMinutes + ":" + formattedSeconds;    
  }, 1000);
}

// Llamamos a la función para iniciar el cronómetro cuando la página se carga completamente
window.onload = function() {
  startCronometro();
}

// Función para verificar si se han eliminado las tres imágenes principales o si la puntuación alcanza 6
var puntuacion = 0; // Puntuación global
var bandera = 0; // Bandera para contar las veces que se suma a la puntuación global correctamente

function verificarFinJuego() {
  if (document.querySelectorAll("#contenedor-animales img").length === 0 || bandera === 6) {
    
    var contenedorBoton = document.createElement("div");
    contenedorBoton.id = "contenedor-boton";

    var botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar";
    botonContinuar.className = "boton"; // Agregar la clase "boton"
    botonContinuar.addEventListener("click", function() {
      mostrarOtrasImagenes(); // Mostrar otras imágenes después de hacer clic en el botón
      puntuacion = 0; // Reiniciar la puntuación después de continuar
      bandera = 0; // Reiniciar la bandera después de continuar
      contenedorBoton.parentNode.removeChild(contenedorBoton); // Eliminar el contenedor después de hacer clic en el botón
    });
    
    contenedorBoton.appendChild(botonContinuar);
    document.body.appendChild(contenedorBoton);
   
  }
}

function detenerJuego() {
  clearInterval(cronometro); // Detener el cronómetro

  // Obtener el alias del jugador desde localStorage
  const alias = localStorage.getItem('alias');
  console.log('Alias recuperado del localStorage:', alias);
  var tiempo = document.getElementById("cronometro").innerText;

  // Obtener el registro de puntuaciones y tiempos desde localStorage
  let registros = JSON.parse(localStorage.getItem('registros')) || {};

  // Verificar si el usuario ya tiene un registro
  if (!registros[alias] || puntuacion > registros[alias].puntuacion) {
    // Si el usuario no tiene un registro o el nuevo puntaje es mayor, actualizar el registro
    registros[alias] = {
      puntuacion: puntuacion,
      tiempo: tiempo
    };
  }

  // Guardar el registro actualizado en localStorage
  localStorage.setItem("registros", JSON.stringify(registros));

  // Redirigir al usuario a la nueva página con el mensaje, la puntuación y el tiempo
  window.location.href = `final.html?alias=${alias}&puntuacion=${puntuacion}&tiempo=${tiempo}`;
}


// Función para mostrar otras imágenes diferentes una vez que se haga clic en el botón "Continuar"
function mostrarOtrasImagenes() {
  // Obtener tres animales aleatorios diferentes de los restantes
  const { seleccionados: nuevosAnimales, restantes: nuevosRestantes } = obtenerAleatorios(restantes, 3);
  // Mostrar los nuevos animales en el contenedor de animales
  mostrarAnimales(nuevosAnimales);
  // Mostrar las casas nuevamente
  mostrarCasas(nuevosAnimales);
  // Actualizar la lista de restantes
  restantes = nuevosRestantes;
}
function mostrarVentanaPista() {
  var ventanaPista = document.getElementById("ventana-pista");
  ventanaPista.style.display = "block";
}

// Función para cerrar la ventana de pista
function cerrarVentanaPista() {
  var ventanaPista = document.getElementById("ventana-pista");
  ventanaPista.style.display = "none";
}

// Función para reproducir o pausar la música
function toggleMusica() {
  var miMusica = document.getElementById("miMusica");

  if (miMusica.paused) {
    miMusica.play();
  } else {
    miMusica.pause();
  }
}

// Función para verificar si ya existe un alias en el localStorage
function aliasExiste() {
  const alias = localStorage.getItem('alias');
  return alias !== null; // Devuelve true si el alias existe, false si no
}

function mostrarAlias() {
  const alias = localStorage.getItem('alias');
  console.log('Alias recuperado del localStorage:', alias);
  if (alias) {
    document.getElementById('aliasPlaceholder').innerHTML = "Bienvenido, " + alias;
  } else {
    document.getElementById('aliasPlaceholder').innerHTML = "¡Bienvenido!";
  }
}

// Llamar a la función para mostrar el alias del jugador
mostrarAlias();