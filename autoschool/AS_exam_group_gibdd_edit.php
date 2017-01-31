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

if (isset($_REQUEST['group_type'])) {
    $group_type = $_REQUEST['group_type'];
} else {
    $group_type = '';
}

$group_type = '\'' . $group_type . '\'';

if (isset($_REQUEST['number'])) {
    $number = $_REQUEST['number'];
} else {
    $number = '';
}

$number = '\'' . $number . '\'';

if (isset($_REQUEST['learning_group_id'])) {
    $learning_group_id = $_REQUEST['learning_group_id'];
} else {
    $learning_group_id = '-1';
}

if ($learning_group_id == '-1') {
    $learning_group_id = 'null';
} else {
    $learning_group_id = intval($learning_group_id);
}

if (isset($_REQUEST['exam_date'])) {
    $exam_date = $_REQUEST['exam_date'];
} else {
    $exam_date = '';
}

if ($exam_date == '') {
    $exam_date = 'null';
} else {
    $exam_date = '\'' . $exam_date . '\'';
}


if (isset($_REQUEST['protocol_number'])) {
    $protocol_number = $_REQUEST['protocol_number'];
} else {
    $protocol_number = '';
}

$protocol_number = '\'' . $protocol_number . '\'';

if (isset($_REQUEST['protocol_date'])) {
    $protocol_date = $_REQUEST['protocol_date'];
} else {
    $protocol_date = '';
}

if ($protocol_date == '') {
    $protocol_date = 'null';
} else {
    $protocol_date = '\'' . $protocol_date . '\'';
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

if (isset($_REQUEST['regist_date'])) {
    $regist_date = $_REQUEST['regist_date'];
} else {
    $regist_date = '';
}
if ($regist_date == '') {
    $regist_date = 'null';
} else {
    $regist_date = '\'' . $regist_date . '\'';
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
$query = 'CALL sp_ExamGroupEdit(@p_id, '.$group_type.', '.$learning_group_id.', '.$number.', '.$exam_date.', '.$regist_date.', '.$staff_id.', '.$protocol_number.', '.$protocol_date.', '.$user_id.')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
