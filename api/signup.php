<?php
// === CORS CONFIGURATION ===
$allowed_origins = [
    "http://localhost:8080",
    "http://localhost:8081", // Added for your frontend
    "http://192.168.10.145:8080"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: *"); // Fallback for development
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");
require "db.php"; // Ensure this sets $mysqli = new mysqli(...)

// === READ INPUT DATA ===
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid request data"]);
    exit();
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';
$phone = trim($data['phone'] ?? '');

// === VALIDATION ===
if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
    echo json_encode(["success" => false, "error" => "All required fields must be filled"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "Invalid email address"]);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(["success" => false, "error" => "Password must be at least 6 characters"]);
    exit();
}

if ($password !== $confirmPassword) {
    echo json_encode(["success" => false, "error" => "Passwords do not match"]);
    exit();
}

// === CHECK FOR EXISTING EMAIL ===
$stmt = $mysqli->prepare("SELECT id FROM users WHERE email = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Database error: " . $mysqli->error]);
    exit();
}
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result && $result->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Email already registered"]);
    $stmt->close();
    $mysqli->close();
    exit();
}
$stmt->close();

// === DEFAULT VALUES FOR NEW USER ===
$role = 'Customer';
$userType = 'customer';
$permissions = json_encode([
    "view_cars", "save_favorites", "make_inquiries", "view_profile", "edit_profile"
]);
$preferences = json_encode([
    "favoriteCarIds" => [],
    "interestedBrands" => [],
    "priceRange" => ["min" => 0, "max" => 100000]
]);

// === HASH PASSWORD ===
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// === INSERT INTO DATABASE ===
$stmt = $mysqli->prepare("
    INSERT INTO users (name, email, password, userType, role, permissions, preferences, phone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Database insert error: " . $mysqli->error]);
    $mysqli->close();
    exit();
}

$stmt->bind_param("ssssssss", $name, $email, $hashedPassword, $userType, $role, $permissions, $preferences, $phone);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => (string) $userId,
            "name" => $name,
            "email" => $email,
            "userType" => $userType,
            "role" => $role,
            "permissions" => json_decode($permissions),
            "preferences" => json_decode($preferences),
            "phone" => $phone
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to create user. Error: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
