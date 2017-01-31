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

if ($student_operation_id == '-1') {
    $student_operation_id = 'null';
} else {
    $student_operation_id = intval($student_operation_id);
}

if (isset($_REQUEST['exam_group_operation_id'])) {
    $exam_group_operation_id = $_REQUEST['exam_group_operation_id'];
} else {
    $exam_group_operation_id = '-1';
}

if ($exam_group_operation_id == '-1') {
    $exam_group_operation_id = 'null';
} else {
    $exam_group_operation_id = intval($exam_group_operation_id);
}

if (isset($_REQUEST['exam_date'])) {
    $exam_date = $_REQUEST['exam_date'];
} else {
    $exam_date = '';
}

if ($exam_date == '') {
    $exam_date = 'null';
} else {
    $exam_date = '\''.$exam_date.'\'';
}

if (isset($_REQUEST['exam_type_id'])) {
    $exam_type_id = $_REQUEST['exam_type_id'];
} else {
    $exam_type_id = '-1';
}
if ($exam_type_id == '-1') {
    $exam_type_id = 'null';
} else {
    $exam_type_id = intval($exam_type_id);
}

if (isset($_REQUEST['exam_result_id'])) {
    $exam_result_id = $_REQUEST['exam_result_id'];
} else {
    $exam_result_id = '-1';
}
if ($exam_result_id == '-1') {
    $exam_result_id = 'null';
} else {
    $exam_result_id = intval($exam_result_id);
}

if (isset($_REQUEST['exam_ball'])) {
    $exam_ball = $_REQUEST['exam_ball'];
} else {
    $exam_ball = '-1';
}
if ($exam_ball == '-1') {
    $exam_ball = 'null';
} else {
    $exam_ball = intval($exam_ball);
}

if (isset($_REQUEST['exam_motive_id'])) {
    $exam_motive_id = $_REQUEST['exam_motive_id'];
} else {
    $exam_motive_id = '-1';
}
if ($exam_motive_id == '-1') {
    $exam_motive_id = 'null';
} else {
    $exam_motive_id = intval($exam_motive_id);
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

$query = 'CALL sp_ExamEdit('.$id.','.$student_operation_id.','.$exam_group_operation_id.','.$exam_date.','.$exam_type_id.','.$exam_result_id.','.$exam_ball.','.$exam_motive_id.','.$user_id.')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

echo 'ok';
