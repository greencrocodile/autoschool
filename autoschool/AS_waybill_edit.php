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

if (isset($_REQUEST['number'])) {
    $number = $_REQUEST['number'];
} else {
    $number = '';
}

$number = '\'' . $number . '\'';

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '-1';
}

if ($staff_id == '-1') {
    $staff_id = 'null';
} else {
    $staff_id = intval($staff_id);
}

if (isset($_REQUEST['date'])) {
    $date = $_REQUEST['date'];
} else {
    $date = '';
}

if ($date == '') {
    $date = 'null';
} else {
    $date = '\'' . $date . '\'';
}


if (isset($_REQUEST['odo'])) {
    $odo = $_REQUEST['odo'];
} else {
    $odo = '0';
}

$odo = intval($odo);


if (isset($_REQUEST['vehicle_id'])) {
    $vehicle_id = $_REQUEST['vehicle_id'];
} else {
    $vehicle_id = '-1';
}

if ($vehicle_id == '-1') {
    $vehicle_id = 'null';
} else {
    $vehicle_id = intval($vehicle_id);
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
$query = 'CALL sp_WaybillEdit(@p_id,' . $number . ',' . $staff_id . ',' . $date . ',' . $odo . ',' . $vehicle_id . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
