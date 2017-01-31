<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');
if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
    $id = -1;
}

if (isset($_REQUEST['waybill_id'])) {
    $waybill_id = $_REQUEST['waybill_id'];
} else {
    $waybill_id = '';
}

if ($waybill_id == '') {
    echo 'Не задан идентификатор путевого листа.';
    exit;
} else {
    $waybill_id = intval($waybill_id);
}

if (isset($_REQUEST['student_id'])) {
    $student_id = intval($_REQUEST['student_id']);
} else {
    $student_id = -1;
}

if($student_id == -1){
	$student_id = 'null';
}

if (isset($_REQUEST['place'])) {
    $place = $_REQUEST['place'];
} else {
    $place = '-1';
}

if ($place == '-1') {
    $place = 'null';
} else {
    $place = '\'' . $place . '\'';
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
$query = 'CALL sp_WaybillsStudentsEdit(@p_id,' . $waybill_id . ',' . $student_id . ',' . $place . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
