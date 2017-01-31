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

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
}

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '-1';
}

if ($learning_program_id == '') {
    echo 'Не задан идентификатор программы обучения';
    exit;
} else {
    $learning_program_id = intval($learning_program_id);
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,learning_program_id,learning_discipline_id,learning_discipline_name,hours FROM v_learning_programs_disciplines ';
if ($learning_program_id != -1){
	$query .= ' where learning_program_id = ' . $learning_program_id;
}
$query .=  ' order by learning_discipline_name asc limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'learning_program_id\':' . intval($arr['learning_program_id']) . ',
	\'learning_discipline_id\':' . intval($arr['learning_discipline_id']) . ',
	\'learning_discipline_name\': \'' . escape4js($arr['learning_discipline_name']) . '\',
	\'hours\':' . intval($arr['hours']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_learning_programs_disciplines where learning_program_id = ' . $learning_program_id;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
