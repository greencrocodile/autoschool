<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

if (isset($_REQUEST['student_id'])) {
    $student_id = $_REQUEST['student_id'];
} else {
    $student_id = '';
}
if ($student_id == '') {
    echo 'Не задан идентификатор студента.';
    exit;
} else {
    $student_id = intval($student_id);
}

if (isset($_REQUEST['price'])) {
    $price = $_REQUEST['price'];
} else {
    $price = '';
}
if ($price == '') {
    echo 'Не задана стоимость.';
    exit;
} else {
    $price = floatval($price);
}

if (isset($_REQUEST['user_id'])) {
    $user_id = $_REQUEST['user_id'];
} else {
    $user_id = '';
}
if ($user_id == '') {
    $user_id = 'null';
} else {
    $user_id = intval($user_id);
}

$query = 'CALL sp_SetStudentAccrualsFromProgram(' . $student_id . ',' . $price . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

echo 'ok';
