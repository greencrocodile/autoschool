<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

if (isset($_REQUEST['group_id'])) {
    $group_id = $_REQUEST['group_id'];
} else {
    $group_id = '';
}
if ($group_id == '') {
    echo 'Не задан идентификатор группы.';
    exit;
} else {
    $group_id = intval($group_id);
}

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '';
}
if ($learning_program_id == '') {
    echo 'Не задан идентификатор программы.';
    exit;
} else {
    $learning_program_id = intval($learning_program_id);
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

$query = 'CALL sp_SetGroupDisciplinesFromPrograms(' . $group_id . ',' . $learning_program_id . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

echo 'ok';
