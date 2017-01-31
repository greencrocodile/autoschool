<?php

require('config.php');
header('Content-type: text/html; charset=utf-8');
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '';
}
if ($id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
    $id = intval($id);
}

if (isset($_REQUEST['gender_id'])) {
    $gender_id = $_REQUEST['gender_id'];
} else {
    $gender_id = '1';
}

$gender_id = '\''.$gender_id.'\'';

if (isset($_REQUEST['post'])) {
    $post = $_REQUEST['post'];
} else {
    $post = '';
}

$post = '\''.$post.'\'';

if (isset($_REQUEST['education_id'])) {
    $education_id = $_REQUEST['education_id'];
} else {
    $education_id = '-1';
}
if ($education_id == '-1') {
    $education_id = 'null';
} else {
    $education_id = intval($education_id);
}

if (isset($_REQUEST['firstname'])) {
    $firstname = trim($_REQUEST['firstname']);
} else {
    $firstname = '';
}

$firstname = '\'' . $firstname . '\'';

if (isset($_REQUEST['middlename'])) {
    $middlename = trim($_REQUEST['middlename']);
} else {
    $middlename = '';
}

$middlename = '\'' . $middlename . '\'';

if (isset($_REQUEST['lastname'])) {
    $lastname = trim($_REQUEST['lastname']);
} else {
    $lastname = '';
}

$lastname = '\'' . $lastname . '\'';

if (isset($_REQUEST['birthplace'])) {
    $birthplace = trim($_REQUEST['birthplace']);
} else {
    $birthplace = '';
}

$birthplace = '\'' . $birthplace . '\'';

if (isset($_REQUEST['addr_index'])) {
    $addr_index = trim($_REQUEST['addr_index']);
} else {
    $addr_index = '';
}

$addr_index = '\'' . $addr_index . '\'';

if (isset($_REQUEST['addr_region'])) {
    $addr_region = trim($_REQUEST['addr_region']);
} else {
    $addr_region = -1;
}

if($addr_region == -1){
	$addr_region = 'null';
} else{
	$addr_region = intval($addr_region);	
}


if (isset($_REQUEST['addr_district'])) {
    $addr_district = trim($_REQUEST['addr_district']);
} else {
    $addr_district = -1;
}

if($addr_district == -1){
	$addr_district = 'null';
} else{
	$addr_district = intval($addr_district);	
}

if (isset($_REQUEST['addr_city'])) {
    $addr_city = trim($_REQUEST['addr_city']);
} else {
    $addr_city = '';
}

$addr_city = '\'' . $addr_city . '\'';

if (isset($_REQUEST['addr_street'])) {
    $addr_street = trim($_REQUEST['addr_street']);
} else {
    $addr_street = '';
}

$addr_street = '\'' . $addr_street . '\'';

if (isset($_REQUEST['addr_house'])) {
    $addr_house = trim($_REQUEST['addr_house']);
} else {
    $addr_house = '';
}

$addr_house = '\'' . $addr_house . '\'';

if (isset($_REQUEST['addr_build'])) {
    $addr_build = trim($_REQUEST['addr_build']);
} else {
    $addr_build = '';
}

$addr_build = '\'' . $addr_build . '\'';

if (isset($_REQUEST['addr_flat'])) {
    $addr_flat = trim($_REQUEST['addr_flat']);
} else {
    $addr_flat = '';
}

$addr_flat = '\'' . $addr_flat . '\'';

if (isset($_REQUEST['comment'])) {
    $comment = trim($_REQUEST['comment']);
} else {
    $comment = '';
}

$comment = '\'' . $comment . '\'';

if (isset($_REQUEST['birthdate'])) {
    $birthdate = trim($_REQUEST['birthdate']);
} else {
    $birthdate = '';
}
if ($birthdate == '') {
    $birthdate = 'null';
} else {
    $birthdate = '\'' . $birthdate . '\'';
}

if (isset($_REQUEST['user_id'])) {
    $user_id = $_REQUEST['user_id'];
} else {
    $user_id = '';
}
if ($user_id == '') {
    $user_id = 'null';
} else {
    $user_id = intval($user_id);
}

if (isset($_REQUEST['inn'])) {
    $inn = trim($_REQUEST['inn']);
} else {
    $inn = '';
}

$inn = '\'' . $inn . '\'';

if (isset($_REQUEST['snils'])) {
    $snils = trim($_REQUEST['snils']);
} else {
    $snils = '';
}

$snils = '\'' . $snils . '\'';

if (isset($_REQUEST['phone_work'])) {
    $phone_work = trim($_REQUEST['phone_work']);
} else {
    $phone_work = '';
}

$phone_work = '\'' . $phone_work . '\'';

if (isset($_REQUEST['phone_home'])) {
    $phone_home = trim($_REQUEST['phone_home']);
} else {
    $phone_home = '';
}

$phone_home = '\'' . $phone_home . '\'';

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'CALL sp_StaffEdit(@p_id, ' . $firstname . ', ' . $middlename . ', ' . $lastname . ', ' . $post . ', ' . $birthdate . ', ' . $birthplace . ', ' . $gender_id . ', ' . $addr_index . ', ' . $addr_region . ', ' . $addr_district . ', ' . $addr_city . ', ' . $addr_street . ', ' . $addr_house . ', ' . $addr_build . ', ' . $addr_flat . ', ' . $education_id . ', ' . $comment . ','.$inn. ','.$snils. ','.$phone_work. ','.$phone_home. ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
