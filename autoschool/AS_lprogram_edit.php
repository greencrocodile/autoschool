<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '';
}
if ($id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
    $id = intval($id);
}

if (isset($_REQUEST['learning_program_type'])) {
    $learning_program_type = $_REQUEST['learning_program_type'];
} else {
    $learning_program_type = -1;
}

if ($learning_program_type == -1){
	$learning_program_type = 'null';
} else {
	$learning_program_type = '\'' . $learning_program_type . '\'';
}

if (isset($_REQUEST['days'])) {
    $days = $_REQUEST['days'];
} else {
    $days = '0';
}

$days = intval($days);

if (isset($_REQUEST['drive_lessons'])) {
    $drive_lessons = $_REQUEST['drive_lessons'];
} else {
    $drive_lessons = '0';
}

$drive_lessons = intval($drive_lessons);

if (isset($_REQUEST['drive_lessons_price'])) {
    $drive_lessons_price = $_REQUEST['drive_lessons_price'];
} else {
    $drive_lessons_price = '0';
}

$drive_lessons_price = floatval($drive_lessons_price);

if (isset($_REQUEST['drive_lessons_length'])) {
    $drive_lessons_length = $_REQUEST['drive_lessons_length'];
} else {
    $drive_lessons_length = '';
}

$drive_lessons_length = '\'' . $drive_lessons_length . '\'';

if (isset($_REQUEST['name_short'])) {
    $name_short = trim($_REQUEST['name_short']);
} else {
    $name_short = '';
}

$name_short = '\'' . $name_short . '\'';

if (isset($_REQUEST['name_full'])) {
    $name_full = trim($_REQUEST['name_full']);
} else {
    $name_full = '';
}

$name_full = '\'' . $name_full . '\'';

if (isset($_REQUEST['category'])) {
    $category = trim($_REQUEST['category']);
} else {
    $category = '';
}

$category = '\'' . $category . '\'';

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

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'CALL sp_LearningProgramEdit(@p_id, ' . $name_short . ', ' . $name_full . ', ' . $learning_program_type . ', ' . $category . ', ' . $days . ', ' . $drive_lessons . ', ' . $drive_lessons_length . ','.$drive_lessons_price.',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
