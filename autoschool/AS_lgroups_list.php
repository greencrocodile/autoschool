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
    $sort = 'date_start';
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'DESC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'DESC';
}

if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '';
}

if ($start_id == '') {
    $start_id = -1;
} else {
    $start_id = intval($start_id);
}

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);

if (isset($_REQUEST['active_only'])) {
    $active_only = $_REQUEST['active_only'];
} else {
    $active_only = '0';
}

$active_only = intval($active_only);

if (isset($_REQUEST['group_number'])) {
    $group_number = $_REQUEST['group_number'];
} else {
    $group_number = '';
}

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = intval($_REQUEST['learning_program_id']);
} else {
    $learning_program_id = -1;
}

if (isset($_REQUEST['school_unit_id'])) {
    $school_unit_id = intval($_REQUEST['school_unit_id']);
} else {
    $school_unit_id = -1;
}

if (isset($_REQUEST['date_start_from'])) {
    $date_start_from = $_REQUEST['date_start_from'];
} else {
    $date_start_from = '';
}

if ($date_start_from != ''){
	$date_start_from = '\''.$date_start_from.'\'';
}

if (isset($_REQUEST['date_start_till'])) {
    $date_start_till = $_REQUEST['date_start_till'];
} else {
    $date_start_till = '';
}

if ($date_start_till != ''){
	$date_start_till = '\''.$date_start_till.'\'';
}

if (isset($_REQUEST['date_end_from'])) {
    $date_end_from = $_REQUEST['date_end_from'];
} else {
    $date_end_from = '';
}

if ($date_end_from != ''){
	$date_end_from = '\''.$date_end_from.'\'';
}

if (isset($_REQUEST['date_end_till'])) {
    $date_end_till = $_REQUEST['date_end_till'];
} else {
    $date_end_till = '';
}

if ($date_end_till != ''){
	$date_end_till = '\''.$date_end_till.'\'';
}

if (isset($_REQUEST['theory_exam_date_from'])) {
    $theory_exam_date_from = $_REQUEST['theory_exam_date_from'];
} else {
    $theory_exam_date_from = '';
}

if ($theory_exam_date_from != ''){
	$theory_exam_date_from = '\''.$theory_exam_date_from.'\'';
}

if (isset($_REQUEST['theory_exam_date_till'])) {
    $theory_exam_date_till = $_REQUEST['theory_exam_date_till'];
} else {
    $theory_exam_date_till = '';
}

if ($theory_exam_date_till != ''){
	$theory_exam_date_till = '\''.$theory_exam_date_till.'\'';
}

if (isset($_REQUEST['practice_exam_date_from'])) {
    $practice_exam_date_from = $_REQUEST['practice_exam_date_from'];
} else {
    $practice_exam_date_from = '';
}

if ($practice_exam_date_from != ''){
	$practice_exam_date_from = '\''.$practice_exam_date_from.'\'';
}

if (isset($_REQUEST['practice_exam_date_till'])) {
    $practice_exam_date_till = $_REQUEST['practice_exam_date_till'];
} else {
    $practice_exam_date_till = '';
}

if ($practice_exam_date_till != ''){
	$practice_exam_date_till = '\''.$practice_exam_date_till.'\'';
}

if (isset($_REQUEST['gibdd_exam_date_from'])) {
    $gibdd_exam_date_from = $_REQUEST['gibdd_exam_date_from'];
} else {
    $gibdd_exam_date_from = '';
}

if ($gibdd_exam_date_from != ''){
	$gibdd_exam_date_from = '\''.$gibdd_exam_date_from.'\'';
}

if (isset($_REQUEST['gibdd_exam_date_till'])) {
    $gibdd_exam_date_till = $_REQUEST['gibdd_exam_date_till'];
} else {
    $gibdd_exam_date_till = '';
}

if ($gibdd_exam_date_till != ''){
	$gibdd_exam_date_till = '\''.$gibdd_exam_date_till.'\'';
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
$query = 'SELECT id,number,school_unit_id,school_unit_name_short,date_start_text,date_end_text,learning_program_id,learning_program_name_full,learning_program_name_short,theory_exam_date_text,practice_exam_date_text,gibdd_exam_date_text,reg_order_number,reg_order_date_text,gibdd_reg_staff_id,gibdd_reg_staff_name,gibdd_reg_number,gibdd_reg_date_text,price_id,price,active,confirmed FROM v_learning_groups where id >= 0 ';
if($id != -1){
	$query .= ' and id = '.$id;
} else {
	if ($active_only == 1){
		$query .= ' and active = 1 ';
	}
}
if ($group_number != ''){
	$query .= ' and number like \'%'.$group_number.'%\'';
}

if($learning_program_id != -1){
	$query .= ' and learning_program_id = '.$learning_program_id;
}

if($date_start_from != ''){
	$query .= ' and date_start >= '.$date_start_from;
}

if($date_start_till != ''){
	$query .= ' and date_start <= '.$date_start_till;
}

if($date_end_from != ''){
	$query .= ' and date_end >= '.$date_end_from;
}

if($date_end_till != ''){
	$query .= ' and date_end <= '.$date_end_till;
}

if($theory_exam_date_from != ''){
	$query .= ' and theory_exam_date >= '.$theory_exam_date_from;
}

if($theory_exam_date_till != ''){
	$query .= ' and theory_exam_date <= '.$theory_exam_date_till;
}

if($practice_exam_date_from != ''){
	$query .= ' and practice_exam_date >= '.$practice_exam_date_from;
}

if($practice_exam_date_till != ''){
	$query .= ' and practice_exam_date <= '.$practice_exam_date_till;
}

if($gibdd_exam_date_from != ''){
	$query .= ' and gibdd_exam_date >= '.$gibdd_exam_date_from;
}

if($gibdd_exam_date_till != ''){
	$query .= ' and gibdd_exam_date <= '.$gibdd_exam_date_till;
}

if($school_unit_id != -1){
	$query .= ' and school_unit_id = '.$school_unit_id;
}


// программа обучения

		// начало обучения с по
		// окончание обучения с по
		// дата сдачи теории с по
		// дата сдачи вождения с по
		// дата экзамена гибдд с по
		// место занятий
	
$query .= ' order by ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'number\': \'' . escape4js($arr['number']) . '\',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'date_start\': ' . (($arr['date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_start_text']) . '\')') . ',
\'date_end\': ' . (($arr['date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_end_text']) . '\')') . ',
\'learning_program_id\':' . intval($arr['learning_program_id']) . ',
\'learning_program_name_full\': \'' . escape4js($arr['learning_program_name_full']) . '\',
\'learning_program_name_short\': \'' . escape4js($arr['learning_program_name_short']) . '\',
\'theory_exam_date\': ' . (($arr['theory_exam_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['theory_exam_date_text']) . '\')') . ',
\'practice_exam_date\': ' . (($arr['practice_exam_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['practice_exam_date_text']) . '\')') . ',
\'gibdd_exam_date\': ' . (($arr['gibdd_exam_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['gibdd_exam_date_text']) . '\')') . ',
\'reg_order_number\': \'' . escape4js($arr['reg_order_number']) . '\',
\'reg_order_date\': ' . (($arr['reg_order_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['reg_order_date_text']) . '\')') . ',
\'gibdd_reg_staff_id\':' . intval($arr['gibdd_reg_staff_id']) . ',
\'gibdd_reg_staff_name\': \'' . escape4js($arr['gibdd_reg_staff_name']) . '\',
\'gibdd_reg_number\': \'' . escape4js($arr['gibdd_reg_number']) . '\',
\'gibdd_reg_date\': ' . (($arr['gibdd_reg_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['gibdd_reg_date_text']) . '\')') . ',
\'price_id\':' . intval($arr['price_id']) . ',
\'price\':' . floatval($arr['price']) . ',
\'active\':' . intval($arr['active']) . ',
\'confirmed\':' . intval($arr['confirmed']) . '
}';
}
$result->free_result();

if ($start_id == -1) {
    $d=',{
\'id\':-1,
\'number\': \'-----\',
\'school_unit_id\':-1,
\'school_unit_name_short\': \'\',
\'date_start\': \'\',
\'date_end\': \'\',
\'learning_program_id\':-1,
\'learning_program_name_full\': \'\',
\'learning_program_name_short\': \'\',
\'theory_exam_date\': \'\',
\'practice_exam_date\': \'\',
\'gibdd_exam_date\': \'\',
\'reg_order_number\': \'\',
\'reg_order_date\': \'\',
\'gibdd_reg_staff_id\':-1,
\'gibdd_reg_staff_name\': \'\',
\'gibdd_reg_number\': \'\',
\'gibdd_reg_date\': \'\',
\'price_id\':-1,
\'price\':0,
\'active\':1,
\'confirmed\':0
		}'.$d;
}
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_groups where id >= 0 ';
if($id != -1){
	$query .= ' and id = '.$id;
} else {
	if ($active_only == 1){
		$query .= ' and active = 1 ';
	}
}
if ($group_number != ''){
	$query .= ' and number like \'%'.$group_number.'%\'';
}

if($learning_program_id != -1){
	$query .= ' and learning_program_id = '.$learning_program_id;
}

if($date_start_from != ''){
	$query .= ' and date_start >= '.$date_start_from;
}

if($date_start_till != ''){
	$query .= ' and date_start <= '.$date_start_till;
}

if($date_end_from != ''){
	$query .= ' and date_end >= '.$date_end_from;
}

if($date_end_till != ''){
	$query .= ' and date_end <= '.$date_end_till;
}

if($theory_exam_date_from != ''){
	$query .= ' and theory_exam_date >= '.$theory_exam_date_from;
}

if($theory_exam_date_till != ''){
	$query .= ' and theory_exam_date <= '.$theory_exam_date_till;
}

if($practice_exam_date_from != ''){
	$query .= ' and practice_exam_date >= '.$practice_exam_date_from;
}

if($practice_exam_date_till != ''){
	$query .= ' and practice_exam_date <= '.$practice_exam_date_till;
}

if($gibdd_exam_date_from != ''){
	$query .= ' and gibdd_exam_date >= '.$gibdd_exam_date_from;
}

if($gibdd_exam_date_till != ''){
	$query .= ' and gibdd_exam_date <= '.$gibdd_exam_date_till;
}

if($school_unit_id != -1){
	$query .= ' and school_unit_id = '.$school_unit_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
