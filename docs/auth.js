document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Simulación de autenticación
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "MUGG" && password === "contraseña") {
        // Redirigir a la página principal
        window.location.href = "labcomp1.html";
    } else {
        alert("Credenciales inválidas. Inténtalo de nuevo.");
    }
});

window.onload = function() {
    const canvas = document.getElementById('logoCanvas');
    const ctx = canvas.getContext('2d');

    // Ajustar el tamaño del canvas para que ocupe toda la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const logo = new Image();
    logo.src = '/logomugg.jpg'; // Ruta relativa correcta para GitHub Pages

    logo.onload = function() {
        let x = Math.random() * (canvas.width - 100);
        let y = Math.random() * (canvas.height - 100);
        let dx = 2.5; // Velocidad predeterminada para el eje x
        let dy = 2.5; // Velocidad predeterminada para el eje y
        const logoWidth = 300;
        const logoHeight = 300;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(logo, x, y, logoWidth, logoHeight);

            // Restringir el movimiento del logo dentro del canvas
            if (x + dx > canvas.width - logoWidth || x + dx < 0) {
                dx = -dx; // Invertir la dirección en el eje x si llega al borde del canvas
            }
            if (y + dy > canvas.height - logoHeight ||  y + dy < 0) {
                dy = -dy; // Invertir la dirección en el eje y si llega al borde del canvas
            }

            x += dx;
            y += dy;

            requestAnimationFrame(draw);
        }

        draw();
    };
};
