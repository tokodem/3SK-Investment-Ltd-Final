<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "error" => "Email and password are required"]);
    exit();
}

$stmt = $mysqli->prepare("
    SELECT id, name, email, password, userType, role, permissions, avatar, phone, preferences 
    FROM users 
    WHERE email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["success" => false, "error" => "User not found"]);
    exit();
}

if (!password_verify($password, $user['password'])) {
    echo json_encode(["success" => false, "error" => "Invalid password"]);
    exit();
}

$user['permissions'] = json_decode($user['permissions'] ?? '[]', true);
$user['preferences'] = json_decode($user['preferences'] ?? '{}', true);

unset($user['password']);

echo json_encode(["success" => true, "user" => $user]);
