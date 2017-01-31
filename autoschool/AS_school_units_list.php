<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['sort'])) {
    $sort = $_REQUEST['sort'];
} else {
    $sort = '';
}

$sorters = array(
    'name_full' => 'name_full'
);


if (!isset($sorters[$sort])) {
    $sort = 'name_full';
}

$sort = $sorters[$sort];

if (isset($_REQUEST['page'])) {
    $page = intval($_REQUEST['page']);
}

if (isset($_REQUEST['start'])) {
    $start = intval($_REQUEST['start']);
}

if (isset($_REQUEST['limit'])) {
    $limit = intval($_REQUEST['limit']);
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
}

if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '';
}

if ($start_id == '') {
    $start_id = '0';
} else {
    $start_id = intval($start_id);
}

if (isset($_REQUEST['active_only'])) {
    $active_only = $_REQUEST['active_only'];
} else {
    $active_only = '0';
}

$active_only = intval($active_only);

if (isset($_REQUEST['whole_as'])) {
    $whole_as = $_REQUEST['whole_as'];
} else {
    $whole_as = '0';
}

$whole_as = intval($whole_as);

if (isset($_REQUEST['id'])) {
    $id = intval($_REQUEST['id']);
} else {
    $id = -1;
}

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,name_short,name_full,addr_index,addr_region,addr_district,addr_city,addr_street,addr_house,addr_build,addr_flat,INN,rs,bank_name,ks,BIK,license_serial,license_number,license_giver,license_date_start,license_date_start_text,license_date_end,license_date_end_text,reg_number,reg_date,reg_date_text,GIBDD_license_number,GIBDD_license_date_start,GIBDD_license_date_start_text,GIBDD_license_date_end,GIBDD_license_date_end_text,rent_contract_number,rent_contract_date_start,rent_contract_date_start_text,rent_contract_date_end,rent_contract_date_end_text,ground_rent_contract_number,ground_rent_contract_date_start,ground_rent_contract_date_start_text,ground_rent_contract_date_end,ground_rent_contract_date_end_text,head_id,head_name,is_main,active FROM v_school_units where id >= 0 ';
if($active_only == 1){
	$query .= ' and active = 1 ';
}

if($id != -1){
	$query .= ' and id = '.$id;
}

$query .= ' order by ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'name_short\': \'' . escape4js($arr['name_short']) . '\',
\'name_full\': \'' . escape4js($arr['name_full']) . '\',
\'addr_index\': \'' . escape4js($arr['addr_index']) . '\',
\'addr_region\': \'' . escape4js($arr['addr_region']) . '\',
\'addr_district\': \'' . escape4js($arr['addr_district']) . '\',
\'addr_city\': \'' . escape4js($arr['addr_city']) . '\',
\'addr_street\': \'' . escape4js($arr['addr_street']) . '\',
\'addr_house\': \'' . escape4js($arr['addr_house']) . '\',
\'addr_build\': \'' . escape4js($arr['addr_build']) . '\',
\'addr_flat\': \'' . escape4js($arr['addr_flat']) . '\',
\'inn\': \'' . escape4js($arr['INN']) . '\',
\'rs\': \'' . escape4js($arr['rs']) . '\',
\'bank_name\': \'' . escape4js($arr['bank_name']) . '\',
\'ks\': \'' . escape4js($arr['ks']) . '\',
\'bik\': \'' . escape4js($arr['BIK']) . '\',
\'license_serial\': \'' . escape4js($arr['license_serial']) . '\',
\'license_number\': \'' . escape4js($arr['license_number']) . '\',
\'license_giver\': \'' . escape4js($arr['license_giver']) . '\',
\'license_date_start\': ' . (($arr['license_date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['license_date_start_text']) . '\')') . ',
\'license_date_end\': ' . (($arr['license_date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['license_date_end_text']) . '\')') . ',
\'reg_number\': \'' . escape4js($arr['reg_number']) . '\',
\'reg_date\': ' . (($arr['reg_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['reg_date_text']) . '\')') . ',
\'gibdd_license_number\': \'' . escape4js($arr['GIBDD_license_number']) . '\',
\'gibdd_license_date_start\': ' . (($arr['GIBDD_license_date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['GIBDD_license_date_start_text']) . '\')') . ',
\'gibdd_license_date_end\': ' . (($arr['GIBDD_license_date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['GIBDD_license_date_end_text']) . '\')') . ',
\'rent_contract_number\': \'' . escape4js($arr['rent_contract_number']) . '\',
\'rent_contract_date_start\': ' . (($arr['rent_contract_date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['rent_contract_date_start_text']) . '\')') . ',
\'rent_contract_date_end\': ' . (($arr['rent_contract_date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['rent_contract_date_end_text']) . '\')') . ',
\'ground_rent_contract_number\': \'' . escape4js($arr['ground_rent_contract_number']) . '\',
\'ground_rent_contract_date_start\': ' . (($arr['ground_rent_contract_date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['ground_rent_contract_date_start_text']) . '\')') . ',
\'ground_rent_contract_date_end\': ' . (($arr['ground_rent_contract_date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['ground_rent_contract_date_end_text']) . '\')') . ',
\'head_id\':' . intval($arr['head_id']) . ',
\'head_name\': \'' . escape4js($arr['head_name']) . '\',
\'is_main\':' . intval($arr['is_main']) . ',
\'is_main_text\': \'' . (($arr['is_main'] == 1) ? 'гл. подразделение' : 'филиал') . '\',
\'active\':' . intval($arr['active']) . '
}';
}

if ($start_id == -1) {
	if ($whole_as == 1){
 $d =',{
\'id\':-1,
\'name_short\':\'Автошкола\',
\'name_full\': \'Автошкола\',
\'addr_index\': \'\',
\'addr_region\': \'\',
\'addr_district\':\'\',
\'addr_city\': \'\',
\'addr_street\':\'\',
\'addr_house\':\'\',
\'addr_build\':\'\',
\'addr_flat\':\'\',
\'inn\': \'\',
\'rs\':\'\',
\'bank_name\':\'\',
\'ks\': \'\',
\'bik\':\'\',
\'license_serial\':\'\',
\'license_number\':\'\',
\'license_giver\':\'\',
\'license_date_start\':null,
\'license_date_end\':null,
\'reg_number\':\'\',
\'reg_date\':\'\',
\'gibdd_license_number\':\'\',
\'gibdd_license_date_start\':null,
\'gibdd_license_date_end\':null,
\'rent_contract_number\':\'\',
\'rent_contract_date_start\':null,
\'rent_contract_date_end\':null,
\'ground_rent_contract_number\':\'\',
\'ground_rent_contract_date_start\':null,
\'ground_rent_contract_date_end\':null,
\'head_id\':null,
\'head_name\':\'\',
\'is_main\':0,
\'is_main_text\':\'\',
\'active\':1
}'.$d;		
	} else {
 $d =',{
\'id\':-1,
\'name_short\':\'-----\',
\'name_full\': \'-----\',
\'addr_index\': \'\',
\'addr_region\': \'\',
\'addr_district\':\'\',
\'addr_city\': \'\',
\'addr_street\':\'\',
\'addr_house\':\'\',
\'addr_build\':\'\',
\'addr_flat\':\'\',
\'inn\': \'\',
\'rs\':\'\',
\'bank_name\':\'\',
\'ks\': \'\',
\'bik\':\'\',
\'license_serial\':\'\',
\'license_number\':\'\',
\'license_giver\':\'\',
\'license_date_start\':null,
\'license_date_end\':null,
\'reg_number\':\'\',
\'reg_date\':\'\',
\'gibdd_license_number\':\'\',
\'gibdd_license_date_start\':null,
\'gibdd_license_date_end\':null,
\'rent_contract_number\':\'\',
\'rent_contract_date_start\':null,
\'rent_contract_date_end\':null,
\'ground_rent_contract_number\':\'\',
\'ground_rent_contract_date_start\':null,
\'ground_rent_contract_date_end\':null,
\'head_id\':null,
\'head_name\':\'\',
\'is_main\':0,
\'is_main_text\':\'\',
\'active\':1
}'.$d;		
	}
   
}

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_school_units where id >= 0';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
