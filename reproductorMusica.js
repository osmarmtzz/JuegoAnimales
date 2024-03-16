var audio = new Audio('Sonidos/Transi1.mp3');
audio.loop = true;

function iniciarMusica() {
    audio.play().catch(error => {
        console.error("Error al iniciar la reproducción automática:", error);
    });
}

function detenerMusica() {
    audio.pause();
    audio.currentTime = 0;
}

var audio2 = new Audio('Sonidos/Transicion.mp3');
audio2.loop = true;

function iniciarMusica2() {
    audio2.play().catch(error => {
        console.error("Error al iniciar la reproducción automática:", error);
    });
}