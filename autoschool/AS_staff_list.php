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
    $sort = 'full_name';
}

if (isset($_REQUEST['dir'])) {
    $dir = $_REQUEST['dir'];
} else {
    $dir = 'ASC';
}
if (($dir != 'ASC') && ($dir != 'DESC')) {
    $dir = 'ASC';
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



if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '0';
}

$start_id = intval($start_id);

if (isset($_REQUEST['active_only'])) {
    $active_only = $_REQUEST['active_only'];
} else {
    $active_only = '0';
}

$active_only = intval($active_only);

if (isset($_REQUEST['discipline_id'])) {
    $discipline_id = $_REQUEST['discipline_id'];
} else {
    $discipline_id = '-1';
}

$discipline_id = intval($discipline_id);

if (isset($_REQUEST['learning_group_id'])) {
    $learning_group_id = $_REQUEST['learning_group_id'];
} else {
    $learning_group_id = '-1';
}

$learning_group_id = intval($learning_group_id);

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = -1;
}

$id = intval($id);


//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,firstname,middlename,lastname,full_name,initials_name,post_name,birthdate,birthdate_text,birthplace,gender_id,gender_name,addr_index,addr_region,addr_region_name,addr_district,addr_district_name,addr_city,addr_street,addr_house,addr_build,addr_flat,education_id,education_name,comment,inn,snils,phone_work,phone_home,active 
FROM v_staff where id = id '; //.$start_id;
if ($id != -1){
	$query .= ' and id = '.$id;
} else {

	if ($active_only == 1) {
		$query.=' and active = 1 ';
	} else {
		$query.=' and active in(0,1)';
	}

	if ($discipline_id != -1) {
		$query.=' and id in (select staff_id from v_staff_disciplines where learning_discipline_id =' . $discipline_id . ')';
	}
	if ($learning_group_id != -1){
		$query .= ' and ((id in (select staff_id from learning_group_vehicles where learning_group_id = '.$learning_group_id.')) or (id in (select staff_id from learning_group_staff where learning_group_id = '.$learning_group_id.')))';
	}
}
$query.=' order by active desc, ' . $sort . ' ' . $dir . ' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'firstname\': \'' . escape4js($arr['firstname']) . '\',
\'middlename\': \'' . escape4js($arr['middlename']) . '\',
\'lastname\': \'' . escape4js($arr['lastname']) . '\',
\'full_name\': \'' . escape4js($arr['full_name']) . '\',
\'initials_name\': \'' . escape4js($arr['initials_name']) . '\',
\'post_name\': \'' . escape4js($arr['post_name']) . '\',
\'birthdate\': ' . (($arr['birthdate_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['birthdate_text']) . '\')') . ',
\'birthplace\': \'' . escape4js($arr['birthplace']) . '\',
\'gender_id\':' . intval($arr['gender_id']) . ',
\'gender_name\': \'' . escape4js($arr['gender_name']) . '\',
\'addr_index\': \'' . escape4js($arr['addr_index']) . '\',
\'addr_region\':' . intval($arr['addr_region']) . ',
\'addr_region_name\': \'' . escape4js($arr['addr_region_name']) . '\',
\'addr_district\':' . intval($arr['addr_district']) . ',
\'addr_district_name\': \'' . escape4js($arr['addr_district_name']) . '\',
\'addr_city\': \'' . escape4js($arr['addr_city']) . '\',
\'addr_street\': \'' . escape4js($arr['addr_street']) . '\',
\'addr_house\': \'' . escape4js($arr['addr_house']) . '\',
\'addr_build\': \'' . escape4js($arr['addr_build']) . '\',
\'addr_flat\': \'' . escape4js($arr['addr_flat']) . '\',
\'education_id\':' . intval($arr['education_id']) . ',
\'education_name\': \'' . escape4js($arr['education_name']) . '\',
\'comment\': \'' . escape4js($arr['comment']) . '\',
\'inn\': \'' . escape4js($arr['inn']) . '\',
\'snils\': \'' . escape4js($arr['snils']) . '\',
\'phone_work\': \'' . escape4js($arr['phone_work']) . '\',
\'phone_home\': \'' . escape4js($arr['phone_home']) . '\',
\'active\':' . intval($arr['active']) . '
}';
}
$result->free_result();

if ($start_id == -1) {
    $d=',{
\'id\':-1,
\'firstname\': \'-----\',
\'middlename\': \'-----\',
\'lastname\': \'-----\',
\'full_name\': \'-----\',
\'initials_name\': \'-----\',
\'post_name\': \' \',
\'birthdate\': null,
\'birthplace\': \'\',
\'gender_id\':-1,
\'gender_name\': \'\',
\'addr_index\': \'\',
\'addr_region\': -1,
\'addr_region_name\': \'\',
\'addr_district\': -1,
\'addr_district_name\': \'\',
\'addr_city\': \'\',
\'addr_street\': \'\',
\'addr_house\': \'\',
\'addr_build\': \'\',
\'addr_flat\': \'\',
\'education_id\':-1,
\'education_name\': \'\',
\'comment\': \'\',
\'inn\': \'\',
\'snils\': \'\',
\'phone_work\': \'\',
\'phone_home\': \'\',
\'active\':1
}'.$d;
}
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_staff where id >= 0'; //.$start_id;
if ($id != -1){
	$query .= ' and id = '.$id;
} else {

	if ($active_only == 1) {
		$query.=' and active = 1 ';
	} else {
		$query.=' and active in(0,1)';
	}

	if ($discipline_id != -1) {
		$query.=' and id in (select staff_id from v_staff_disciplines where learning_discipline_id =' . $discipline_id . ')';
	}

	if ($learning_group_id != -1){
		$query .= ' and ((id in (select staff_id from learning_group_vehicles where learning_group_id = '.$learning_group_id.')) or (id in (select staff_id from learning_group_staff where learning_group_id = '.$learning_group_id.')))';
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
