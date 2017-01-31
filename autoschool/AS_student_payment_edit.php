<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

if (isset($_REQUEST['id'])) {
    $id = trim($_REQUEST['id']);
} else {
    $id = '';
}
if ($id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
    $id = intval($id);
}

if (isset($_REQUEST['student_id'])) {
    $student_id = trim($_REQUEST['student_id']);
} else {
    $student_id = '';
}
if ($student_id == '') {
    echo 'Не задан идентификатор студента.';
    exit;
} else {
    $student_id = intval($student_id);
}


if (isset($_REQUEST['payment_type_id'])) {
    $payment_type_id = $_REQUEST['payment_type_id'];
} else {
    $payment_type_id = '';
}
if ($payment_type_id == '') {
    echo 'Не задан идентификатор типа платежа.';
    exit;
} else {
    $payment_type_id = intval($payment_type_id);
}

if (isset($_REQUEST['value'])) {
    $value = $_REQUEST['value'];
} else {
    $value = '0';
}

$value = floatval($value);

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

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'CALL sp_StudentPaymentEdit(@p_id, ' . $student_id . ', ' . $payment_type_id . ', ' . $value . ', ' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
