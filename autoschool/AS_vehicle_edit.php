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

if (isset($_REQUEST['model'])) {
    $model = $_REQUEST['model'];
} else {
    $model = '';
}
$model = '\''.$model.'\'';


if (isset($_REQUEST['year'])) {
    $year = $_REQUEST['year'];
} else {
    $year = '';
}

if ($year == '') {
    $year = 'null';
} else {
    $year = intval($year);
}

if (isset($_REQUEST['reg_number'])) {
    $reg_number = trim($_REQUEST['reg_number']);
} else {
    $reg_number = '';
}

$reg_number = '\'' . $reg_number . '\'';

if (isset($_REQUEST['vin'])) {
    $vin = trim($_REQUEST['vin']);
} else {
    $vin = '';
}

$vin = '\'' . $vin . '\'';

if (isset($_REQUEST['color'])) {
    $color = $_REQUEST['color'];
} else {
    $color = '';
}

$color = '\''.$color.'\'';

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = -1;
}

if ($staff_id == -1){
	$staff_id = 'null';
} else {
	$staff_id = intval($staff_id);	
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

$query = 'CALL sp_VehicleEdit(@p_id, ' . $model . ', ' . $year . ', ' . $reg_number . ', ' . $vin . ', ' . $color . ','.$staff_id.',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
