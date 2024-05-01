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
