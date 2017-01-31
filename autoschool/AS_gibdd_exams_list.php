<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
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

if (isset($_REQUEST['student_operation_id'])) {
    $student_operation_id = intval($_REQUEST['student_operation_id']);
} else {
	$student_operation_id = '-1';
}
$student_operation_id = intval($student_operation_id);


if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
    $id ='-1';
}
$id = intval($id);
//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,student_operation_id,exam_date,exam_date_text,type_id,type_name,category,result_id,result_name,motive_id,motive_name FROM v_gibdd_exams ';
if ($id != -1) {
    $query .= ' where id = '.$id;
} else {
    $query .= ' where student_operation_id = '.$student_operation_id;
}
$query .= ' order by exam_date';


$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\': \'' . escape4js($arr['id']) . '\',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'exam_date\': ' . (($arr['exam_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['exam_date_text']) . '\')') . ',
\'type_id\':' . intval($arr['type_id']) . ',
\'type_name\': \'' . escape4js($arr['type_name']) . '\',
\'category\': \'' . escape4js($arr['category']) . '\',
\'result_id\':' . intval($arr['result_id']) . ',
\'result_name\': \'' . escape4js($arr['result_name']) . '\',
\'motive_id\':' . intval($arr['motive_id']) . ',
\'motive_name\': \'' . escape4js($arr['motive_name']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_gibdd_exams';
if ($id != 0) {
    $query .= ' where id = '.$id;
} else {
    $query .= ' where student_operation_id = '.$student_operation_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
