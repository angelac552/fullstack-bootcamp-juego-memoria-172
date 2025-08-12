const tablero = document.getElementById("tablero");
const reiniciarBtn = document.getElementById("reiniciar");

let cartas = ["🍎", "🍌", "🍒", "🍎", "🍌", "🍒"];
let primeraCarta = null;
let bloqueo = false;

function iniciarJuego() {
    tablero.innerHTML = "";
    cartas = cartas.sort(() => 0.5 - Math.random());

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
        if (primeraCarta.dataset.valor === this.dataset.valor) {
            primeraCarta = null;
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

reiniciarBtn.addEventListener("click", iniciarJuego);
iniciarJuego();
