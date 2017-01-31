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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '';
}

if ($staff_id == '') {
    echo 'Не задан идентификатор преподавателя.';
    exit;
} else {
    $staff_id = intval($staff_id);
}

if (isset($_REQUEST['learning_discipline_id'])) {
    $learning_discipline_id = $_REQUEST['learning_discipline_id'];
} else {
    $learning_discipline_id = -1;
}
if ($learning_discipline_id == -1) {
    $learning_discipline_id = 'null';
} else {
    $learning_discipline_id = intval($learning_discipline_id);
}

if (isset($_REQUEST['date_start'])) {
    $date_start = trim($_REQUEST['date_start']);
} else {
    $date_start = '';
}
if ($date_start == '') {
    $date_start = 'null';
}

if ($date_start != 'null') {
    $date_start = '\'' . $date_start . '\'';
}

if (isset($_REQUEST['date_certification'])) {
    $date_certification = trim($_REQUEST['date_certification']);
} else {
    $date_certification = '';
}
if ($date_certification == '') {
    $date_certification = 'null';
}

if ($date_certification != 'null') {
    $date_certification = '\'' . $date_certification . '\'';
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
$query = 'CALL sp_StaffDisciplineEdit(@p_id ,' . $staff_id . ', ' . $learning_discipline_id . ',' . $date_start . ',' . $date_certification . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
