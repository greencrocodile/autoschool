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

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '-1';
}

$learning_program_id = intval($learning_program_id);

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);

if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '0';
}

$start_id = intval($start_id);

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,learning_program_id,price,date_begin,date_begin_text FROM v_learning_program_price_history ';
if($id != -1){
	$query .= ' where id = '.$id;
} else {
	if ($learning_program_id != -1){
		$query .= ' where learning_program_id = ' . $learning_program_id;
	}	
}

$query .=  ' order by date_begin desc limit ' . $limit . ' offset ' . $offset; 
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'learning_program_id\':' . intval($arr['learning_program_id']) . ',
	\'price\': \'' . escape4js($arr['price']) . '\',
	\'date_begin\': ' . (($arr['date_begin_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_begin_text']) . '\')') . '
}';
}
$result->free_result();

if ($start_id == -1) {
    $d=',{
\'id\':-1,
\'learning_program_id\':' . intval($learning_program_id) . ',
\'price\': \'-----\',
\'date_begin\': \'\'
}'.$d;
}
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_program_price_history';
if($id != -1){
	$query .= ' where id = '.$id;
} else {
	if ($learning_program_id != -1){
		$query .= ' where learning_program_id = ' . $learning_program_id;
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
