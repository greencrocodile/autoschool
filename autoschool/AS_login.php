<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');

if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['login'])) {
    $login = $_REQUEST['login'];
} else {
    $login = '';
}

if ($login == '') {
    echo 'не задан логин';
    exit;
} else {
    $login = '\'' . $login . '\'';
}

if (isset($_REQUEST['pwd'])) {
    $pwd = $_REQUEST['pwd'];
} else {
    $pwd = '';
}

if ($pwd == '') {
    echo 'не задан пароль';
    exit;
} else {
    $pwd = '\'' . $pwd . '\'';
}


//---------------------------------------
Log_('Выполнен вход в систему, логин '.$login);
$query = 'set @p_id = null';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'set @p_name = null';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'set @p_privileges = null';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'set @p_school_unit_id = null';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'CALL sp_Login(' . $login . ', md5(' . $pwd . '), @p_id, @p_name, @p_privileges, @p_school_unit_id)';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'select @p_id as id, @p_name as name, @p_privileges as privileges, @p_school_unit_id as school_unit_id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';

while ($arr = $result->fetch_assoc()) {
	$d.=',{
	\'id\':' . intval($arr['id']) . ',
	\'name\': \'' . escape4js($arr['name']) . '\',
	\'privileges\': \'' . escape4js($arr['privileges']) . '\',
	\'school_unit_id\':' . intval($arr['school_unit_id']) . '
	}';
}		

$result->free_result();
if ($d != '') {
    $d = mb_substr($d, 1);
}
echo $callback . '({\'list\':[' . $d . ']});';
