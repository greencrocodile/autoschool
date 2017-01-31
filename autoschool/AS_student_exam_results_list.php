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

if (isset($_REQUEST['exam_type'])) {
    $exam_type = intval($_REQUEST['exam_type']);
} else {
    echo 'не задан тип экзамена';
    exit;
}

if (isset($_REQUEST['student_operation_id'])) {
    $student_operation_id = intval($_REQUEST['student_operation_id']);
} else {
    echo 'не задан идентификатор студента';
    exit;
}
//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,exam_group_id,school_unit_id,school_unit_name_short,student_operation_id,student_number,student_full_name,exam_name,result,exam_date,exam_date_text,category';
if ($exam_type == 0) {
    $query .= ' FROM v_student_school_exam_results';
} else {
    $query .= ' FROM v_student_gibdd_exam_results';
}
$query .= ' where student_operation_id = ' . $student_operation_id . ' order by exam_date';


$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\': \'' . escape4js($arr['id']) . '\',
\'exam_group_id\':' . intval($arr['exam_group_id']) . ',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'student_full_name\': \'' . escape4js($arr['student_full_name']) . '\',
\'student_number\': \'' . escape4js($arr['student_number']) . '\',
\'exam_name\': \'' . escape4js($arr['exam_name']) . '\',
\'result\': \'' . escape4js($arr['result']) . '\',
\'category\': \'' . escape4js($arr['category']) . '\',
\'exam_date\': ' . (($arr['exam_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['exam_date_text']) . '\')') . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total';
if ($exam_type == 0) {
    $query .= ' FROM v_student_school_exam_results';
} else {
    $query .= ' FROM v_student_gibdd_exam_results';
}
$query .= ' where student_operation_id = ' . $student_operation_id;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
