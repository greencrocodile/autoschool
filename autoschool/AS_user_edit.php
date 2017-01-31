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

if (isset($_REQUEST['firstname'])) {
    $firstname = $_REQUEST['firstname'];
} else {
    $firstname = '';
}

$firstname = '\''.$firstname.'\'';

if (isset($_REQUEST['middlename'])) {
    $middlename = $_REQUEST['middlename'];
} else {
    $middlename = '';
}

$middlename = '\''.$middlename.'\'';

if (isset($_REQUEST['lastname'])) {
    $lastname = $_REQUEST['lastname'];
} else {
    $lastname = '';
}

$lastname = '\''.$lastname.'\'';

if (isset($_REQUEST['login'])) {
    $login = $_REQUEST['login'];
} else {
    $login = '';
}

$login = '\''.$login.'\'';

if (isset($_REQUEST['pwd'])) {
    $pwd = $_REQUEST['pwd'];
} else {
    $pwd = '';
}

if($pwd == ''){
	$pwd = 'null';
} else {
	$pwd = 'md5(\''.$pwd.'\')';
}

if (isset($_REQUEST['school_unit_id'])) {
    $school_unit_id = $_REQUEST['school_unit_id'];
} else {
    $school_unit_id = '-1';
}
if ($school_unit_id == '-1') {
    $school_unit_id = 'null';
} else {
    $school_unit_id = intval($school_unit_id);
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

if (isset($_REQUEST['privileges'])) {
    $privileges = $_REQUEST['privileges'];
} else {
    $privileges = '';
}

$query = 'set @p_id = ' . $id;

$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'CALL sp_UserEdit(@p_id, '.$firstname.', '.$middlename.', '.$lastname.', '.$login.', '.$pwd.', '.$school_unit_id.', '.$user_id.')';

$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}
$result->free_result();

$query = 'delete from users_privileges where user_id = '.$id;

$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

if($privileges != '#'){
	$privileges = mb_substr($privileges, 1,strlen($privileges)-2);
	$privilegesArray = explode('#',$privileges);
	for ($i = 0; $i < count($privilegesArray); $i++){
		$query = 'CALL sp_SetUserPrivilege('.$id.',\''.$privilegesArray[$i].'\',\'1\','.$user_id.')';
		
		$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
	}
}
echo 'ok#' . $id;
