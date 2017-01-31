<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');

if (isset($_REQUEST['start'])) {
    $start = intval($_REQUEST['start']);
} else {
    $start = 0;
}

if (isset($_REQUEST['limit'])) {
    $limit = intval($_REQUEST['limit']);
} else {
    $limit = 40;
}

if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

//---------------------------------------

$query = 'SELECT id,name,table_name,dict_type FROM dictionaries order by name';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while (($arr = $result->fetch_assoc())) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'name\': \'' . escape4js($arr['name']) . '\',
	\'table_name\': \'' . escape4js($arr['table_name']) . '\',
	\'dict_type\':' . intval($arr['dict_type']) . '
}';
}

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM dictionaries';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while (($arr = $result->fetch_assoc()) !== false) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
?>