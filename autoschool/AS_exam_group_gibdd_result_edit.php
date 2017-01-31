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

if (isset($_REQUEST['student_id'])) {
    $student_id = $_REQUEST['student_id'];
} else {
    $student_id = '';
}

if ($student_id == '') {
    echo 'Не задан идентификатор студента.';
    exit;
} else {
    $student_id = intval($student_id);
}


if (isset($_REQUEST['theory_result'])) {
    $theory_result = $_REQUEST['theory_result'];
} else {
    $theory_result = '-1';
}

if ($theory_result == '-1') {
    $theory_result = 'null';
} else {
    $theory_result = intval($theory_result);
}

if (isset($_REQUEST['practice_result'])) {
    $practice_result = $_REQUEST['practice_result'];
} else {
    $practice_result = '-1';
}

if ($practice_result == '-1') {
    $practice_result = 'null';
} else {
    $practice_result = intval($practice_result);
}

if (isset($_REQUEST['city_result'])) {
    $city_result = $_REQUEST['city_result'];
} else {
    $city_result = '-1';
}

if ($city_result == '-1') {
    $city_result = 'null';
} else {
    $city_result = intval($city_result);
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
$query = 'call sp_ExamGibddGroupStudentEdit(@p_id, ' . $group_id . ',' . $student_id . ',' . $theory_result . ',' . $practice_result . ',' . $city_result . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
