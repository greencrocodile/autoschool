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

if (isset($_REQUEST['exam_group_id'])) {
    $exam_group_id = intval($_REQUEST['exam_group_id']);
} else {
	$exam_group_id = -1;
}

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
	$id = -1;
}
//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,exam_group_id,student_operation_id,student_number,number,student_full_name,school_unit_id,school_unit_name_short,theory_exam_id,theory_result_id,theory_result,theory_motive_id,city_exam_id,city_result_id,city_result,city_motive_id,cert_id,cert_number FROM v_exam_school_group';
if ($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where exam_group_id = '.$exam_group_id.' and active != 2 order by number, student_full_name';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'exam_group_id\':' . intval($arr['exam_group_id']) . ',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'student_number\': \'' . escape4js($arr['student_number']) . '\',
\'number\':' . intval($arr['number']) . ',
\'student_full_name\': \'' . escape4js($arr['student_full_name']) . '\',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'theory_exam_id\':' . intval($arr['theory_exam_id']) . ',
\'theory_result_id\':' . intval($arr['theory_result_id']) . ',
\'theory_result\': \'' . escape4js($arr['theory_result']) . '\',
\'theory_motive_id\':' . intval($arr['theory_motive_id']) . ',
\'city_exam_id\':' . intval($arr['city_exam_id']) . ',
\'city_result_id\':' . intval($arr['city_result_id']) . ',
\'city_result\': \'' . escape4js($arr['city_result']) . '\',
\'city_motive_id\':' . intval($arr['city_motive_id']) . ',
\'cert_id\':' . intval($arr['cert_id']) . ',
\'cert_number\': \'' . escape4js($arr['cert_number']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_exam_school_group';
if ($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where exam_group_id = '.$exam_group_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
