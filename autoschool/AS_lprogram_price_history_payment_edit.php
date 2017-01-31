<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '';
}
if ($id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
    $id = intval($id);
}

if (isset($_REQUEST['history_id'])) {
    $history_id = $_REQUEST['history_id'];
} else {
    $history_id = '';
}
if ($history_id == '') {
    $history_id = 'null';
} else {
    $history_id = intval($history_id);
}

if (isset($_REQUEST['payment_type_id'])) {
    $payment_type_id = trim($_REQUEST['payment_type_id']);
} else {
    $payment_type_id = '-1';
}
if ($payment_type_id == '-1') {
    $payment_type_id = 'null';
} else {
    $payment_type_id = intval($payment_type_id);
}

if (isset($_REQUEST['value'])) {
    $value = trim($_REQUEST['value']);
} else {
    $value = '0';
}
if ($value == '') {
    echo 'Не задана сумма.';
    exit;
} else {
    $value = floatval($value);
}

if (isset($_REQUEST['required'])) {
    $required = $_REQUEST['required'];
} else {
    $required = '';
}
if ($required == '') {
    $required = 1;
} else {
    $required = intval($required);
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

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'CALL sp_LearningProgramPriceHistoryPaymentEdit(@p_id,' . $history_id . ',' . $required . ',' . $payment_type_id . ',' . $value . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
