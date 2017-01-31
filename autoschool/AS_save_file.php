<?php
require('config.php');
if(isset($_REQUEST['file_id'])){
	if (file_exists($REPORTS_TMP_PATH.$_REQUEST['file_id'])) {
		$file_id = $_REQUEST['file_id'];
		if (ob_get_level()) {
			ob_end_clean();
		}
		// header('Content-type: application/vnd.ms-excel');
		header('Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-disposition: attachment;filename="документы.xlsx"');
		header("Content-Length: ".filesize($REPORTS_TMP_PATH.$file_id));
		header("Content-Transfer-Encoding: binary");
		// header('Content-Type: application/octet-stream');
		header('Content-Description: File Transfer');
		header('Cache-Control: max-age=0');
		header('Cache-Control: max-age=1');
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 
		header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); 
		header('Cache-Control: cache, must-revalidate'); 
		header('Pragma: public');
		readfile($REPORTS_TMP_PATH.$file_id);
	} else {
		header('HTTP/1.0 404 Not Found');
	}
} else {
	header('HTTP/1.0 404 Not Found');
}