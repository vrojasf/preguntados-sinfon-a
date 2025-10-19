
const preguntas = {
    "Conocimiento General": [
      { texto: "Pregunta 1", opciones: ["A", "B", "C", "D"], correcta: 1 },
      { texto: "Pregunta 2", opciones: ["A", "B", "C", "D"], correcta: 1 },
      { texto: "Pregunta 3", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Historia y Mitología": [
      { texto: "Pregunta 2", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Ciencia y Tecnología": [
      { texto: "Pregunta 3", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Geografía": [
      { texto: "Pregunta 4", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ],
    "Entretenimiento": [
      { texto: "Pregunta 5", opciones: ["A", "B", "C", "D"], correcta: 1 },
    ]
  };
  //Se resetea el puntaje a 0 al hacer click en el boton reiniciar
  let puntaje = 0;
  document.getElementById("reiniciar").addEventListener("click", () => {
    puntaje = 0;
    document.getElementById("puntaje").textContent = puntaje;
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
  
  function mostrarPregunta(categoria) {
    categoriaActual = categoria;
    const lista = preguntas[categoria];
    const pregunta = lista[Math.floor(Math.random() * lista.length)];
  
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
  
  function verificarRespuesta(correcta) {
    pantallaPregunta.classList.remove("visible");
    pantallaResultado.classList.add("visible");
  
    if (correcta) {
      textoResultado.textContent = "CORRECTO +100 PUNTOS";
      iconoResultado.innerHTML = '<img src="correcto.png" alt="Correcto" class="icono-resultado-img">';
      puntaje += 100;
    } else {
      textoResultado.textContent = "INCORRECTO";
      iconoResultado.innerHTML = '<img src="incorrecto.png" alt="Incorrecto" class="icono-resultado-img">';
    }
  
    puntajeTexto.textContent = puntaje;
  }
  
  volver.addEventListener("click", () => {
    pantallaResultado.classList.remove("visible");
    inicio.classList.add("visible");
  });
  