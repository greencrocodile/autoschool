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
$query = 'SELECT id,student_operation_id,payment_type_id,payment_type_name,value,payment_date,payment_date_text,school_unit_name_short FROM v_students_payments where student_operation_id = ' . $student_operation_id . ' order by payment_date limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'payment_type_id\':' . intval($arr['payment_type_id']) . ',
\'payment_type_name\': \'' . escape4js($arr['payment_type_name']) . '\',
\'value\':' . floatval($arr['value']) . ',
\'payment_date\': ' . (($arr['payment_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['payment_date_text']) . '\')') . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_students_payments where student_operation_id = ' . $student_operation_id;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
