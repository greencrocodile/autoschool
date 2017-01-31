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

if ($school_unit_id == -1){
	$query = 'select payment_date,DATE_FORMAT(payment_date, \'%b, %d %Y\') AS payment_date_text,in_value,out_value from v_dds_total t where 1=1';
	if($payment_date_from != -1){
		$query .= ' and t.payment_date >= '.$payment_date_from;
	}

	if ($payment_date_till != -1){
		$query .= ' and t.payment_date <= '.$payment_date_till;
	}
	
	$query_total = 'select count(*) as Total from  v_dds_total t where 1=1';
	if($payment_date_from != -1){
		$query_total .= ' and t.payment_date >= '.$payment_date_from;
	}

	if ($payment_date_till != -1){
		$query_total .= ' and t.payment_date <= '.$payment_date_till;
	}
} else {

	$query = 'select payment_date,DATE_FORMAT(payment_date, \'%b, %d %Y\') AS payment_date_text,in_value,out_value,school_unit_id from v_dds_su_total t where t.school_unit_id = '.$school_unit_id;
	if ($payment_date_from != -1){
		$query .= ' and t.payment_date >= '.$payment_date_from;
	}

	if ($payment_date_till != -1){
		$query .= ' and t.payment_date <= '.$payment_date_till;
	}
	
	$query_total = 'select count(*) as Total from v_dds_su_total t where t.school_unit_id = '.$school_unit_id;
	if ($payment_date_from != -1){
		$query .= ' and t.payment_date >= '.$payment_date_from;
	}

	if ($payment_date_till != -1){
		$query .= ' and t.payment_date <= '.$payment_date_till;
	}
}

$query .= ' order by t.payment_date desc limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'payment_date\': ' . (($arr['payment_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['payment_date_text']) . '\')') . ',
\'in_value\':' . floatval($arr['in_value']) . ',
\'out_value\':' . floatval($arr['out_value']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$result = $AS_db->query($query_total) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query_total . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
