<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['school_unit_id'])) {
    $school_unit_id = $_REQUEST['school_unit_id'];
} else {
    $school_unit_id = '';
}

if ($school_unit_id == '') {
	echo 'не задано подразделение школы';
    exit;
} else {
    $school_unit_id = intval($school_unit_id);
}

if (isset($_REQUEST['payment_date'])) {
    $payment_date = $_REQUEST['payment_date'];
} else {
    $payment_date = '';
}

if ($payment_date == '') {
    $payment_date = -1;
} else {
    $payment_date = '\''.$payment_date.'\'';
}

if (isset($_REQUEST['article_type'])) {
    $article_type = $_REQUEST['article_type'];
} else {
    $article_type = '';
}

$article_type = '\''.$article_type.'\'';



if (isset($_REQUEST['page'])) {
    $page = intval($_REQUEST['page']);
}

if (isset($_REQUEST['start'])) {
    $start = intval($_REQUEST['start']);
}

if (isset($_REQUEST['limit'])) {
    $limit = intval($_REQUEST['limit']);
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,staff_id,payment_date,payment_date_text,school_unit_id,school_unit_name_short,article_id,article_type,article_name,value,comment FROM v_payments where payment_date = ' . $payment_date . ' and article_type = '.$article_type;
if ($school_unit_id != -1){
	$query .= ' and school_unit_id = '.$school_unit_id;
}
$query .= ' order by payment_date limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'payment_date\': ' . (($arr['payment_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['payment_date_text']) . '\')') . ',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'article_id\':' . intval($arr['article_id']) . ',
\'article_type\':' . intval($arr['article_type']) . ',
\'article_name\': \'' . escape4js($arr['article_name']) . '\',
\'value\':' . floatval($arr['value']) . ',
\'comment\': \'' . escape4js($arr['comment']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_payments where payment_date = ' . $payment_date . ' and article_type = '.$article_type;
if ($school_unit_id != -1){
	$query .= ' and school_unit_id = '.$school_unit_id;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
