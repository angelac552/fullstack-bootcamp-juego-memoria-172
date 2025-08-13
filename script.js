const tablero = document.getElementById("tablero");
const reiniciarBtn = document.getElementById("reiniciar");
const contadorElement = document.getElementById("contador-movimientos");
const sonidoExito = new Audio("mission-success-41211.mp3");

let cartas = ["🍎", "🍌", "🍒", "🍎", "🍌", "🍒"];
let primeraCarta = null;
let bloqueo = false;
let movimientos = 0;

function actualizarContador() {
    contadorElement.textContent = `Movimientos: ${movimientos}`;
}

function iniciarJuego() {
    tablero.innerHTML = "";
    cartas = cartas.sort(() => 0.5 - Math.random());
     movimientos = 0;
    actualizarContador();

    cartas.forEach((emoji) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = emoji;
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });
}

function voltearCarta() {
    if (bloqueo || this.classList.contains("volteada")) return;

    this.textContent = this.dataset.valor;
    this.classList.add("volteada");

    if (!primeraCarta) {
        primeraCarta = this;
    } else {
        movimientos++;
        actualizarContador();

        if (primeraCarta.dataset.valor === this.dataset.valor) {
             sonidoExito.play().catch(error => {
                console.log("No se pudo reproducir el sonido:", error);
            });
            primeraCarta = null;
            verificarVictoria();

        } else {
            bloqueo = true;
            setTimeout(() => {
                primeraCarta.textContent = "";
                this.textContent = "";
                primeraCarta.classList.remove("volteada");
                this.classList.remove("volteada");
                primeraCarta = null;
                bloqueo = false;
            }, 800);
        }
    }
}

function verificarVictoria() {
    const cartasVolteadas = document.querySelectorAll('.carta.volteada');
    if (cartasVolteadas.length === cartas.length) {
        setTimeout(() => {
            alert(`¡Felicidades! Completaste el juego en ${movimientos} movimientos`);
        }, 500);
    }
}

reiniciarBtn.addEventListener("click", iniciarJuego);
iniciarJuego();
