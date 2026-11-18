// Función mejorada con delay y efecto de carga (...)
async function seleccionarAleatorio() {
    var texto = document.getElementById("opcionesInput").value;
    var arrayOpciones = texto.split(",");
    
    // Limpiar espacios en blanco de las opciones
    arrayOpciones = arrayOpciones.map(item => item.trim()).filter(item => item !== "");

    if (arrayOpciones.length === 0) {
        document.getElementById("resultado").innerText = "¡Escribe al menos una opción!";
        return;
    }

    var elementoResultado = document.getElementById("resultado");
    
    // Efecto visual de "Sorteando..." con puntos suspensivos dinámicos
    elementoResultado.innerText = "Sorteando.";
    await new Promise(resolve => setTimeout(resolve, 300));
    elementoResultado.innerText = "Sorteando..";
    await new Promise(resolve => setTimeout(resolve, 300));
    elementoResultado.innerText = "Sorteando...";
    await new Promise(resolve => setTimeout(resolve, 400));

    // Seleccionar un índice aleatorio
    var randomIndex = Math.floor(Math.random() * arrayOpciones.length);
    var elegido = arrayOpciones[randomIndex];

    // truco extra para que si sale el mismo, parpadee o muestre un identificador único 
    // y se note claramente que se volvió a sortear
    elementoResultado.innerText = "Ganador: " + elegido;
}

// Comunicación asíncrona con la ESP32 para leer el botón físico
async function actualizarBoton() {
    try {
        const response = await fetch("/input", { cache: "no-store" });
        const estado = await response.text();
        
        document.getElementById("indicador").classList.toggle("activo", estado.trim() === "1");
    } catch (error) {
        console.error("Error al actualizar botón", error);
    }
    setTimeout(actualizarBoton, 250);
}

// Iniciar el ciclo de lectura del botón físico
actualizarBoton();