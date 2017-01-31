<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

//---------------------------------------
$query = 'select name,value from variables';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'name\': \'' . escape4js($arr['name']) . '\',
\'value\': \'' . escape4js($arr['value']) . '\',
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}

echo $callback . '({\'list\':[' . $d . ']});';
