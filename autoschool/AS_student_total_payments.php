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

//---------------------------------------
$query = 'select ' . $student_operation_id . ' as student_operation_id, fn_GetStudentTotalPayments(' . $student_operation_id . ') as total_payments';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'total_payments\':' . floatval($arr['total_payments']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}

echo $callback . '({\'list\':[' . $d . ']});';
