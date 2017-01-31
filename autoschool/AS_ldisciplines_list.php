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
    'name' => 'name',
    'learning_discipline_type_name' => 'learning_discipline_type_name'
);


if (!isset($sorters[$sort])) {
    $sort = 'name';
}

$sort = $sorters[$sort];

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
}

if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '0';
}

$start_id = intval($start_id);

if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '0';
}

$start_id = intval($start_id);

if (isset($_REQUEST['parent_id'])) {
    $parent_id = $_REQUEST['parent_id'];
} else {
    $parent_id = '-1';
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

$offset = ($page - 1) * $limit;
//---------------------------------------
$query = 'SELECT id,name,full_name,parent_id,parent_name FROM v_learning_disciplines';
if($parent_id != -1){
	$query .= ' where parent_id = '.$parent_id;
} else {
	$query .= ' where parent_id is not null';
}
$query.=' order by ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'name\': \'' . escape4js($arr['name']) . '\',
	\'full_name\': \'' . escape4js($arr['full_name']) . '\',	
	\'parent_id\':' . intval($arr['parent_id']) . ',
	\'parent_name\': \'' . escape4js($arr['parent_name']) . '\'
}';
}

if ($start_id == -1) {
    $d=',{
	\'id\':-1,
	\'name\': \'-----\',
	\'full_name\': \'-----\',
	\'parent_id\':-1,
	\'parent_name\': \'-----\'
}'.$d;
}

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_disciplines ';
if($parent_id != -1){
	$query .= ' where parent_id = '.$parent_id;
} else {
	$query .= ' where parent_id is not null';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
