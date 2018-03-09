// Objetos de de cada personaje
// Imagenes poweres by Gema!!

const arrayPersonajes = [
    {
        nombre: "Anna",
        ruta: "img/Anna.png"
    },
    {
        nombre: "Campanilla",
        ruta: "img/Campanilla.png"
    },
    {
        nombre: "Cenicienta",
        ruta: "img/Cenicienta.png"
    },
    {
        nombre: "Flynn",
        ruta: "img/Flynn.png"
    },
    {
        nombre: "Genio",
        ruta: "img/Genio.png"
    },
    {
        nombre: "Elsa",
        ruta: "img/Elsa.png"
    },
    {
        nombre: "Kaa",
        ruta: "img/Kaa.png"
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu.png"
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal.png"
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito.png"
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera.png"
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png"
    },
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");

rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

const song = document.getElementById("song");
const clic = document.getElementById("clic");
const bounce = document.getElementById("bounce");
const win = document.getElementById("win");
const fail = document.getElementById("fail");

var contador = 0;
var primerSel= "";
var segunSel = "";
var selPrevio = null;
var eliminados = 0;

var start = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");

var segundos = 60;
/*funcion para barajar los div de cada personaje*/
function baraja() {
    const personajesDobles = arrayPersonajes.concat(arrayPersonajes)
    .sort(() =>  0.5 - Math.random());

    personajesDobles.forEach(personaje => {
        const { nombre, ruta } = personaje;    const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.name = nombre;

        const anverso = document.createElement("div");
        anverso.classList.add("anverso");
        const reverso = document.createElement("div");
        reverso.classList.add("reverso");
        reverso.style.backgroundImage = `url(${ruta})`;
        
        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
    });
    gameover.style.opacity = "0";
    winner.classList.remove("open");
    rejilla.classList.remove("out");
    rejilla.classList.add("start");
    start.style.display = "none";
    reloj.style.display = "initial";
    song.play();
    eliminados = 0;
}

/*Funcion del inicio de juego y reloj marcha atras*/

function startGame(){

    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2);
    var m = parseInt(segundos/60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;

    if (eliminados === 24) {
        return;
    }

if (segundos > 0) {
    var t = setTimeout(function(){
        startGame();
    }, 1000)
  } else {
    //   document.getElementById("game-over").innerHTML = "¡Game Over!";
    gameOver();
  }

  segundos--;

if (segundos < 10) {
    reloj.style.color = "red";
}
}

// function restart() {
//     rejilla.classList.remove("out");
// }

/*Funcion para ejecutar la logica de partida perdida*/

function gameOver() {
    console.log("ejecuto Winner");
  segundos = 60;
  song.pause();
  song.currentTime = 0;
  fail.play();
  rejilla.classList.add("out");
  gameover.style.opacity = "1";
  start.style.display = "initial";
  reloj.style.display = "none";
  setTimeout(function(){
    while(rejilla.firstChild){
        rejilla.removeChild(rejilla.firstChild);
    }
  }, 1000);
}

/* Evento clic para seleccionar cada personaje*/ 

rejilla.addEventListener("click",function(evento){

    clic.currentTime = 0;
    clic.play();
    
    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" || seleccionado.parentNode === selPrevio || 
        seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    }

    if (contador < 2) {
        contador++;
    if (contador === 1) {
        primerSel = seleccionado.parentNode.dataset.name;
        seleccionado.parentNode.classList.add("seleccionado");
        selPrevio = seleccionado.parentNode;    
    } else {
        segunSel = seleccionado.parentNode.dataset.name;
        seleccionado.parentNode.classList.add("seleccionado");
           }
    if (primerSel !== "" && segunSel !== "") {
        if (primerSel === segunSel){
            bounce.currentTime = 0;
            bounce.play();
            setTimeout(eliminar,1200);  
            setTimeout(resetSel,1200);
            conteEliminados();            
        } else {
            setTimeout(resetSel,1200);
            selPrevio = null; 
        }
      } 
    }
});
// Funcion para eliminar los elemntos coincidentes

var eliminar = function () {
    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.add("eliminado");
    });
}
/*Funcion para resetear los selleciandos despues de 2 intentos*/

var resetSel = function () {
    contador = 0;
    primerSel = "";
    segunSel = "";
    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });
}
//Funcion para contar los eliminados y cuando lleguen a 24 ejecutar la logica de partida ganada

var conteEliminados = function (){
    eliminados = document.querySelectorAll(".eliminado").length + 2;
    if (eliminados === 24) {
        winner.classList.add("open");
        win.currentTime = 0;
        win.play();
        segundos = 60;
        song.pause();
        song.currentTime = 0;
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display = "none";
        setTimeout(function(){
            while(rejilla.firstChild){
                rejilla.removeChild(rejilla.firstChild);
              }
            }, 1000);
    }
}