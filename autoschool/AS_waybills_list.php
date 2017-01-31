<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['sort'])) {
    $sort = $_REQUEST['sort'];
} else {
    $sort = 'date';
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'DESC';
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

if (isset($_REQUEST['id'])) {
	$id = intval($_REQUEST['id']);
} else {
	$id = -1;
}

if (isset($_REQUEST['number'])) {
	$number = $_REQUEST['number'];
} else {
	$number = '';
}

if (isset($_REQUEST['date_from'])) {
	$date_from = $_REQUEST['date_from'];
} else {
	$date_from = '';
}

if ($date_from != ''){
	$date_from  = '\''.$date_from.'\'';
}

if (isset($_REQUEST['date_till'])) {
	$date_till = $_REQUEST['date_till'];
} else {
	$date_till = '';
}

if ($date_till != ''){
	$date_till  = '\''.$date_till.'\'';
}

if (isset($_REQUEST['staff_id'])) {
	$staff_id = intval($_REQUEST['staff_id']);
} else {
	$staff_id = -1;
}

if (isset($_REQUEST['vehicle_id'])) {
	$vehicle_id = intval($_REQUEST['vehicle_id']);
} else {
	$vehicle_id = -1;
}


//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,number,date,date_text,odo,staff_id,staff_initials_name,vehicle_id,model_name,reg_number,vehicle_name FROM v_waybills where id = id';
if($id != -1){
	$query .= ' and id = '.$id;
} else {
	$query .= ' and active != 2';
	if ($number != ''){
		$query .= ' and number like \'%'.$number.'%\'';
	}

	if ($date_from != ''){
		$query .= ' and date >= '.$date_from;
	}

	if ($date_till != ''){
		$query .= ' and date <= '.$date_till;
	}

	if ($staff_id != -1){
		$query .= ' and staff_id = '.$staff_id;
	}

	if ($vehicle_id != -1){
		$query .= ' and vehicle_id = '.$vehicle_id;
	}
}

$query .= ' order by '.$sort.' '.$dir.' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'number\': \'' . escape4js($arr['number']) . '\',
\'date\': ' . (($arr['date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_text']) . '\')') . ',
\'odo\':' . intval($arr['odo']) . ',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'staff_initials_name\': \'' . escape4js($arr['staff_initials_name']) . '\',
\'vehicle_id\':' . intval($arr['vehicle_id']) . ',
\'model_name\': \'' . escape4js($arr['model_name']) . '\',
\'reg_number\': \'' . escape4js($arr['reg_number']) . '\',
\'vehicle_name\': \'' . escape4js($arr['vehicle_name']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_waybills where id = id';
if($id != -1){
	$query .= ' and id = '.$id;
} else {
	$query .= ' and active != 2';
	if ($number != ''){
		$query .= ' and number like \'%'.$number.'%\'';
	}

	if ($date_from != ''){
		$query .= ' and date >= '.$date_from;
	}

	if ($date_till != ''){
		$query .= ' and date <= '.$date_till;
	}

	if ($staff_id != -1){
		$query .= ' and staff_id = '.$staff_id;
	}

	if ($vehicle_id != -1){
		$query .= ' and vehicle_id = '.$vehicle_id;
	}
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
