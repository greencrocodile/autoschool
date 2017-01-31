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

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);

if (isset($_REQUEST['firstname'])) {
    $firstname = $_REQUEST['firstname'];
} else {
    $firstname = '';
}


if (isset($_REQUEST['middlename'])) {
    $middlename = $_REQUEST['middlename'];
} else {
    $middlename = '';
}


if (isset($_REQUEST['lastname'])) {
    $lastname = $_REQUEST['lastname'];
} else {
    $lastname = '';
}



//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,firstname,middlename,lastname,birthdate,birthdate_text,birthplace,gender_id,addr_index,addr_region,addr_district,addr_city,addr_street,addr_house,addr_build,addr_flat,education_id,phone_home,phone_cell,phone_work,work_place,post_name,INN FROM v_students where id = id ';
if ($id != -1) {
    $query.=' and id = ' . $id;
} else {
    if ($firstname != '\'\'') {
        $query.=' and firstname like \'%' . $firstname . '%\'';
    }

    if ($middlename != '\'\'') {
        $query.=' and middlename like \'%' . $middlename . '%\'';
    }

    if ($lastname != '\'\'') {
        $query.=' and lastname like \'%' . $lastname . '%\'';
    }
}
$query.=' order by lastname,firstname,middlename';
$query.=' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'firstname\': \'' . escape4js($arr['firstname']) . '\',
\'middlename\': \'' . escape4js($arr['middlename']) . '\',
\'lastname\': \'' . escape4js($arr['lastname']) . '\',
\'birthdate\': ' . (($arr['birthdate_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['birthdate_text']) . '\')') . ',
\'birthplace\': \'' . escape4js($arr['birthplace']) . '\',
\'gender_id\':' . intval($arr['gender_id']) . ',
\'addr_index\': \'' . escape4js($arr['addr_index']) . '\',
\'addr_region\':' . intval($arr['addr_region']) . ',
\'addr_district\':' . intval($arr['addr_district']) . ',
\'addr_city\': \'' . escape4js($arr['addr_city']) . '\',
\'addr_street\': \'' . escape4js($arr['addr_street']) . '\',
\'addr_house\': \'' . escape4js($arr['addr_house']) . '\',
\'addr_build\': \'' . escape4js($arr['addr_build']) . '\',
\'addr_flat\': \'' . escape4js($arr['addr_flat']) . '\',
\'education_id\':' . intval($arr['education_id']) . ',
\'phone_home\': \'' . escape4js($arr['phone_home']) . '\',
\'phone_cell\': \'' . escape4js($arr['phone_cell']) . '\',
\'phone_work\': \'' . escape4js($arr['phone_work']) . '\',
\'work_place\': \'' . escape4js($arr['work_place']) . '\',
\'post_name\': \'' . escape4js($arr['post_name']) . '\',
\'inn\': \'' . escape4js($arr['inn']) . '\'
}';
}
$result->free_result();

if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_students where id = id ';
if ($id != -1) {
    $query.=' and id = ' . $id;
} else {
    if ($firstname != '\'\'') {
        $query.=' and firstname like \'%' . $firstname . '%\'';
    }

    if ($middlename != '\'\'') {
        $query.=' and middlename like \'%' . $middlename . '%\'';
    }

    if ($lastname != '\'\'') {
        $query.=' and lastname like \'%' . $lastname . '%\'';
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
