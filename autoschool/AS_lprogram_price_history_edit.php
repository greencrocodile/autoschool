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

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '';
}
if ($learning_program_id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
    $learning_program_id = intval($learning_program_id);
}

if (isset($_REQUEST['change_date'])) {
    $change_date = trim($_REQUEST['change_date']);
} else {
    $change_date = '';
}
if ($change_date == '') {
    $change_date = 'null';
} else {
    $change_date = '\'' . $change_date . '\'';
}

if (isset($_REQUEST['price'])) {
    $price = $_REQUEST['price'];
} else {
    $price = '0';
}

$price = floatval($price);


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
$query = 'CALL sp_LearningProgramPriceHistoryEdit(@p_id,' . $learning_program_id . ',' . $change_date . ',' . $price . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
