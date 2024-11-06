
// Variable para almacenar el gráfico y evitar múltiples instancias
let presupuestoChart;

// Función para calcular el presupuesto usando la regla 50/30/20
function calcularPresupuesto() {
    const ingresosInput = document.getElementById("ingresos");
    const ingresos = parseFloat(ingresosInput.value);

    if (!isNaN(ingresos) && ingresos > 0) {
        // Calcular distribuciones de acuerdo a la regla 50/30/20
        const necesidades = ingresos * 0.5;
        const deseos = ingresos * 0.3;
        const ahorro = ingresos * 0.2;

        // Mostrar resultados en el contenedor de resultado
        document.getElementById("resultado").innerHTML = `
            <p>Necesidades: $${necesidades.toFixed(2)}</p>
            <p>Deseos: $${deseos.toFixed(2)}</p>
            <p>Ahorro: $${ahorro.toFixed(2)}</p>
        `;

        // Preparar los datos para el gráfico
        const data = [necesidades, deseos, ahorro];
        const labels = ["Necesidades", "Deseos", "Ahorro"];

        // Destruir el gráfico anterior si existe, para evitar errores al crear un nuevo gráfico
        if (presupuestoChart) {
            presupuestoChart.destroy();
        }

        // Crear el gráfico circular
        const ctx = document.getElementById("graficoPresupuesto").getContext("2d");
        presupuestoChart = new Chart(ctx, {
            type: 'pie',  
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colores para cada sección
                    borderColor: '#ffffff', // Borde blanco entre las secciones
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 16 // Tamaño de fuente para la leyenda
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribución del Presupuesto (50/30/20)',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = data.reduce((acc, curr) => acc + curr, 0);
                                const porcentaje = ((context.raw / total) * 100).toFixed(2);
                                return `${context.label}: $${context.raw.toFixed(2)} (${porcentaje}%)`;
                            }
                        }
                    }
                }
            }
        });
    } else {
        document.getElementById("resultado").innerHTML = "<p>Por favor, ingresa un número válido.</p>";
        ingresosInput.focus();
    }
}
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Credenciales de ejemplo (en una aplicación real, estas deben verificarse en un servidor)
    const validUsername = "usuario";
    const validPassword = "contraseña123";

    if (username === validUsername && password === validPassword) {
        alert("Login exitoso");
        document.getElementById("message").textContent = ""; // Limpiar mensaje de error
        // Redirigir o realizar alguna acción adicional aquí
    } else {
        document.getElementById("message").textContent = "Usuario o contraseña incorrectos";
    }
});

// Seleccionar elementos
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const loginButton = document.querySelector("header a[href='#']"); // Selector del botón "Log In"

// Agregar evento para ocultar el header y ajustar el footer al hacer clic en "Log In"
loginButton.addEventListener("click", function(event) {
    event.preventDefault(); // Evita la recarga de la página
    header.style.display = "none"; // Oculta el header
    footer.style.position = "fixed"; // Fija el footer al final del viewport
    footer.style.bottom = "0";
    footer.style.width = "100%";
});


