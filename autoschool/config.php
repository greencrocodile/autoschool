<?php
	
error_reporting(0);
date_default_timezone_set('Europe/Moscow');
setlocale(LC_ALL, 'ru_RU');

define('APP_NAME', 'AUTOSCHOOL');
define('APP_CHARSET', 'UTF-8');
define('SYSTEM_OEM_CHARSET', 'cp866');

mb_internal_encoding(APP_CHARSET);
define('AS_LOGIN', "u2356237_useras");
define('AS_PASSWORD', "65de7b7830");
define('AS_SERVER', "localhost");
define('AS_PORT', "3306");
define('AS_DATABASE', "u2356237_autoschool");

$AS_db = mysqli_connect(AS_SERVER, AS_LOGIN, AS_PASSWORD, AS_DATABASE,AS_PORT) or die_(__FILE__, __LINE__, 'Ошибка при подключении к БД');
mysqli_set_charset($AS_db,'utf8');

//$REPORTS_TEMPLATES_PATH = 'D:/work/AS/Reports/templates/';
//$REPORTS_TMP_PATH = 'D:/work/AS/Reports/tmp/';
// $REPORTS_TEMPLATES_PATH = 'D:/users/vin/projects/AS/Reports/templates/';
// $REPORTS_TMP_PATH = 'D:/users/vin/projects/AS/Reports/tmp/';
$REPORTS_TEMPLATES_PATH = 'templates/';
$REPORTS_TMP_PATH = 'tmp/';
$DOC_TEMPLATE_NAME = 'doc00.xlsx';

function br2nl($str) {
    return str_replace('<br/>', "\n", $str);
}

function escape4js($str) {
    return str_replace('\'', '\\\'', str_replace('\\', '\\\\', str_replace(chr(0x0D), '', str_replace(chr(0x0A), '<br/>', $str))));
}

function escape4jsnobr($str) {
    return str_replace(chr(0x0D), '', str_replace(chr(0x0A), '\\n', str_replace('\'', '\\\'', str_replace('\\', '\\\\', $str))));
}

function mysqli_get_db_charset($stmt) {
    $query = "SELECT @@character_set_database;";
    $result = mysqli_query($stmt, $query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . iconv(AS_CHARSET, APP_CHARSET, $query) . "\n" . $AS_db->error);
    while ($row = mysqli_fetch_array($result, MYSQL_NUM)) {
        break;
    };
    return $row[0];
}

function Log_($msg) {
    $f = @fopen('logs/' . date('Y_m_d') . '.log', 'at');
    if ($f !== false) {
        fwrite($f, date('H:i:s') . ' host(' . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'console') . '): ' . $msg . "\n");
        fclose($f);
    }
}

function die_($file_name, $line, $message, $screen_message) {
    Log_('Произошла ошибка в файле ' . $file_name . ' на строке ' . $line . ': ' . $message . '');
    die($screen_message);
}

function get_current_morpher_credentials(){
	try{
		$query = 'SELECT login,pwd FROM v_morpher_current_credentials';
		Log_($query);
		$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
		while ($arr = $result->fetch_assoc()) {
			$res = array("login" => $arr['login'], "pwd" => $arr['pwd']);
			break;
		}
		$result->free_result();
	}catch(Exception $e){
		Log_($e->getMessage());
	}
	return $res;
}

function set_next_morpher_credentials(){
	$query = 'call sp_SetNextMorpherCredentials()';
	$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
}

function morpher_inflect($text, $padeg){
	try{
		$current_credentials = get_current_morpher_credentials();
		Log_('Username = '.$current_credentials["login"].', Password = '.$current_credentials["pwd"]);
		$credentials = array('Username'=>$current_credentials["login"], 'Password'=>$current_credentials["pwd"]);
		$header = new SOAPHeader('http://morpher.ru/', 'Credentials', $credentials);        
		$url = 'http://morpher.ru/WebService.asmx?WSDL';
		$client = new SoapClient($url); 
		$client->__setSoapHeaders($header);
		$params = array('parameters'=>array('s'=>$text));
		$result = (array) $client->__soapCall('GetXml', $params); 
		$singular = (array) $result['GetXmlResult']; 
		return $singular[$padeg];
	} catch (Exception $e) {
		Log_($e->getCode().' '.$e->getMessage());
		if($e->getCode() == 0){
			set_next_morpher_credentials();
			morpher_inflect($text, $padeg);
		} else {
			die_(__FILE__, __LINE__, 'Ошибка при обращении к сервису склонений: ' . "\n" . $e->getMessage(), $e->getMessage());
			break;
		}
	}
}