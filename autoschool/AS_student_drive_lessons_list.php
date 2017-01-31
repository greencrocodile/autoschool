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

if (isset($_REQUEST['page'])) {
    $page = intval($_REQUEST['page']);
}

if (isset($_REQUEST['start'])) {
    $start = intval($_REQUEST['start']);
}

if (isset($_REQUEST['limit'])) {
    $limit = intval($_REQUEST['limit']);
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,number,waybill_date,waybill_date_text,staff_initials_name,model_name,reg_number,student_operation_id,place FROM v_student_drive_lessons WHERE student_operation_id = ' . $student_operation_id . ' order by id limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'number\': \'' . escape4js($arr['number']) . '\',
\'date\': ' . (($arr['waybill_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['waybill_date_text']) . '\')') . ',
\'staff_initials_name\': \'' . escape4js($arr['staff_initials_name']) . '\',
\'model_name\': \'' . escape4js($arr['model_name']) . '\',
\'reg_number\': \'' . escape4js($arr['reg_number']) . '\',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'place\': \'' . escape4js($arr['place']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_student_drive_lessons WHERE student_operation_id = ' . $student_operation_id;

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
