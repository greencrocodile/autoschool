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

if (isset($_REQUEST['active_only'])) {
    $active_only = intval($_REQUEST['active_only']);
} else {
	$active_only = 0;
}

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
	$id = -1;
}
//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,firstname,middlename,lastname,full_name,initials_name,login,school_unit_id,school_unit_name_short,school_unit_name_full,privileges,active FROM v_users where id = id';
if ($id != -1){
	$query .= ' and id = '.$id;
} else {
	if ($active_only == 1){
		$query .= ' and active = 1';	
	} else {
		$query .= ' and active != 2';
	}
}
$query .= ' order by active desc, full_name asc';

 
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'firstname\': \'' . escape4js($arr['firstname']) . '\',
\'middlename\': \'' . escape4js($arr['middlename']) . '\',
\'lastname\': \'' . escape4js($arr['lastname']) . '\',
\'full_name\': \'' . escape4js($arr['full_name']) . '\',
\'initials_name\': \'' . escape4js($arr['initials_name']) . '\',
\'login\': \'' . escape4js($arr['login']) . '\',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'school_unit_name_full\': \'' . escape4js($arr['school_unit_name_full']) . '\',
\'privileges\': \'' . escape4js($arr['privileges']) . '\',
\'active\':' . intval($arr['active']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_users where id = id';
if ($id != -1){
	$query .= ' and id = '.$id;
} else {
	if ($active_only == 1){
		$query .= ' and active = 1';	
	} else {
		$query .= ' and active != 2';
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
