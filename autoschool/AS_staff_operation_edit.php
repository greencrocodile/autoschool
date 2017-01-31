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

if (isset($_REQUEST['operation_date'])) {
    $operation_date = $_REQUEST['operation_date'];
} else {
    $operation_date = '';
}

if ($operation_date == '') {
    $operation_date = 'null';
} else {
    $operation_date = '\''.$operation_date.'\'';
}

if (isset($_REQUEST['article_id_in'])) {
    $article_id_in = $_REQUEST['article_id_in'];
} else {
    $article_id_in = -1;
}

if ($article_id_in == -1) {
    $article_id_in = 'null';
} else {
    $article_id_in = intval($article_id_in);
}

if (isset($_REQUEST['article_id_out'])) {
    $article_id_out = $_REQUEST['article_id_out'];
} else {
    $article_id_out = -1;
}

if ($article_id_out == -1) {
    $article_id_out = 'null';
} else {
    $article_id_out = intval($article_id_out);
}

if (isset($_REQUEST['value'])) {
    $value = $_REQUEST['value'];
} else {
    $value = 0;
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
$query = 'CALL sp_StaffOperationEdit(@p_id, '.$staff_id.','.$operation_date.','.$article_id_in.','.$article_id_out.','.$value.','.$comment.','.$user_id.')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $operation_date . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
