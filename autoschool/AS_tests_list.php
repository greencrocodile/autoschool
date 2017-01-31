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
	$student_operation_id = -1;
}

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
    $id =-1;
}

if (isset($_REQUEST['test_date'])) {
    $test_date = $_REQUEST['test_date'];
} else {
    $test_date ='';
}

if($test_date != ''){
	$test_date = '\''.$test_date.'\'';
}

if (isset($_REQUEST['test_type_id'])) {
    $test_type_id = intval($_REQUEST['test_type_id']);
} else {
    $test_type_id =-1;
}
	
if (isset($_REQUEST['staff_id'])) {
    $staff_id = intval($_REQUEST['staff_id']);
} else {
    $staff_id =-1;
}

if (isset($_REQUEST['group_number'])) {
    $group_number = $_REQUEST['group_number'];
} else {
    $group_number ='';
}

if (isset($_REQUEST['sort'])) {
	$sort = $_REQUEST['sort'];
} else {
	$sort = 'exam_date';
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
}
	
//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,student_operation_id,full_name_with_group,school_unit_name_short,exam_date,exam_date_text,type_id,type_name,category,result_id,result_name,motive_id,motive_name FROM v_school_tests where id = id ';
if ($id != -1) {
    $query .= ' and id = '.$id;
} 
if ($student_operation_id != -1){
    $query .= ' and student_operation_id = '.$student_operation_id;
}

if ($test_date != ''){
	$query .= ' and exam_date = '.$test_date;
}

if ($test_type_id != -1){
	$query .= ' and type_id = '.$test_type_id;
}

if ($staff_id != -1){
	$query .= ' and staff_id = '.$staff_id;
}

if ($group_number != ''){
	$query .= ' and learning_group_number like \'%'.$group_number.'%\'';
}
$query .= ' order by '.$sort.' '.$dir;


$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\': \'' . escape4js($arr['id']) . '\',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'full_name_with_group\': \'' . escape4js($arr['full_name_with_group']) . '\',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
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
$query = 'SELECT count(*) AS Total FROM v_school_tests where id = id ';
if ($id != -1) {
    $query .= ' and id = '.$id;
} 
if ($student_operation_id != -1){
    $query .= ' and student_operation_id = '.$student_operation_id;
}

if ($test_date != ''){
	$query .= ' and exam_date = '.$test_date;
}

if ($test_type_id != -1){
	$query .= ' and type_id = '.$test_type_id;
}

if ($staff_id != -1){
	$query .= ' and staff_id = '.$staff_id;
}

if ($group_number != ''){
	$query .= ' and learning_group_number like \'%'.$group_number.'%\'';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
