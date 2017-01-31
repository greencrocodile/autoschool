<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');
if (isset($_REQUEST['salary_month'])) {
    $salary_month = $_REQUEST['salary_month'];
} else {
    $salary_month = '';
}

if ($salary_month == '') {
    echo 'Не задан месяц.';
    exit;
} else {
    $salary_month = intval($salary_month);
}

if (isset($_REQUEST['salary_year'])) {
    $salary_year = $_REQUEST['salary_year'];
} else {
    $salary_year = '';
}

if ($salary_year == '') {
    echo 'Не задан год.';
    exit;
} else {
    $salary_year = intval($salary_year);
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

$query = 'CALL sp_SalaryCalculate(' . $salary_month . ',' . $salary_year . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

echo 'ok';
