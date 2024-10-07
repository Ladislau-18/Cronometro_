let minutes = 0, seconds = 0, milesseconds = 0;
let start_stop = document.querySelector("#start_stop")
let cut_reset = document.querySelector("#cut_reset")
let tempo = document.querySelector("#tempo");
let mostrar_corte = document.querySelector("#mostrar_corte")
let corte = ""
let storage_cut = [];
let interval = null;
let running = false;

function startTimer() {
    if (running === true) {
        clearInterval(interval);
        running = false;
        start_stop.innerHTML = `Iniciar`
        cut_reset.innerHTML = `Reset`
    } else if (!running) {
        running = true;
        start_stop.innerHTML = `Pausar`
        cut_reset.innerHTML = `Capturar`
        cut_reset.disabled = false;
        interval = setInterval(() => {
            milesseconds++;
            if (milesseconds === 99) {
                milesseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            corte = tempo.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milesseconds)}`;
        }, 10);
    }
}

function capturar() {
    if (cut_reset.disabled == false && running == true) {
        mostrar();
    } else {
        resetTimer();
    }
}

	function mostrar() {
    storage_cut.push(corte);
    mostrar_corte.innerHTML = ""; 
    storage_cut.forEach((item, index) => {
        let classe = (index % 2 === 0) ? 'corte_par' : 'corte_impar';
        mostrar_corte.innerHTML += `<div id="each_cut" class="${classe}">
        <span>#${index + 1}</span><span>${item}</span>
        </div>`;
    });
}


function resetTimer() {
    running = false;
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milesseconds = 0;
    cut_reset.disabled = true;
    storage_cut = []; 
    mostrar_corte.innerHTML = "";
    tempo.textContent = "00:00:00";
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

document.getElementById("start_stop").addEventListener("click", startTimer);
document.querySelector("#cut_reset").addEventListener("click", capturar);
document.getElementById("reset").addEventListener("click", resetTimer);
