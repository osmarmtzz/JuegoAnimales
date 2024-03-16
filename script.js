document.getElementById("botonJugar").addEventListener("click", function() {
    const alias = document.getElementById('alias').value;
    localStorage.setItem('alias', alias); // Guarda el alias en localStorage
    window.location.href = "juego.html";
});

const animales = [
    { nombre: "Perro", sonido: "Sonidos/Perro.mp3", imagen: "" },
    { nombre: "Gato", sonido: "", imagen: "" },
    { nombre: "Cerdo", sonido: "", imagen: "" },
    { nombre: "Lobo", sonido: "", imagen: "" },
    { nombre: "Pato", sonido: "", imagen: "" },
    { nombre: "Elefante", sonido: "", imagen: "" },
    { nombre: "Caballo", sonido: "", imagen: "" },
    { nombre: "Gallo", sonido: "", imagen: "" },
    { nombre: "Leon", sonido: "", imagen: "" },
];

// Función para reproducir un sonido
function reproducirSonido(nombreSonido) {
    const audio = new Audio(nombreSonido);
    audio.play();
}

// Ejemplo de uso
reproducirSonido('woof.mp3');

// Lógica del juego

// Función para iniciar el juego
function iniciarJuego() {
    const alias = localStorage.getItem('alias'); // Obtener el alias del localStorage
    document.getElementById('aliasPlaceholder').textContent = alias; // Mostrar el alias en la página secundaria
    // Ocultar pantalla de inicio y mostrar pantalla de juego
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    // Iniciar lógica del juego
}

// Función para obtener el alias del jugador del localStorage y mostrarlo en el span
function mostrarAlias() {
    const alias = localStorage.getItem('alias');
    document.getElementById('aliasPlaceholder').textContent = alias;
}

// Llamar a la función al cargar la página
mostrarAlias();