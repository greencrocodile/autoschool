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
    'mark_name' => 'mark_name',
    'full_name' => 'full_name'
);


if (!isset($sorters[$sort])) {
    $sort = 'full_name';
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
    $start_id = '';
}

if ($start_id == '') {
    $start_id = '0';
} else {
    $start_id = intval($start_id);
}

if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
}

//---------------------------------------
$query = 'SELECT id,mark_id,full_id,mark_name,name,full_name,dict_name,value_label FROM v_vehicle_models where id >= 0 order by ' . $sort . ' ' . $dir;
$result = mysqli_query($AS_db, $query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = mysqli_fetch_assoc($result)) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'full_id\': \'' . escape4js($arr['full_id']) . '\',
	\'name\': \'' . escape4js($arr['name']) . '\',
	\'mark_id\':' . intval($arr['mark_id']) . ',
	\'mark_name\': \'' . escape4js($arr['mark_name']) . '\',
	\'full_name\': \'' . escape4js($arr['full_name']) . '\',
	\'dict_name\': \'' . escape4js($arr['dict_name']) . '\',
	\'value_label\': \'' . escape4js($arr['value_label']) . '\'
}';
}
if ($start_id == -1) {
    $d=',{
	\'id\':-1,
	\'full_id\': \'\',
	\'name\': \'-----\',
	\'mark_id\':-1,
	\'mark_name\': \'-----\',
	\'full_name\': \'-----\',
	\'dict_name\': \'\',
	\'value_label\': \'\'
}'.$d;
}

mysqli_free_result($result);
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_vehicle_models';
$result = mysqli_query($AS_db, $query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = mysql_fetch_assoc($result)) {
    $total = intval($arr['Total']);
    break;
}
mysqli_free_result($result);

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
