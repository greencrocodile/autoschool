<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

if (isset($_REQUEST['old_id'])) {
    $old_id = trim($_REQUEST['old_id']);
} else {
    $old_id = '';
}
if ($old_id == '') {
    echo 'Не задан идентификатор источника.';
    exit;
} else {
    $old_id = intval($old_id);
}

if (isset($_REQUEST['new_id'])) {
    $new_id = trim($_REQUEST['new_id']);
} else {
    $new_id = '';
}
if ($new_id == '') {
    echo 'Не задан идентификатор назначения.';
    exit;
} else {
    $new_id = intval($new_id);
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

$query = 'call sp_CopyStudentData(' . $old_id . ',' . $new_id . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);


echo 'ok';
