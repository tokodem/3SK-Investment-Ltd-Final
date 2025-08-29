<?php
header("Content-Type: application/json");
require "db.php";

$email = $_GET['email'] ?? '';
if (!$email) {
    echo json_encode(["success" => false, "error" => "Email required"]);
    exit();
}

$stmt = $mysqli->prepare("SELECT id, name, email, userType, role, permissions, avatar, phone, preferences FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["success" => false, "error" => "User not found"]);
    exit();
}

$user['permissions'] = json_decode($user['permissions'] ?? '[]', true);
$user['preferences'] = json_decode($user['preferences'] ?? '{}', true);

echo json_encode(["success" => true, "user" => $user]);
?>
