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

if (isset($_REQUEST['student_operation_id'])) {
    $student_operation_id = $_REQUEST['student_operation_id'];
} else {
    $student_operation_id = '-1';
}

if($student_operation_id == -1){
	$student_operation_id = 'null';
} else {
	$student_operation_id = intval($student_operation_id);
}

if (isset($_REQUEST['number'])) {
    $number = intval($_REQUEST['number']);
} else {
    $number = 0;
}

if (isset($_REQUEST['exam_group_id'])) {
    $exam_group_id = $_REQUEST['exam_group_id'];
} else {
    $exam_group_id = '-1';
}

if ($exam_group_id == '-1') {
    $exam_group_id = 'null';
} else {
    $exam_group_id = intval($exam_group_id);
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
$query = 'CALL sp_ExamGroupStudentOperationEdit(@id,'.$student_operation_id.','.$exam_group_id.','.$number.','.$user_id.')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
