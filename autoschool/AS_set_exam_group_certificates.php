<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');

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

if (isset($_REQUEST['serial'])) {
    $serial = $_REQUEST['serial'];
} else {
    $serial = '';
}

if ($serial == '') {
    echo 'не задана серия сертификата';
    exit;
} else {
    $serial = '\'' . $serial . '\'';
}

if (isset($_REQUEST['number'])) {
    $number = $_REQUEST['number'];
} else {
    $number = '0';
}

if ($number == '0') {
    echo 'не задан номер сертификата';
    exit;
} else {
    $number = intval($number);
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

$query = 'call sp_SetExamGroupCertificates(' . $group_id . ',' . $serial . ',' . $number . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

echo 'ok';
