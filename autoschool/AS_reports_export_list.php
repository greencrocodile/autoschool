<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');

if (isset($_REQUEST['codes'])) {
    $codes = trim($_REQUEST['codes']);
} else {
    $codes = '';
}
if ($codes == '') {
    echo 'Не задан перечень.';
    exit;
}

if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

//---------------------------------------

$query = 'SELECT name,file_name,list_number FROM as_reports where code in ('.$codes.')';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'list_number\':' . intval($arr['list_number']) . ',
\'name\': \'' . escape4js($arr['name']) . '\',
\'file_name\': \'' . escape4js($arr['file_name']) . '\'
}';
}

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM as_reports where code in ('.$codes.')';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
