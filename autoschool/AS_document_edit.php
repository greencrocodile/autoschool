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

if (isset($_REQUEST['type_id'])) {
    $type_id = $_REQUEST['type_id'];
} else {
    $type_id = '-1';
}
if ($type_id == '-1') {
    $type_id = 'null';
} else {
    $type_id = intval($type_id);
}

if (isset($_REQUEST['serial'])) {
    $serial = $_REQUEST['serial'];
} else {
    $serial = '';
}

$serial = '\'' . $serial . '\'';


if (isset($_REQUEST['number'])) {
    $number = $_REQUEST['number'];
} else {
    $number = '';
}

$number = '\'' . $number . '\'';

if (isset($_REQUEST['given_by'])) {
    $given_by = trim($_REQUEST['given_by']);
} else {
    $given_by = '';
}

$given_by = '\'' . $given_by . '\'';

if (isset($_REQUEST['code'])) {
    $code = trim($_REQUEST['code']);
} else {
    $code = '';
}

$code = '\'' . $code . '\'';

if (isset($_REQUEST['category'])) {
    $category = trim($_REQUEST['category']);
} else {
    $category = '';
}

$category = '\'' . $category . '\'';

if (isset($_REQUEST['comment'])) {
    $comment = trim($_REQUEST['comment']);
} else {
    $comment = '';
}

$comment = '\'' . $comment . '\'';

if (isset($_REQUEST['date_start'])) {
    $date_start = trim($_REQUEST['date_start']);
} else {
    $date_start = '';
}
if ($date_start == '') {
    $date_start = 'null';
}

if ($date_start != 'null') {
    $date_start = '\'' . $date_start . '\'';
}

if (isset($_REQUEST['date_end'])) {
    $date_end = trim($_REQUEST['date_end']);
} else {
    $date_end = '';
}

if ($date_end == '') {
    $date_end = 'null';
}

if ($date_end != 'null') {
    $date_end = '\'' . $date_end . '\'';
}

if (isset($_REQUEST['vehicle_id'])) {
    $vehicle_id = $_REQUEST['vehicle_id'];
} else {
    $vehicle_id = -1;
}
if($vehicle_id == -1){
	$vehicle_id = 'null';
} else {
	$vehicle_id = intval($vehicle_id);
}

if (isset($_REQUEST['student_operation_id'])) {
    $student_operation_id = $_REQUEST['student_operation_id'];
} else {
    $student_operation_id = -1;
}
if($student_operation_id == -1){
	$student_operation_id = 'null';
} else {
	$student_operation_id = intval($student_operation_id);
}


if (isset($_REQUEST['given_student_operation_id'])) {
    $given_student_operation_id = $_REQUEST['given_student_operation_id'];
} else {
    $given_student_operation_id = -1;
}
if($given_student_operation_id == -1){
	$given_student_operation_id = 'null';
} else {
	$given_student_operation_id = intval($given_student_operation_id);
}

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = -1;
}
if($staff_id == -1){
	$staff_id = 'null';
} else {
	$staff_id = intval($staff_id);
}

if (isset($_REQUEST['user_id'])) {
    $user_id = $_REQUEST['user_id'];
} else {
    $user_id = '-1';
}
if ($user_id == '-1') {
    $user_id = 'null';
} else {
    $user_id = intval($user_id);
}

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'CALL sp_DocumentEdit(@p_id, ' . $type_id . ', ' . $serial . ', ' . $number . ', ' . $date_start . ', ' . $date_end . ', ' . $given_by . ', ' . $code . ', ' . $category . ', ' . $comment . ','.$staff_id.','.$student_operation_id.','.$given_student_operation_id.','.$vehicle_id.','. $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'select @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

echo 'ok#' . $id;
