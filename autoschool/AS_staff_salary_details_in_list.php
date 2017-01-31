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
    $salary_month = '-1';
}

$salary_month = intval($salary_month);

if (isset($_REQUEST['salary_year'])) {
    $salary_year = intval($_REQUEST['salary_year']);
} else {
    $salary_year = '-1';
}

$salary_year = intval($salary_year);

if (isset($_REQUEST['staff_id'])) {
    $staff_id = intval($_REQUEST['staff_id']);
} else {
    $staff_id = '-1';
}

$staff_id = intval($staff_id);

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
    $id = '-1';
}

$id = intval($id);

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,staff_id,salary_month,salary_year,learning_program_id,learning_program_name_short,article_id,article_name,amount,coefficient,value,total FROM v_staff_salary_details_in';
if($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where salary_month = ' . $salary_month . ' and salary_year = ' . $salary_year . ' and staff_id = '.$staff_id.' order by id limit '.$limit.' offset '.$offset;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'salary_month\':' . intval($arr['salary_month']) . ',
\'salary_year\':' . intval($arr['salary_year']) . ',
\'learning_program_id\':' . intval($arr['learning_program_id']) . ',
\'learning_program_name_short\': \'' . escape4js($arr['learning_program_name_short']) . '\',
\'article_id\':' . intval($arr['article_id']) . ',
\'article_name\': \'' . escape4js($arr['article_name']) . '\',
\'amount\':' . intval($arr['amount']) . ',
\'coefficient\':' . intval($arr['coefficient']) . ',
\'value\':' . intval($arr['value']) . ',
\'total\':' . intval($arr['total']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_staff_salary_details_in';
if($id != -1){
	$query .= ' where id = '.$id;
} else {
	$query .= ' where salary_month = ' . $salary_month . ' and salary_year = ' . $salary_year . ' and staff_id = '.$staff_id.' order by id limit '.$limit.' offset '.$offset;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
