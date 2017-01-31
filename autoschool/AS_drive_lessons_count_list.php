<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
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
if($number != '' || $date_from != '' || $date_till != '' || $staff_id != -1 || $vehicle_id != -1){
	$wh = 'select id from waybills where active = 1';
	if($number != ''){
		$wh .= ' and number like \'%'.$number.'%\'';
	}
	if($date_from != ''){
		$wh .= ' and date >= '.$date_from;
	}
	if($date_till != ''){
		$wh .= ' and date <= '.$date_till;
	}
	if($staff_id != -1){
		$wh .= ' and staff_id = '.$staff_id;
	}
	if($vehicle_id != -1){
		$wh .= ' and vehicle_id = '.$vehicle_id;
	}
} else {
	$wh = '';
}
if ($wh == ''){
$query = 'SELECT 
(select count(*) from waybills where active = 1) as waybills_count,
(select count(*) from waybills_students where active = 1) as drive_lessons_total,
(select count(*) from waybills_students where active = 1 and place in (\'1\',\'2\')) as drive_lessons_program,
(select count(*) from waybills_students where active = 1 and place in (\'1\')) as drive_lessons_city,
(select count(*) from waybills_students where active = 1 and place in (\'2\')) as drive_lessons_polygon,
(select count(*) from waybills_students where active = 1 and place in (\'3\')) as drive_lessons_add
';
} else {
	$query = 'SELECT 
(select count(*) from waybills where active = 1 and id in ('.$wh.')) as waybills_count,
(select count(*) from waybills_students where active = 1 and waybill_id in ('.$wh.')) as drive_lessons_total,
(select count(*) from waybills_students where active = 1 and waybill_id in ('.$wh.') and place in (\'1\',\'2\')) as drive_lessons_program,
(select count(*) from waybills_students where active = 1 and waybill_id in ('.$wh.') and place in (\'1\')) as drive_lessons_city,
(select count(*) from waybills_students where active = 1 and waybill_id in ('.$wh.') and place in (\'2\')) as drive_lessons_polygon,
(select count(*) from waybills_students where active = 1 and waybill_id in ('.$wh.') and place in (\'3\')) as drive_lessons_add
';
}

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.='{
\'waybills_count\':' . intval($arr['waybills_count']) . ',
\'drive_lessons_total\':' . intval($arr['drive_lessons_total']) . ',
\'drive_lessons_program\':' . intval($arr['drive_lessons_program']) . ',
\'drive_lessons_city\':' . intval($arr['drive_lessons_city']) . ',
\'drive_lessons_polygon\':' . intval($arr['drive_lessons_polygon']) . ',
\'drive_lessons_add\':' . intval($arr['drive_lessons_add']) . '

}';
}
$result->free_result();


echo $callback . '({\'list\':[' . $d . ']});';
