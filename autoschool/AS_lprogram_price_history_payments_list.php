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

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
}

if (isset($_REQUEST['history_id'])) {
    $history_id = $_REQUEST['history_id'];
} else {
    $history_id = '-1';
}

$history_id = intval($history_id);


//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,history_id,required,price_part_id,price_part_name,value FROM v_learning_program_price_history_payments ';
if($history_id != -1){
	$query .= ' where history_id = ' . $history_id;
}
$query .= ' order by required desc, id asc limit ' . $limit . ' offset ' . $offset;

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',		
	\'history_id\':' . intval($arr['history_id']) . ',
	\'required\':' . intval($arr['required']) . ',
	\'price_part_id\':' . intval($arr['price_part_id']) . ',
	\'price_part_name\': \'' . escape4js($arr['price_part_name']) . '\',
	\'value\':' . floatval($arr['value']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_program_price_history_payments ';
if($history_id != -1){
	$query .= ' where history_id = ' . $history_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
