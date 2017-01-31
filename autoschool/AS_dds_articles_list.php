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
    $school_unit_id = -1;
} else {
    $school_unit_id = intval($school_unit_id);
}

if (isset($_REQUEST['payment_date_from'])) {
    $payment_date_from = $_REQUEST['payment_date_from'];
} else {
    $payment_date_from = '';
}

if ($payment_date_from == '') {
    $payment_date_from = -1;
} else {
    $payment_date_from = '\''.$payment_date_from.'\'';
}

if (isset($_REQUEST['payment_date_till'])) {
    $payment_date_till = $_REQUEST['payment_date_till'];
} else {
    $payment_date_till = '';
}

if ($payment_date_till == '') {
    $payment_date_till = -1;
} else {
    $payment_date_till = '\''.$payment_date_till.'\'';
}

if (isset($_REQUEST['article_id'])) {
    $article_id = $_REQUEST['article_id'];
} else {
    $article_id = '';
}

if ($article_id == '') {
    $article_id = -1;
} else {
    $article_id = intval($article_id);
}

if (isset($_REQUEST['comment'])) {
    $comment = $_REQUEST['comment'];
} else {
    $comment = '';
}

$comment = '\'%'.$comment.'%\'';

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

$query = 'SELECT id,payment_date,payment_date_text,article_name,comment,in_value,out_value,act_date,act_date_text,act_name,school_unit_id,school_unit_name_short FROM v_dds where 1=1';
if($payment_date_from != -1){
	$query .= ' and payment_date >= '.$payment_date_from;
}

if ($payment_date_till != -1){
	$query .= ' and payment_date <= '.$payment_date_till;
}

if ($school_unit_id != -1){
	$query .= ' and school_unit_id = '.$school_unit_id;
}

if ($article_id != -1){
	$query .= ' and article_id = '.$article_id;
}

if ($comment != ''){
	$query .= ' and comment like '.$comment;
}
	
$query .= ' order by payment_date desc limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{		
\'id\':'.intval($arr['id']).',
\'payment_date\': ' . (($arr['payment_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['payment_date_text']) . '\')') . ',
\'article_name\': \'' . escape4js($arr['article_name']) . '\',
\'comment\': \'' . escape4js($arr['comment']) . '\',
\'in_value\':'.floatval($arr['in_value']).',
\'out_value\':'.floatval($arr['out_value']).',
\'act_date\': ' . (($arr['act_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['act_date_text']) . '\')') . ',
\'act_name\': \'' . escape4js($arr['act_name']) . '\',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\'
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) as Total FROM v_dds where 1=1';
if($payment_date_from != -1){
	$query .= ' and payment_date >= '.$payment_date_from;
}

if ($payment_date_till != -1){
	$query .= ' and payment_date <= '.$payment_date_till;
}

if ($school_unit_id != -1){
	$query .= ' and school_unit_id = '.$school_unit_id;
}

if ($article_id != -1){
	$query .= ' and article_id = '.$article_id;
}

if ($comment != ''){
	$query .= ' and comment like '.$comment;
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query_total . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
