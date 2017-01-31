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
    $sort = '';
}

$sorters = array(
    'learning_discipline_name' => 'learning_discipline_name'
);


if (!isset($sorters[$sort])) {
    $sort = 'learning_discipline_name';
}

$sort = $sorters[$sort];

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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '-1';
}

$staff_id = intval($staff_id);

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,staff_id,learning_discipline_id,learning_discipline_name,date_start,date_start_text,date_certification,date_certification_text FROM v_staff_disciplines ';
if ($id != -1){
	$query .=  'where id = ' . $id;
} else {
	if ($staff_id != -1){
		$query .=  'where staff_id = ' . $staff_id;
	}
}
$query .= ' order by ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'staff_id\':' . intval($arr['staff_id']) . ',
	\'learning_discipline_id\':' . intval($arr['learning_discipline_id']) . ',
	\'learning_discipline_name\': \'' . escape4js($arr['learning_discipline_name']) . '\',
    \'date_start\': ' . (($arr['date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_start_text']) . '\')') . ',
	\'date_certification\': ' . (($arr['date_certification_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_certification_text']) . '\')') . '
	
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_staff_disciplines ';
if ($id != -1){
	$query .=  'where id = ' . $id;
} else {
	if ($staff_id != -1){
		$query .=  'where staff_id = ' . $staff_id;
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
