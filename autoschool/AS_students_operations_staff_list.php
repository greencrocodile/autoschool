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
    $sort = 'full_name';
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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = intval($_REQUEST['staff_id']);
} else {
	echo 'не задан идентификатор инструктора';
	exit;
}

if (isset($_REQUEST['learning_group_number'])) {
    $learning_group_number = $_REQUEST['learning_group_number'];
} else {
	echo 'не задан идентификатор инструктора';
	exit;
}


//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,full_name_with_group,staff_id,learning_group_number FROM v_students_operations_staff where staff_id = '.$staff_id.' and learning_group_number like \'%'.$learning_group_number.'%\' order by full_name_with_group acs limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'full_name_with_group\': \'' . escape4js($arr['full_name_with_group']) . '\',
\'learning_group_number\': \'' . escape4js($arr['learning_group_number']) . '\'
}';
}
$result->free_result();

if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_students_operations_staff where staff_id = '.$staff_id.' and learning_group_number like \'%'.$learning_group_number.'%\'';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
