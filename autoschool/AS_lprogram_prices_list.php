<?php

require('config.php');

header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '';
}

if ($learning_program_id == '') {
    echo 'не указан идентификатор программы обучения';
    exit;
} else {
    $learning_program_id = intval($learning_program_id);
}



//---------------------------------------
$query = 'SELECT learning_program_id,price FROM v_learning_program_prices where learning_program_id = ' . $learning_program_id;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'learning_program_id\':' . intval($arr['learning_program_id']) . ',
\'price\':' . floatval($arr['price']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_program_prices where learning_program_id = ' . $learning_program_id;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
