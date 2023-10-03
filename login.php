<?php
// Establece la conexión a tu base de datos (reemplaza con tus propios detalles de conexión)
$servername = "usuarios";
$username = "root";
$password = "1234";
$dbname = "usuarios";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("La conexión a la base de datos falló: " . $conn->connect_error);
}

// Obtiene los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Realiza la consulta para verificar las credenciales del usuario (debes adaptarla según tu esquema de base de datos)
    $sql = "SELECT * FROM usuarios WHERE nombre_usuario = '$username' AND contraseña = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // El inicio de sesión fue exitoso, redirige a la página "paneles.html"
        header("Location: paneles.html");
        exit;
    } else {
        // Las credenciales no son válidas, puedes mostrar un mensaje de error o redirigir a una página de error
        echo "Credenciales incorrectas. Por favor, inténtelo nuevamente.";
    }
}

// Cierra la conexión a la base de datos
$conn->close();
?>
