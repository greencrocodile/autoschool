<?php
	
error_reporting(0);
date_default_timezone_set('Europe/Moscow');
setlocale(LC_ALL, 'ru_RU');
define('APP_CHARSET', 'UTF-8');
mb_internal_encoding(APP_CHARSET);

define('AS_LOGIN', "u2356237_useras");
define('AS_PASSWORD', "65de7b7830");
define('AS_SERVER', "localhost");
define('AS_PORT', "3306");
define('AS_DATABASE', "u2356237_autoschool");

function Log_($msg) {
    $f = @fopen('logs/' . date('Y_m_d') . '.log', 'at');
    if ($f !== false) {
        fwrite($f, date('H:i:s') . ' host(' . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'console') . '): ' . $msg . "\n");
        fclose($f);
    }
}

function die_($file_name, $line, $message, $screen_message) {
    Log_('Произошла ошибка в файле ' . $file_name . ' на строке ' . $line . ': ' . $message . '');
    // die($screen_message);
}
Log_(AS_SERVER.AS_LOGIN.AS_PASSWORD.AS_DATABASE.AS_PORT);
$AS_db = mysqli_connect(AS_SERVER, AS_LOGIN, AS_PASSWORD, AS_DATABASE, AS_PORT) or die_(__FILE__, __LINE__, 'Ошибка при подключении к БД');





echo 'hello, world!!!';