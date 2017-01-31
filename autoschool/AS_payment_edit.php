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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = trim($_REQUEST['staff_id']);
} else {
    $staff_id = '-1';
}
if ($staff_id == '-1') {
    $staff_id = 'null';
} else {
    $staff_id = intval($staff_id);
}

if (isset($_REQUEST['school_unit_id'])) {
    $school_unit_id = trim($_REQUEST['school_unit_id']);
} else {
    $school_unit_id = '-1';
}
if ($school_unit_id == '-1') {
    $school_unit_id = 'null';
} else {
    $school_unit_id = intval($school_unit_id);
}

if (isset($_REQUEST['article_id'])) {
    $article_id = trim($_REQUEST['article_id']);
} else {
    $article_id = '';
}
if ($article_id == '') {
    $article_id = 'null';
} else {
    $article_id = intval($article_id);
}

if (isset($_REQUEST['payment_date'])) {
    $payment_date = trim($_REQUEST['payment_date']);
} else {
    $payment_date = '';
}
if ($payment_date == '') {
    echo 'Не задана дата операции.';
    exit;
} else {
    $payment_date = '\''.$payment_date.'\'';
}

if (isset($_REQUEST['value'])) {
    $value = $_REQUEST['value'];
} else {
    $value = '0';
}

$value = floatval($value);

if (isset($_REQUEST['comment'])) {
    $comment = $_REQUEST['comment'];
} else {
    $comment = '';
}
$comment = '\''.$comment.'\'';

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
$query = 'CALL sp_PaymentEdit(@p_id, null, ' . $staff_id . ', ' . $payment_date . ', ' . $school_unit_id . ', ' . $article_id . ', null, ' . $value . ', ' . $comment . ', ' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
