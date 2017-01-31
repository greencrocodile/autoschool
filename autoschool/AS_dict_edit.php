<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

if (isset($_REQUEST['dict_name'])) {
    $dict_name = trim($_REQUEST['dict_name']);
} else {
    $dict_name = '';
}
if ($dict_name == '') {
    echo 'Не задан справочник.';
    exit;
}

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
    echo 'Не задано значение.';
    exit;
} else {
    $name = '\'' . $name . '\'';
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

if ($id == -1) {
    $query = 'insert into ' . $dict_name . ' (name,updated,updated_by) values (' . $name . ',now(),' . $user_id . ')';
} else {
    $query = 'update ' . $dict_name . ' set name = ' . $name . ', updated = now(), updated_by = ' . $user_id . ' where id = ' . $id;
}
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'select last_insert_id() as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
