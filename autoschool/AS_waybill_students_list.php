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

if (isset($_REQUEST['sort'])) {
    $sort = $_REQUEST['sort'];
} else {
    $sort = 'student_full_name';
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
    $id = -1;
}


if (isset($_REQUEST['waybill_id'])) {
    $waybill_id = intval($_REQUEST['waybill_id']);
} else {
    $waybill_id = -1;
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,waybill_id,student_operation_id,student_full_name,time_text,place_id,place,staff_id FROM v_waybills_students where id = id';
if ($id != -1){
	$query .= ' and id = '.$id;
} else {
	$query .= ' and active != 2 and waybill_id = '.$waybill_id;
}
$query .= ' order by '.$sort.' '.$dir;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'waybill_id\':' . intval($arr['waybill_id']) . ',
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'student_full_name\': \'' . escape4js($arr['student_full_name']) . '\',
\'time_text\': \'' . escape4js($arr['time_text']) . '\',
\'place_id\':' . intval($arr['place_id']) . ',
\'place\': \'' . escape4js($arr['place']) . '\',
\'staff_id\':' . intval($arr['staff_id']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_waybills_students where id = id';
if ($id != -1){
	$query .= ' and id = '.$id;
} else {
	$query .= ' and active != 2 and waybill_id = '.$waybill_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
