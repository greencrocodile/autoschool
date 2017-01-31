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

if (isset($_REQUEST['name'])) {
    $name = trim($_REQUEST['name']);
} else {
    $name = '';
}
if ($name == '') {
    echo 'Не задано наименование.';
    exit;
} else {
    $name = '\'' . $name . '\'';
}

if (isset($_REQUEST['mark_id'])) {
    $mark_id = $_REQUEST['mark_id'];
} else {
    $mark_id = '';
}
if ($mark_id == '') {
    echo 'Не задана марка.';
    exit;
} else {
    $mark_id = intval($mark_id);
}

if ($mark_id == -1) {
    echo 'Не задана марка.';
    exit;
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

$query = 'CALL sp_VModelEdit(@p_id,' . $mark_id . ', ' . $name . ', ' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
