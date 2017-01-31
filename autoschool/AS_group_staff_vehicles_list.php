<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['group_id'])) {
    $group_id = $_REQUEST['group_id'];
} else {
    $group_id = '-1';
}

$group_id = intval($group_id);

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);

if (isset($_REQUEST['sort'])) {
    $sort = $_REQUEST['sort'];
} else {
    $sort = 'staff_name';
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
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
$query = 'SELECT id,learning_group_id,staff_id,staff_name,vehicle_id,vehicle_name FROM v_learning_groups_vehicles';
if ($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where learning_group_id = ' . $group_id;
} 
$query .= ' order by ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'learning_group_id\':' . intval($arr['learning_group_id']) . ',
\'vehicle_id\':' . intval($arr['vehicle_id']) . ',
\'vehicle_name\': \'' . escape4js($arr['vehicle_name']) . '\',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'staff_name\': \'' . escape4js($arr['staff_name']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_groups_vehicles ';
if ($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where learning_group_id = ' . $group_id;
} 

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
