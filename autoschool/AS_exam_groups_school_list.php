<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
	$id = -1;
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

if (isset($_REQUEST['school_unit_id'])) {
    $school_unit_id = intval($_REQUEST['school_unit_id']);
} else {
	$school_unit_id = -1;
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,number,learning_group_id,school_unit_id,school_unit_name_full,school_unit_name_short,exam_date,exam_date_text,protocol_number,protocol_date,protocol_date_text,gibdd_reg_staff_id,gibdd_reg_staff_initials_name,gibdd_reg_date,gibdd_reg_date_text FROM v_exam_school_groups ';
if ($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where active != 2';
	if($school_unit_id != -1){
		$query .= ' and school_unit_id = '.$school_unit_id;
	}
	$query .= ' order by exam_date desc';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'number\': \'' . escape4js($arr['number']) . '\',
\'learning_group_id\':' . intval($arr['learning_group_id']) . ',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_full\': \'' . escape4js($arr['school_unit_name_full']) . '\',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'exam_date\': ' . (($arr['exam_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['exam_date_text']) . '\')') . ',
\'protocol_number\': \'' . escape4js($arr['protocol_number']) . '\',
\'protocol_date\': ' . (($arr['protocol_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['protocol_date_text']) . '\')') . ',
\'gibdd_reg_staff_id\':' . intval($arr['gibdd_reg_staff_id']) . ',
\'gibdd_reg_staff_initials_name\': \'' . escape4js($arr['gibdd_reg_staff_initials_name']) . '\',
\'gibdd_reg_date\': ' . (($arr['gibdd_reg_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['gibdd_reg_date_text']) . '\')') . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_exam_school_groups';
if ($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where active != 2';
	if($school_unit_id != -1){
		$query .= ' and school_unit_id = '.$school_unit_id;
	}
	$query .= ' order by exam_date desc';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
