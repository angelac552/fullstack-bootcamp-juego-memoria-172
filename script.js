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



// Variables para nuestras funcionalidades
let dificultadActual = 'facil';
let juegoEnPausa = false;
let conjuntosCartas = {
    facil: ["🍎", "🍌", "🍒", "🍎", "🍌", "🍒"],
    dificil: ["🍎", "🍌", "🍒", "🍓", "🥝", "🍊", "🍎", "🍌", "🍒", "🍓", "🥝", "🍊"],
    legendario: ["🍎", "🍌", "🍒", "🍓", "🥝", "🍊", "🍇", "🥭", "🍎", "🍌", "🍒", "🍓", "🥝", "🍊", "🍇", "🥭"]
};

// Función para seleccionar dificultad
function seleccionarDificultad(nivel) {
    dificultadActual = nivel;
    
    // Cambiamos las cartas globales que usa el código original
    cartas = conjuntosCartas[nivel];
    
    // Cambiamos el estilo del tablero
    tablero.className = 'tablero ' + nivel;
    
    // Reiniciamos usando la función original
    iniciarJuego();
}

// Función para pausar/reanudar
function togglePausa() {
    const botonPausa = document.getElementById('pausa');
    
    if (juegoEnPausa) {
        // Reanudar
        juegoEnPausa = false;
        bloqueo = false; // Desbloqueamos el juego
        tablero.classList.remove('pausado');
        botonPausa.textContent = 'Pausa';
    } else {
        // Pausar
        juegoEnPausa = true;
        bloqueo = true; // Bloqueamos el juego usando la variable original
        tablero.classList.add('pausado');
        botonPausa.textContent = 'Reanudar';
    }
}

// Conectar el botón de pausa
document.getElementById('pausa').addEventListener('click', togglePausa);

// Sobrescribir la función voltearCarta original para incluir la pausa
const voltearCartaOriginal = voltearCarta;
voltearCarta = function() {
    // Si está pausado, no hacer nada
    if (juegoEnPausa) return;
    
    // Si no está pausado, usar la función original
    voltearCartaOriginal.call(this);
};

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
