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
    $sort = 'name_full';
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

if (isset($_REQUEST['learning_program_type'])) {
    $learning_program_type = '\'' . $_REQUEST['learning_program_type'] . '\'';
} else {
    $learning_program_type = '';
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,name_short,name_full,learning_program_type,learning_program_type_name,category,days,drive_lessons,drive_lessons_length,drive_lessons_price,active FROM v_learning_programs where id >= 0';
if($id != -1){
	$query .= ' and id = '.$id;
} else {
	if ($active_only == 1) {
		$query.=' and active = 1 ';
	} else {
		$query.=' and active in (0,1) ';
	}
	
	if ($learning_program_type != '') {
		$query.=' and learning_program_type = ' . $learning_program_type;
	}
}

$query.=' order by active desc, ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'name_short\': \'' . escape4js($arr['name_short']) . '\',
\'name_full\': \'' . escape4js($arr['name_full']) . '\',
\'learning_program_type\': \'' . escape4js($arr['learning_program_type']) . '\',
\'learning_program_type_name\': \'' . escape4js($arr['learning_program_type_name']) . '\',
\'category\': \'' . escape4js($arr['category']) . '\',	
\'days\':' . intval($arr['days']) . ',
\'drive_lessons\':' . intval($arr['drive_lessons']) . ',
\'drive_lessons_length\': \'' . escape4js($arr['drive_lessons_length']) . '\',	
\'drive_lessons_price\':' . floatval($arr['drive_lessons_price']) . ',
\'active\':' . intval($arr['active']) . '
}';
}
$result->free_result();
if ($start_id == -1) {
    $d=',{
\'id\':-1,
\'name_short\': \'-----\',
\'name_full\': \'-----\',
\'learning_program_type\': \'\',
\'learning_program_type_name\': \'\',
\'category\': \'\',	
\'days\':0,
\'drive_lessons\':0,
\'drive_lessons_length\': \'\',
\'drive_lessons_price\':0,
\'active\':1
}'.$d;
}
if ($d != '') {
    $d = mb_substr($d, 1);
}

$query = 'SELECT count(*) AS Total FROM v_learning_programs where id >= 0';
if($id != -1){
	$query .= ' and id = '.$id;
} else {
	if ($active_only == 1) {
		$query.=' and active = 1 ';
	} else {
		$query.=' and active in (0,1) ';
	}
	
	if ($learning_program_type != '') {
		$query.=' and learning_program_type = ' . $learning_program_type;
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
