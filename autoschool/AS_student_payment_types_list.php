<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');

if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
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

if (isset($_REQUEST['student_id'])) {
    $student_id = $_REQUEST['student_id'];
} else {
    $student_id = '';
}

if ($student_id == '') {
    echo 'не задан идентификатор студента';
    exit;
} else {
    $student_id = intval($student_id);
}

//---------------------------------------

$query = 'SELECT payment_type_id,payment_type_name FROM v_students_payment_types where student_id = ' . $student_id . ' and payment_type_id >= 0 order by payment_type_name asc';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'payment_type_id\':' . intval($arr['payment_type_id']) . ',
	\'payment_type_name\': \'' . escape4js($arr['payment_type_name']) . '\'
}';
}

if ($start_id == -1) {
    $d=',{
	\'payment_type_id\':-1,
	\'payment_type_name\':\'-----\'
}'.$d;
}

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_students_payment_types where student_id = ' . $student_id . ' and payment_type_id >= 0';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
