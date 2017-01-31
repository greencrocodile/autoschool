<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);

if (isset($_REQUEST['program_id'])) {
    $program_id = $_REQUEST['program_id'];
} else {
    $program_id = '';
}
if ($program_id == '') {
    echo 'Не задан идентификатор программы.';
    exit;
} else {
    $program_id = intval($program_id);
}

if (isset($_REQUEST['discipline_id'])) {
    $discipline_id = $_REQUEST['discipline_id'];
} else {
    $discipline_id = '-1';
}

if ($discipline_id == '-1') {
    $discipline_id = 'null';
} else {
    $discipline_id = intval($discipline_id);
}

if (isset($_REQUEST['user_id'])) {
    $user_id = $_REQUEST['user_id'];
} else {
    $user_id = '';
}

if ($user_id == '') {
    $user_id = 'null';
} else {
    $user_id = intval($user_id);
}

if (isset($_REQUEST['hours'])) {
    $hours = $_REQUEST['hours'];
} else {
    $hours = '0';
}

$hours = intval($hours);

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'CALL sp_LearningProgramDisciplineEdit(@p_id,' . $program_id . ',' . $discipline_id . ',' . $hours . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'select @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
