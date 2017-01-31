<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['page'])) {
    $page = intval($_REQUEST['page']);
}

if (isset($_REQUEST['start'])) {
    $start = intval($_REQUEST['start']);
}

if (isset($_REQUEST['limit'])) {
    $limit = intval($_REQUEST['limit']);
}

if (isset($_REQUEST['salary_month'])) {
    $salary_month = intval($_REQUEST['salary_month']);
} else {
    $salary_month = '';
}

if ($salary_month == '') {
    echo 'не задан месяц зп';
    exit;
} else {
    $salary_month = intval($salary_month);
}

if (isset($_REQUEST['salary_year'])) {
    $salary_year = intval($_REQUEST['salary_year']);
} else {
    $salary_year = '';
}

if ($salary_year == '') {
    echo 'не задан год зп';
    exit;
} else {
    $salary_year = intval($salary_year);
}

if (isset($_REQUEST['staff_id'])) {
    $staff_id = intval($_REQUEST['staff_id']);
} else {
    $staff_id = '-1';
}

$staff_id = intval($staff_id);


//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT staff_id,salary_month,salary_month_name,salary_year,post_name,staff_initials_name,salary,keeping,for_pay FROM v_staff_salary where salary_month = ' . $salary_month . ' and salary_year = ' . $salary_year;
if($staff_id != -1){
	$query .= ' and staff_id = '.$staff_id;
}
$query .= ' order by post_name, staff_initials_name limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'staff_id\':' . intval($arr['staff_id']) . ',
\'salary_month\':' . intval($arr['salary_month']) . ',
\'salary_month_name\': \'' . escape4js($arr['salary_month_name']) . '\',
\'salary_year\':' . intval($arr['salary_year']) . ',
\'post_name\': \'' . escape4js($arr['post_name']) . '\',
\'staff_initials_name\': \'' . escape4js($arr['staff_initials_name']) . '\',
\'salary\':' . floatval($arr['salary']) . ',
\'keeping\':' . floatval($arr['keeping']) . ',
\'for_pay\':' . floatval($arr['for_pay']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_staff_salary where salary_month = ' . $salary_month . ' and salary_year = ' . $salary_year;
if($staff_id != -1){
	$query .= ' and staff_id = '.$staff_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
