const TOTAL_PREGUNTAS = 10;

var cantidadAcertadas = 0;

var numPreguntaActual = -1;

var estadoPregunta = [0,0,0,0,0,0,0,0,0,0];

const bd_juego = [
    {
        id: 'A',
        contiene: "contiene A",
        pregunta: "Proceso en el que un atacante se hace pasar por otra persona para engañar o estafar en las redes sociales.",
        respuesta: "suplantacion"
    },
    {
        id: 'B',
        pregunta: "Red social fundada en 2004, conocida por permitir compartir contenido audivisual con amigos y familiares.",
        respuesta: "facebook"
    },
    {
        id: 'C',
        pregunta: "Tecnología utilizada por WhatsApp para garantizar que solo el emisor y el receptor puedan leer los mensajes.",
        respuesta: "cifrado"
    },
    {
        id: 'D',
        pregunta: " Información o hechos que se almacenan y procesan en dispositivos electrónicos, como nombres, números o fotos.",
        respuesta: "datos"
    },
    {
        id: 'E',
        pregunta: "Antiguo nombre de la red social fundada en 2006 que permite mensajes cortos.",
        respuesta: "twitter"
    },
    {
        id: 'F',
        pregunta: "Término que describe los mensajes o noticias falsos que se propagan rápidamente en las redes sociales, causando desinformación.",
        respuesta: "fraude"
    },
    {
        id: 'G',
        pregunta: "Tipo de ataque cibernético que utiliza enlaces o mensajes engañosos para obtener información sensible de los usuarios.",
        respuesta: "phishing"
    },
    {
        id: 'H',
        pregunta: "Plataforma de mensajería instantánea adquirida por Facebook en 2014, que utiliza cifrado de extremo a extremo.",
        respuesta: "whatsapp"
    },
    {
        id: 'I',
        pregunta: "Red social lanzada en 2010 que se caracteriza por compartir fotos y videos, y que fue adquirida por Facebook en 2012",
        respuesta: "instagram"
    },
    {
        id: 'J',
        pregunta: "Comunicaciones enviadas entre personas a través de aplicaciones, que pueden incluir texto, imágenes o videos.",
        respuesta: "mensajes"
    },
]

const timer = document.getElementById("tiempo");
const TIEMPO_DEL_JUEGO = 120;
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

const container = document.querySelector(".container");
for(let i=1; i <= TOTAL_PREGUNTAS; i++){
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i-1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event){
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block"

    largarTiempo();
    cargarPregunta();
})

function largarTiempo(){
    countdown = setInterval(()=> {
        timeLeft--;
        timer.innerText = timeLeft;

        if(timeLeft<0){
            clearInterval(countdown);
            alert("se acabo el tiempo");
            mostrarPantallaFinal();
        }
    }, 1000);
}

function cargarPregunta(){
    numPreguntaActual++;

    if(numPreguntaActual >= TOTAL_PREGUNTAS){
        numPreguntaActual = 0;
    }

    if(estadoPregunta.indexOf(0)>=0){
        while(estadoPregunta[numPreguntaActual]==1){
            numPreguntaActual++;
            if(numPreguntaActual>=TOTAL_PREGUNTAS){
                numPreguntaActual=0;
            }
        }

        const pregunta = bd_juego[numPreguntaActual];
        const letra = pregunta.id;
        const contieneOEmpiezaCon = pregunta.id === pregunta.respuesta[0].toUpperCase() ? "Empieza con" : "Contiene";
        document.getElementById("letra-pregunta").textContent = `${letra} - ${contieneOEmpiezaCon} ${letra}`;
        document.getElementById("pregunta").textContent = pregunta.pregunta;
        document.getElementById(letra).classList.add("pregunta-actual");
    } else{
        clearInterval(countdown);
        mostrarPantallaFinal()
    }
}

var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        if(respuesta.value==""){
            alert ("Debe ingrensar un valor");
            return;
        }
        var txtRespuesta = respuesta.value;
        controlarRespuesta(txtRespuesta.toLowerCase());
    }
})

document.getElementById("responder").addEventListener("click", function() {
    console.log("Botón presionado!");
    controlarRespuesta(respuesta.value.toLowerCase());
});

function controlarRespuesta(txtRespuesta){
    if(txtRespuesta.trim() == bd_juego[numPreguntaActual].respuesta){
        // Respuesta correcta
        cantidadAcertadas++;
        estadoPregunta[numPreguntaActual] = 1;

        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
    } else {
        // Respuesta incorrecta
        estadoPregunta[numPreguntaActual] = 1;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("mal-respondida");
    }

    respuesta.value = "";
    cargarPregunta();
}

var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event){
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("pasapalabra");

    cargarPregunta();
})

function mostrarPantallaFinal(){
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = (cantidadAcertadas * 100)/10 + "% de acierto";
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
}

var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event){
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;

    estadoPregunta = [0,0,0,0,0,0,0,0,0,0];

    var circulos = document.getElementsByClassName("circle");
    for(i=0; i<circulos.length;i++){
        circulos[i].classList.remove("pregunta-actual");
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    respuesta.value = "";

    largarTiempo();
    cargarPregunta();
})

var homeButton = document.getElementById("home");
homeButton.addEventListener("click", function() {
    // Ocultar la pantalla final
    document.getElementById("pantalla-final").style.display = "none";
    
    // Mostrar la pantalla inicial
    document.getElementById("pantalla-inicial").style.display = "block";
    
    // Reiniciar el estado del juego
    resetearJuego();
});

function resetearJuego() {
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;

    estadoPregunta = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var circulos = document.getElementsByClassName("circle");
    for (let i = 0; i < circulos.length; i++) {
        circulos[i].classList.remove("pregunta-actual", "bien-respondida", "mal-respondida", "pasapalabra");
    }
    
    respuesta.value = ""; // Limpiar el campo de respuesta
    clearInterval(countdown); // Detener el temporizador si está corriendo
}