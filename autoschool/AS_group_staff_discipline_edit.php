<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

if (isset($_REQUEST['id'])) {
    $id = trim($_REQUEST['id']);
} else {
    $id = '';
}
if ($id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
    $id = intval($id);
}

if (isset($_REQUEST['group_id'])) {
    $group_id = trim($_REQUEST['group_id']);
} else {
    $group_id = '';
}
if ($group_id == '') {
    echo 'Не задан идентификатор группы.';
    exit;
} else {
    $group_id = intval($group_id);
}


if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '-1';
}
if ($staff_id == '-1') {
    $staff_id = 'null';
} else {
    $staff_id = intval($staff_id);
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
$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'CALL sp_LearningGroupStaffDisciplineEdit(@p_id,' . $group_id . ',' . $staff_id . ',' . $discipline_id . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
