<?php
require('config.php');
require_once('PHPExcel.php');
require_once('PHPExcel/IOFactory.php');

if (isset($_REQUEST['user_id'])){
	$user_id = intval($_REQUEST['user_id']);
} else {
	$user_id = -1;
}

if($user_id == -1){
	echo 'не задан пользователь';
	exit;
}

if (isset($_REQUEST['salary_month'])){
	$salary_month = intval($_REQUEST['salary_month']);
} else {
	$salary_month = -1;
}

if (isset($_REQUEST['salary_year'])){
	$salary_year = intval($_REQUEST['salary_year']);
} else {
	$salary_year = -1;
}

if (isset($_REQUEST['list'])){
	$list = $_REQUEST['list'];
} else {
	$list = '#';
}

if (isset($_REQUEST['dds_payment_date_from'])){
	$dds_payment_date_from = $_REQUEST['dds_payment_date_from'];
} else {
	$dds_payment_date_from = -1;
}

if (isset($_REQUEST['dds_payment_date_till'])){
	$dds_payment_date_till = $_REQUEST['dds_payment_date_till'];
} else {
	$dds_payment_date_till = -1;
}

if (isset($_REQUEST['dds_school_unit_id'])){
	$dds_school_unit_id = $_REQUEST['dds_school_unit_id'];
} else {
	$dds_school_unit_id = -1;
}

if ($salary_month != -1 && $salary_year != -1){
	$file_name = 'rep_salary.xlsx';
}

if ($dds_payment_date_from != -1 || $dds_payment_date_till != -1 || $dds_school_unit_id != -1){
	$file_name = 'rep_dds.xlsx';
}

$file_id = $user_id.'_'.date('YmdHis').'.xlsx';
try{
	if (file_exists($REPORTS_TEMPLATES_PATH.$file_name)) {
		if (set_time_limit(300)){
			if ($salary_month != -1 && $salary_year != -1){
				if($list == '#'){
					echo 'не задан перечень документов';
					exit;
				}
				$objReader = PHPExcel_IOFactory::createReader('Excel2007');
				$xls = $objReader->load($REPORTS_TEMPLATES_PATH.$file_name);
				if (strpos($list,'#1#')!==false){
					$sheet = $xls->getSheet(0);
					$query = 'SELECT post_name, staff_initials_name, salary,keeping,for_pay FROM v_staff_salary where salary_month = '.$salary_month.' and salary_year = '.$salary_year.' order by post_name, staff_initials_name';
					$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
					$i = 11;
					while ($arr = $result->fetch_assoc()) {
						$sheet->setCellValue('A'.($i+1),$arr['post_name']);
						$sheet->setCellValue('B'.($i+1),$arr['staff_initials_name']);
						$sheet->setCellValue('C'.($i+1),$arr['salary']);
						$sheet->setCellValue('D'.($i+1),$arr['keeping']);
						$sheet->setCellValue('E'.($i+1),$arr['for_pay']);	
						$sheet->duplicateStyle($sheet->getStyle('G12'), 'A'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('H12'), 'B'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('I12'), 'C'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('J12'), 'D'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('K12'), 'E'.($i+1));								
						$i++;						
					}
					$result->free_result();	
					$query = 'SELECT salary_month_name,count(*) cnt,sum(salary) salary_total,sum(keeping) keeping_total,sum(for_pay) for_pay_total FROM v_staff_salary where salary_month = '.$salary_month.' and salary_year = '.$salary_year;
					$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
					while ($arr = $result->fetch_assoc()) {
							
						$sheet->setCellValue('A6','Ведомость
зарплаты за '.$arr['salary_month_name'].' '.$salary_year.' г.');
						$sheet->setCellValue('A'.($i+1),'Всего: '.$arr['cnt']);
						$sheet->setCellValue('C'.($i+1),$arr['salary_total']);
						$sheet->setCellValue('D'.($i+1),$arr['keeping_total']);
						$sheet->setCellValue('E'.($i+1),$arr['for_pay_total']);
						$sheet->duplicateStyle($sheet->getStyle('G13'), 'A'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('H13'), 'B'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('I13'), 'C'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('J13'), 'D'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('K13'), 'E'.($i+1));	
						break;
					}
					$result->free_result();	
				}
				if (strpos($list,'#2#')!==false){
					$sheet = $xls->getSheet(1);
					$query = 'SELECT staff_id,salary_month_name,salary_year,staff_initials_name,salary,keeping,for_pay FROM v_staff_salary where salary_month = '.$salary_month.' and salary_year = '.$salary_year.' order by staff_initials_name';
					$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
					$i = 0;
					while ($arr = $result->fetch_assoc()) {
						$sheet->setCellValue('A'.($i+1),'ФИО: '.$arr['staff_initials_name'].'
З/П за '.$arr['salary_month_name'].' '.$arr['salary_year'].' г.');
						$sheet->getRowDimension($i+1)->setRowHeight($sheet->getRowDimension(1)->getRowHeight());
						$sheet->mergeCells('A'.($i+1).':F'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('G1'), 'A'.($i+1));
						$i++;
						$cellValues = $sheet->rangeToArray('G2:L3');
						$sheet->fromArray($cellValues, null, 'A'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('G2'), 'A'.($i+1));		
						$i++;
						$sheet->duplicateStyle($sheet->getStyle('G3'), 'A'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('H3'), 'B'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('I3'), 'C'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('J3'), 'D'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('K3'), 'E'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('L3'), 'F'.($i+1));		
						$i++;
						$query_in = 'SELECT id,staff_id,salary_month,salary_year,learning_program_id,learning_program_name_short,article_id,article_name,amount,coefficient,value,total FROM v_staff_salary_details_in where salary_month = '.$salary_month.' and salary_year = '.$salary_year.' and staff_id = '.$arr['staff_id'].' order by id';
						$result_in = $AS_db->query($query_in) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query_in . "\n" . $AS_db->error, $AS_db->error);
						while ($arr_in = $result_in->fetch_assoc()) {
							$sheet->setCellValue('A'.($i+1),$arr_in['article_name']);
							$sheet->duplicateStyle($sheet->getStyle('G4'), 'A'.($i+1));	
							$sheet->setCellValue('B'.($i+1),$arr_in['learning_program_name_short']);
							$sheet->duplicateStyle($sheet->getStyle('H4'), 'B'.($i+1));	
							$sheet->setCellValue('C'.($i+1),$arr_in['value']);
							$sheet->duplicateStyle($sheet->getStyle('I4'), 'C'.($i+1));	
							$sheet->setCellValue('D'.($i+1),$arr_in['amount']);
							$sheet->duplicateStyle($sheet->getStyle('J4'), 'D'.($i+1));	
							$sheet->setCellValue('E'.($i+1),$arr_in['coefficient']);
							$sheet->duplicateStyle($sheet->getStyle('K4'), 'E'.($i+1));	
							$sheet->setCellValue('F'.($i+1),$arr_in['total']);
							$sheet->duplicateStyle($sheet->getStyle('L4'), 'F'.($i+1));	
							$i++;
						}
						$result_in->free_result();
						$cellValues = $sheet->rangeToArray('J5');
						$sheet->fromArray($cellValues, null, 'D'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('J5'), 'D'.($i+1));	
						$sheet->setCellValue('F'.($i+1),$arr['salary']);
						$sheet->duplicateStyle($sheet->getStyle('L5'), 'F'.($i+1));	
						
						$i++;
						$cellValues = $sheet->rangeToArray('G6:L7');
						$sheet->fromArray($cellValues, null, 'A'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('G6'), 'A'.($i+1));		
						$i++;
						$sheet->duplicateStyle($sheet->getStyle('G7'), 'A'.($i+1));		
						$sheet->mergeCells('A'.($i+1).':B'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('H7'), 'B'.($i+1));		
						$sheet->duplicateStyle($sheet->getStyle('I7'), 'C'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('J7'), 'D'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('K7'), 'E'.($i+1));						
						$sheet->duplicateStyle($sheet->getStyle('L7'), 'F'.($i+1));		
						$i++;
						$query_out = 'SELECT id,staff_id,salary_month,salary_year,learning_program_id,learning_program_name_short,article_id,article_name,amount,coefficient,value,total FROM v_staff_salary_details_out where salary_month = '.$salary_month.' and salary_year = '.$salary_year.' and staff_id = '.$arr['staff_id'].' order by id';
						$result_out = $AS_db->query($query_out) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query_out . "\n" . $AS_db->error, $AS_db->error);
						while ($arr_out = $result_out->fetch_assoc()) {
							$sheet->mergeCells('A'.($i+1).':B'.($i+1));
							$sheet->setCellValue('A'.($i+1),$arr_out['article_name']);
							$sheet->duplicateStyle($sheet->getStyle('G8'), 'A'.($i+1));		
							$sheet->duplicateStyle($sheet->getStyle('H8'), 'B'.($i+1));	
							$sheet->setCellValue('C'.($i+1),$arr_out['value']);
							$sheet->duplicateStyle($sheet->getStyle('I8'), 'C'.($i+1));	
							$sheet->setCellValue('D'.($i+1),$arr_out['amount']);
							$sheet->duplicateStyle($sheet->getStyle('J8'), 'D'.($i+1));	
							$sheet->setCellValue('E'.($i+1),$arr_out['coefficient']);
							$sheet->duplicateStyle($sheet->getStyle('K8'), 'E'.($i+1));	
							$sheet->setCellValue('F'.($i+1),$arr_out['total']);
							$sheet->duplicateStyle($sheet->getStyle('L8'), 'F'.($i+1));	
							$i++;
						}
						$result_out->free_result();
						$cellValues = $sheet->rangeToArray('J5');
						$sheet->fromArray($cellValues, null, 'D'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('J5'), 'D'.($i+1));	
						$sheet->setCellValue('F'.($i+1),$arr['keeping']);
						$sheet->duplicateStyle($sheet->getStyle('L5'), 'F'.($i+1));	
						$i++;
						$cellValues = $sheet->rangeToArray('G10');
						$sheet->fromArray($cellValues, null, 'A'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('G10'), 'A'.($i+1));	
						$sheet->duplicateStyle($sheet->getStyle('H10'), 'B'.($i+1));	
						$sheet->setCellValue('B'.($i+1),$arr['for_pay']);
						$i++;
						$sheet->mergeCells('A'.($i+1).':F'.($i+1));
						$cellValues = $sheet->rangeToArray('G11');
						$sheet->fromArray($cellValues, null, 'A'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('G11'), 'A'.($i+1));	
						
						$i = $i+2;
					}
					$result->free_result();					
					
				}
				if ($list == '#1#2#'){
					$sheet = $xls->getSheet(0);
					$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_VISIBLE);
					$sheet = $xls->getSheet(1);
					$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_VISIBLE);
					$xls->setActiveSheetIndex(0);
				}
				if($list == '#1#'){
					$sheet = $xls->getSheet(0);
					$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_VISIBLE);
					$sheet = $xls->getSheet(1);
					$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_HIDDEN);	
					$xls->setActiveSheetIndex(0);
				}
				if($list == '#2#'){
					$sheet = $xls->getSheet(0);
					$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_HIDDEN);
					$sheet = $xls->getSheet(1);
					$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_VISIBLE);	
					$xls->setActiveSheetIndex(1);
				}				
				
			}
			
			if ($dds_payment_date_from != -1 || $dds_payment_date_till != -1 || $dds_school_unit_id != -1){
				$objReader = PHPExcel_IOFactory::createReader('Excel2007');
				$xls = $objReader->load($REPORTS_TEMPLATES_PATH.$file_name);
				$sheet = $xls->getSheet(0);
				$period = '';
				
				$query = 'select case when \''.$dds_payment_date_from.'\' = \'-1\' then \'\' else DATE_FORMAT(\''.$dds_payment_date_from.'\', \'%d.%m.%Y\') end as date_from, case when \''.$dds_payment_date_till.'\' = \'-1\' then \'\' else DATE_FORMAT(\''.$dds_payment_date_till.'\', \'%d.%m.%Y\') end as date_till';
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					if($dds_payment_date_from != -1 && $dds_payment_date_till != -1){
						$period = 'с '.$arr['date_from'].' г. по '.$arr['date_till'].' г.';
					}
					if($dds_payment_date_from != -1 && $dds_payment_date_till == -1){
						$period = 'с '.$arr['date_from'].' г.';
					}
					if($dds_payment_date_from == -1 && $dds_payment_date_till != -1){
						$period = 'по '.$arr['date_till'].' г.';
					}
					$sheet->setCellValue('A6',$period);					
					break;
				}
				$result->free_result();	
				

				if($dds_school_unit_id != -1){
					$query = 'select name_full from school_units where id = '.$dds_school_unit_id;
					$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
					while ($arr = $result->fetch_assoc()) {
						$sheet->setCellValue('A7',$arr['name_full']);
						break;
					}
					$result->free_result();	
				}
				$query = 'select fn_GetDateSaldo('.$dds_school_unit_id.',\''.$dds_payment_date_from.'\') as saldo';
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('A10','Остаток на начало периода: '.$arr['saldo'].' руб.');
					break;
				}
				$result->free_result();	
				$i = 10;
				$query = 'SELECT DATE_FORMAT(payment_date, \'%d.%m.%Y\') AS payment_date_text,payment_date,in_value,out_value ';
				if ($dds_school_unit_id == -1){
					$query .= 'FROM v_dds_total where 1=1 ';
				} else {
					$query .= 'FROM v_dds_su_total where school_unit_id = '.$dds_school_unit_id;				
				}
				if ($dds_payment_date_from != -1){
					$query .= ' and payment_date >= \''.$dds_payment_date_from.'\'';
				}
				if ($dds_payment_date_till != -1){
					$query .= ' and payment_date <= \''.$dds_payment_date_till.'\'';
				}
				$query .= ' order by payment_date asc';
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('A'.($i+1),$arr['payment_date_text']);
					$sheet->mergeCells('A'.($i+1).':F'.($i+1));
					$sheet->duplicateStyle($sheet->getStyle('H11'), 'A'.($i+1));
					
					$i++;
					$query_details = 'SELECT article_name,comment,in_value,out_value,DATE_FORMAT(act_date, \'%d.%m.%Y\') AS act_date,act_name FROM v_dds where payment_date = \''.$arr['payment_date'].'\'';
					if ($dds_school_unit_id != -1){
						$query_details .= ' and school_unit_id = '.$dds_school_unit_id;
					}
					$result_details = $AS_db->query($query_details) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query_details . "\n" . $AS_db->error, $AS_db->error);
					while ($arr_details = $result_details->fetch_assoc()) {
						$sheet->setCellValue('A'.($i+1),$arr_details['article_name']);
						$sheet->setCellValue('B'.($i+1),$arr_details['comment']);
						$sheet->setCellValue('C'.($i+1),$arr_details['in_value']);
						$sheet->setCellValue('D'.($i+1),$arr_details['out_value']);
						$sheet->setCellValue('E'.($i+1),$arr_details['act_date']);
						$sheet->setCellValue('F'.($i+1),$arr_details['act_name']);
						
						$sheet->duplicateStyle($sheet->getStyle('H12'), 'A'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('I12'), 'B'.($i+1));
						
						if($arr_details['out_value'] == 0){
							$sheet->duplicateStyle($sheet->getStyle('J12'), 'C'.($i+1));
							$sheet->duplicateStyle($sheet->getStyle('K12'), 'D'.($i+1));
						}
						if($arr_details['in_value'] == 0){
							$sheet->duplicateStyle($sheet->getStyle('J13'), 'C'.($i+1));
							$sheet->duplicateStyle($sheet->getStyle('K13'), 'D'.($i+1));
						}
						$sheet->duplicateStyle($sheet->getStyle('L12'), 'E'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('M12'), 'F'.($i+1));
						$i++;
					}
					$result_details -> free_result();
					
					$query_saldo = 'select fn_GetDateSaldo('.$dds_school_unit_id.',\''.$arr['payment_date'].'\') as saldo';
					$result_saldo = $AS_db->query($query_saldo) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query_saldo . "\n" . $AS_db->error, $AS_db->error);
					while ($arr_saldo = $result_saldo->fetch_assoc()) {
						$sheet->setCellValue('A'.($i+1),'Остаток на '.$arr['payment_date_text'].' г.: '.$arr_saldo['saldo'].' руб.');
						$sheet->mergeCells('A'.($i+1).':B'.($i+1));
						$sheet->duplicateStyle($sheet->getStyle('H14'), 'A'.($i+1));
						break;
					}
					$result_saldo->free_result();
					$sheet->setCellValue('C'.($i+1),$arr['in_value']);
					$sheet->setCellValue('D'.($i+1),$arr['out_value']);
					$sheet->duplicateStyle($sheet->getStyle('J14'), 'C'.($i+1));
					$sheet->duplicateStyle($sheet->getStyle('K14'), 'D'.($i+1));
					$sheet->duplicateStyle($sheet->getStyle('L14'), 'E'.($i+1));
					$sheet->duplicateStyle($sheet->getStyle('M14'), 'F'.($i+1));
					$i++;
				}
				$result->free_result();	
				$i++;
				$query = 'select initials_name as name,DATE_FORMAT(now(), \'%d.%m.%Y\') as date from v_users where id = '.$user_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('A'.($i+1),'Отчет подготовил:______________________'.$arr['name'].'                Дата отчета: '.$arr['date'].' г.');
					break;
				}
				$result->free_result();	
			}
			$objWriter = new PHPExcel_Writer_Excel2007($xls);
			$objWriter->save($REPORTS_TMP_PATH.$file_id);
		}
	} else {
		Log_('Ошибка: Файл '.$REPORTS_TEMPLATES_PATH.$file_name.' не существует');
		echo 'Ошибка: Файл '.$REPORTS_TEMPLATES_PATH.$file_name.' не существует';
		exit;
	}
} catch (Exception $e) {
	Log_('Ошибка: '.$e->getMessage());
	echo 'Ошибка: '.$e->getMessage();
	exit;
}
	
echo 'ok#'.$file_id;
 