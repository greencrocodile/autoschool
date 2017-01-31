<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['mode'])) {
    $mode = $_REQUEST['mode'];
} else {
    $mode = '';
}

if ($mode == '') {
    $mode = -1;
} else {
    $mode = intval($mode);
}

if (isset($_REQUEST['type'])) {
    $type = $_REQUEST['type'];
} else {
    $type = '-1';
}

if ($type == '-1') {
    $type = -1;
} else {
    $type = '\''.$type.'\'';
}

if (isset($_REQUEST['without_student_payments'])) {
    $without_student_payments = $_REQUEST['without_student_payments'];
} else {
    $without_student_payments = 0;
	}

$without_student_payments = intval($without_student_payments);

if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '0';
}

$start_id = intval($start_id);


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
$query = 'SELECT id,name,staff_name_as_comment FROM v_articles where 1=1';
if($type != -1){
	$query .= ' and article_type = '.$type;
}
if ($mode != -1){
	$query .= ' and mode = '.$mode;
}
if ($without_student_payments == 1){
	$query .= ' and id not in (select value from variables where name = \'student_payment_article_id\')';
}
$query .= ' order by name limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'name\': \'' . escape4js($arr['name']) . '\',
\'staff_name_as_comment\':' . intval($arr['staff_name_as_comment']) . '
}';
}
if ($start_id == -1) {
    $d =',{
\'id\':-1,
\'name\':\'-----\',
\'staff_name_as_comment\':0
}'.$d;
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_articles where 1=1';
if($type != -1){
	$query .= ' and article_type = '.$type;
}
if ($mode != -1){
	$query .= ' and mode = '.$mode;
}
if ($without_student_payments == 1){
	$query .= ' and id not in (select value from variables where name = \'student_payment_article_id\')';
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
