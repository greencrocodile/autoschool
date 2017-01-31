<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

//---------------------------------------
$query = 'SELECT serial,number+1 as number FROM v_last_certificate_serial_number';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'serial\': \'' . escape4js($arr['serial']) . '\',
\'number\': ' . intval($arr['number']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
} else {
    $d = '{
\'serial\': \'\',
\'number\': 1
}';
}

echo $callback . '({\'list\':[' . $d . ']});';
