document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Simulación de autenticación
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "usuario" && password === "contraseña") {
        // Redirigir a la página principal
        window.location.href = "main.html";
    } else {
        alert("Credenciales inválidas. Inténtalo de nuevo.");
    }
});
window.onload = function() {
    const canvas = document.getElementById('logoCanvas');
    const ctx = canvas.getContext('2d');

    const logo = new Image();
    logo.src = 'C:\\Users\\AGUST\\Desktop\\PROYECTO-2024-Uriona-GonzalezDelPino-Guerrero-Miranda\\imagenes\\logo-mugg2.png'; // Asegúrate de que la ruta de la imagen sea correcta

    let x = 100;
    let y = 100;
    let dx = 2;
    let dy = 2;
    const logoWidth = 100;
    const logoHeight = 100;

    logo.onload = function() {
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(logo, x, y, logoWidth, logoHeight);

            if (x + dx > canvas.width - logoWidth || x + dx < 0) {
                dx = -dx;
            }
            if (y + dy > canvas.height - logoHeight || y + dy < 0) {
                dy = -dy;
            }

            x += dx;
            y += dy;

            requestAnimationFrame(draw);
        }

        draw();
    };
};