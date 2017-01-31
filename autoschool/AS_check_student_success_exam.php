<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['student_operation_id'])) {
    $student_operation_id = $_REQUEST['student_operation_id'];
} else {
    $student_operation_id = '';
}

if ($student_operation_id == '') {
    echo 'не задан идентификатор студента';
    exit;
} else {
    $student_operation_id = intval($student_operation_id);
}

if (isset($_REQUEST['exam_type_id'])) {
    $exam_type_id = $_REQUEST['exam_type_id'];
} else {
    $exam_type_id = '';
}

if ($exam_type_id == '') {
    echo 'не задан идентификатор вида экзамена';
    exit;
} else {
    $exam_type_id = intval($exam_type_id);
}

//---------------------------------------
$query = 'select ' . $student_operation_id . ' as student_operation_id, fn_CheckStudentSuccessExam(' . $student_operation_id . ','.$exam_type_id.') as exam_exists';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'exam_exists\':' . intval($arr['exam_exists']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}

echo $callback . '({\'list\':[' . $d . ']});';
