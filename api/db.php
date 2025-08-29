<?php
$host = "localhost";
$dbname = "3sk";
$username = "root";
$password = "";


$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed: " . $mysqli->connect_error
    ]);
    exit();
}

$mysqli->set_charset("utf8mb4");
?>
