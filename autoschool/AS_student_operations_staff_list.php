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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = intval($_REQUEST['staff_id']);
} else {
	$staff_id = -1;
}

if (isset($_REQUEST['start_id'])) {
    $start_id = intval($_REQUEST['start_id']);
} else {
	$start_id = -1;
}

if (isset($_REQUEST['learning_group_number'])) {
    $learning_group_number = $_REQUEST['learning_group_number'];
} else {
	$learning_group_number = '';
}

if (isset($_REQUEST['sort'])) {
	$sort = $_REQUEST['sort'];
} else {
	$sort = 'id';
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
$query = 'SELECT id,full_name_with_group,staff_id,learning_group_number FROM v_students_operations_staff where id = id ';
if($staff_id != -1){
	$query .= ' and staff_id = '.$staff_id;
}

if($learning_group_number != ''){
	$query .= ' and learning_group_number like \'%'.$learning_group_number.'%\'';
}

$query .= ' order by '.$sort.' '.$dir;


$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\': \'' . escape4js($arr['id']) . '\',
\'full_name_with_group\': \'' . escape4js($arr['full_name_with_group']) . '\',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'learning_group_number\': \'' . escape4js($arr['learning_group_number']) . '\'
}';
}
$result->free_result();

if ($start_id == -1) {
    $d=',{
\'id\': -1,
\'full_name_with_group\': \'-----\',
\'staff_id\':-1,
\'learning_group_number\': \'-----\'
}'.$d;
}
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_students_operations_staff where id = id ';
if($staff_id != -1){
	$query .= ' and staff_id = '.$staff_id;
}

if($learning_group_number != ''){
	$query .= ' and learning_group_number like \'%'.$learning_group_number.'%\'';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
