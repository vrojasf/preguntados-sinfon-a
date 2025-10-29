
const preguntas = {
    "Conocimiento General": [
      { texto: "Pregunta 1", opciones: ["A", "B", "C", "D"], correcta: 1 },
      { texto: "Pregunta 2", opciones: ["A", "B", "C", "D"], correcta: 1 },
      { texto: "Pregunta 3", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Historia y Mitología": [
      { texto: "Pregunta 1", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Ciencia y Tecnología": [
      { texto: "Pregunta 1", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Geografía": [
      { texto: "Pregunta 1", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Entretenimiento": [
      { texto: "Pregunta 1", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ]
  };
  //Se resetea el puntaje a 0 al hacer click en el boton reiniciar
  let puntaje = 0;
  document.getElementById("reiniciar").addEventListener("click", () => {
    puntaje = 0;
    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("puntaje-actual").textContent = puntaje;
    document.querySelectorAll(".categoria").forEach(c => c.classList.remove("destacada"));

  });
    
  let categoriaActual = "";
  
  const inicio = document.getElementById("inicio");
  const pantallaPregunta = document.getElementById("pregunta");
  const pantallaResultado = document.getElementById("resultado");
  
  const categoriaNombre = document.getElementById("categoriaNombre");
  const textoPregunta = document.getElementById("textoPregunta");
  const opciones = document.getElementById("opciones");
  const iconoResultado = document.getElementById("iconoResultado");
  const textoResultado = document.getElementById("textoResultado");
  const puntajeTexto = document.getElementById("puntaje");
  const volver = document.getElementById("volver");
  
  
  document.querySelectorAll(".categoria").forEach(btn => {
    btn.addEventListener("click", () => mostrarPregunta(btn.dataset.categoria));
  });

  
  //Función para mostrar una pregunta aleatoria de la categoría seleccionada 
  function mostrarPregunta(categoria) {
    categoriaActual = categoria;
    const lista = preguntas[categoria];
    const pregunta = lista[Math.floor(Math.random() * lista.length)]; //escoge una de la lista de forma random

    inicio.classList.remove("visible");
    pantallaPregunta.classList.add("visible");
  
    categoriaNombre.textContent = categoria;
    textoPregunta.textContent = pregunta.texto;
    opciones.innerHTML = "";
  
    pregunta.opciones.forEach((op, i) => {
      const boton = document.createElement("button");
      boton.textContent = `${String.fromCharCode(65 + i)}. ${op}`;
      boton.onclick = () => verificarRespuesta(i === pregunta.correcta);
      opciones.appendChild(boton);
    });
  }

  //Verificacion de respuestas
  function verificarRespuesta(correcta) {
    pantallaPregunta.classList.remove("visible");
    pantallaResultado.classList.add("visible");
  
    if (correcta){
      textoResultado.textContent = "CORRECTO +100 PUNTOS";
      iconoResultado.innerHTML = '<img src="correcto.png" alt="Correcto" class="icono-resultado-img">';
      puntaje += 100;
    }else {
      textoResultado.textContent = "INCORRECTO";
      iconoResultado.innerHTML = '<img src="incorrecto.png" alt="Incorrecto" class="icono-resultado-img">';
    }
  
    puntajeTexto.textContent = puntaje;
    document.getElementById("puntaje-actual").textContent = puntaje;
  }
  
  volver.addEventListener("click", () => {
    pantallaResultado.classList.remove("visible");
    inicio.classList.add("visible");
  });

  // Funcion aleatorio
const botonGirar = document.getElementById("Girar");
const categorias = document.querySelectorAll(".categoria");
let intervalo;
let indiceActual = 0;
let girando = false;
botonGirar.addEventListener("click", () =>{
  if (girando) return; 
  girando = true;
  //numero de vueltas aleatorio
  let vueltas = 15 + Math.floor(Math.random() *10); // el primer num son las vueltas antes de escoger, dependiendo a cuantas vueltas se quiere que de minimo se debe cambiar este num.
  let contador = 0;

  // efecto visual cada vez que el "giro" pasa por una categoria 
  intervalo = setInterval(() => {
    // Quita el resaltado anterior
    categorias.forEach(c => c.classList.remove("destacada"));

    // Agrega el efecto a la categoría actual
    categorias[indiceActual].classList.add("destacada");

    //avanza al siguiente índice
    indiceActual = (indiceActual + 1) % 5; //5 es por el numero de categorias, depende de cuantas haya
    contador++;

    // Si se cumple el número de vueltas para de girar
    if (contador >= vueltas) {
      clearInterval(intervalo);
      girando = false;

      // Esta parte es la que elige a la categoria a la que se llegó
      const categoriaSeleccionada = categorias[(indiceActual -1 + 5) % 5]; //el 5 es por el length de categorias
      const categoriaNombre = categoriaSeleccionada.dataset.categoria;
      // pausa antes de mostrar la pregunta
      setTimeout(() => {
        mostrarPregunta(categoriaNombre);
      }, 500);
    }
  }, 150); // vel del giro
});

