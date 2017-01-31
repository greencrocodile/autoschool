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
	$sort = 'model_name';
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



if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '0';
}

$start_id = intval($start_id);

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '-1';
}

$staff_id = intval($staff_id);


if (isset($_REQUEST['active_only'])) {
    $active_only = $_REQUEST['active_only'];
} else {
    $active_only = '0';
}
$active_only = intval($active_only);

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}
$id = intval($id);
//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'select id,model_name,reg_number,year,VIN,color_name,staff_id,staff_name,staff_initials_name,vehicle_name,active from v_vehicles where id >= 0';
if ($id != -1){
	$query .= ' and id = '.$id;
} else {
		if ($active_only == 1) {
			$query.=' and active = 1';
		} else {
			$query.=' and active in(0,1)';
		}
		
		if ($staff_id != -1){
			$query.=' and staff_id = '.$staff_id;
		}
}
$query.=' order by active desc, ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'model_name\': \'' . escape4js($arr['model_name']) . '\',
	\'reg_number\': \'' . escape4js($arr['reg_number']) . '\',
	\'year\':' . intval($arr['year']) . ',
	\'vin\': \'' . escape4js($arr['VIN']) . '\',
	\'color_id\':' . intval($arr['color_id']) . ',
	\'color_name\': \'' . escape4js($arr['color_name']) . '\',
	\'staff_id\':' . intval($arr['staff_id']) . ',
    \'staff_name\': \'' . escape4js($arr['staff_name']) . '\',
    \'staff_initials_name\': \'' . escape4js($arr['staff_initials_name']) . '\',
    \'vehicle_name\': \'' . escape4js($arr['vehicle_name']) . '\',
	\'active\':' . intval($arr['active']) . '
}';
}

if ($start_id == -1) {
    $d=',{
	\'id\':-1,
	\'model_name\': \'-----\',
	\'reg_number\': \'\',
	\'year\':0,
	\'vin\': \'\',
	\'color_id\':-1,
	\'color_name\': \'\',
	\'staff_id\':-1,
    \'staff_name\': \'\',
    \'staff_initials_name\': \'\',
    \'vehicle_name\': \'-----\',
	\'active\':0
}'.$d;
}

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total from v_vehicles where id >= 0';
if ($id != -1){
	$query .= ' and id = '.$id;
} else {
	if($show_all != 1){
		if ($active_only == 1) {
			$query.=' and active = 1';
		} else {
			$query.=' and active in(0,1)';
		}
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
