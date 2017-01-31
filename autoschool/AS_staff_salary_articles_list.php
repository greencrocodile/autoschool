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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '-1';
}

if ($staff_id == '') {
    echo 'на задан код сотрудника';
    exit;
} else {
    $staff_id = intval($staff_id);
}

if (isset($_REQUEST['in_article'])) {
    $in_article = $_REQUEST['in_article'];
} else {
    $in_article = '0';
}

$in_article = intval($in_article);

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,staff_id,article_id_in,article_name_in,article_id_out,article_name_out,coefficient,value,amount FROM v_staff_salary_articles ';
if ($staff_id != -1){
	$query .=  'where staff_id = ' . $staff_id;
	if ($in_article == 1) {
		$query .= ' and article_id_out = -1 order by article_name_in asc';
	} else {
		$query .= ' and article_id_in = -1 order by article_name_out asc';
	}
}
$query .= ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'staff_id\':' . intval($arr['staff_id']) . ',
	\'article_id_in\':' . intval($arr['article_id_in']) . ',
	\'article_name_in\': \'' . escape4js($arr['article_name_in']) . '\',
	\'article_id_out\':' . intval($arr['article_id_out']) . ',
	\'article_name_out\': \'' . escape4js($arr['article_name_out']) . '\',
	\'value\':' . floatval($arr['value']) . ',
	\'amount\':' . intval($arr['amount']) . ',
	\'coefficient\':' . floatval($arr['coefficient']) . '
}';
}
$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_staff_salary_articles ';
if ($staff_id != -1){
	$query .=  'where staff_id = ' . $staff_id;
	if ($in_article == 1) {
		$query .= ' and article_id_out = -1';
	} else {
		$query .= ' and article_id_in = -1';
	}
}
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
