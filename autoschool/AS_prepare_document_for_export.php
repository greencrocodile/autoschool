<?php
require('config.php');
require_once('PHPExcel.php');
require_once('PHPExcel/IOFactory.php');

if (isset($_REQUEST['learning_group_id'])){
	$learning_group_id = intval($_REQUEST['learning_group_id']);
} else {
	$learning_group_id = -1;
}

if (isset($_REQUEST['student_operation_id'])){
	$student_operation_id = intval($_REQUEST['student_operation_id']);
} else {
	$student_operation_id = -1;
}

if (isset($_REQUEST['individual_student_operation_id'])){
	$individual_student_operation_id = intval($_REQUEST['individual_student_operation_id']);
} else {
	$individual_student_operation_id = -1;
}

if (isset($_REQUEST['test_date'])){
	$test_date = '\''.$_REQUEST['test_date'].'\'';
} else {
	$test_date = '';
}

if (isset($_REQUEST['test_staff_id'])){
	$test_staff_id = intval($_REQUEST['test_staff_id']);
} else {
	$test_staff_id = -1;
}

if (isset($_REQUEST['test_type_id'])){
	$test_type_id = intval($_REQUEST['test_type_id']);
} else {
	$test_type_id = -1;
}

if (isset($_REQUEST['exam_school_group_id'])){
	$exam_school_group_id = intval($_REQUEST['exam_school_group_id']);
} else {
	$exam_school_group_id = -1;
}

if (isset($_REQUEST['exam_school_group_student_operation_id'])){
	$exam_school_group_student_operation_id = intval($_REQUEST['exam_school_group_student_operation_id']);
} else {
	$exam_school_group_student_operation_id = -1;
}

if (isset($_REQUEST['exam_gibdd_group_id'])){
	$exam_gibdd_group_id = intval($_REQUEST['exam_gibdd_group_id']);
} else {
	$exam_gibdd_group_id = -1;
}
/*student_operation_id
test_date
test_staff_id
test_type_id
exam_school_group_id
exam_school_group_student_operation_id
exam_gibdd_group_id
*/

if (isset($_REQUEST['user_id'])){
	$user_id = intval($_REQUEST['user_id']);
} else {
	$user_id = -1;
}

if($user_id == -1){
	echo 'не задан пользователь';
	exit;
}

if (isset($_REQUEST['list'])){
	$list = $_REQUEST['list'];
} else {
	$list = '#';
}

if($list == '#'){
	echo 'не задан перечень документов';
	exit;
}

$file_id = $user_id.'_'.date('YmdHis').'.xlsx';
try{
	if (file_exists($REPORTS_TEMPLATES_PATH.$DOC_TEMPLATE_NAME)) {
		if (set_time_limit(300)){
			$objReader = PHPExcel_IOFactory::createReader('Excel2007');
			$xls = $objReader->load($REPORTS_TEMPLATES_PATH.$DOC_TEMPLATE_NAME);
			$xls->setActiveSheetIndex(0);
			$sheet = $xls->getActiveSheet();
			if ($learning_group_id != -1){
				
				
				// D23-J23 адрес проведения занятий
	
				$query = 'select r_region.name region_name,r_district.name district_name,addr_city,addr_street,addr_house,addr_build,addr_flat 
from school_units su
left join region r_region on r_region.id = su.addr_region
left join region r_district on r_district.id = su.addr_district
inner join learning_groups lg on lg.school_unit_id = su.id
where lg.id = '.$learning_group_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('D23',$arr['region_name']);
					$sheet->setCellValue('E23',$arr['district_name']);				 
					$sheet->setCellValue('F23',$arr['addr_city']);					 
					$sheet->setCellValue('G23',$arr['addr_street']);					 
					$sheet->setCellValue('H23',$arr['addr_house']);					 
					$sheet->setCellValue('I23',$arr['addr_build']);					 
					$sheet->setCellValue('J23',$arr['addr_flat']);					 
				}
			
				$result->free_result();
	
				$query = 'select
lg.id, lg.number, lp.name_full learning_program_name_full,
DATE_FORMAT(lg.date_start, \'%d.%m.%Y\') AS date_start,
DATE_FORMAT(lg.date_end, \'%d.%m.%Y\') AS date_end,
lg.reg_order_number,
DATE_FORMAT(lg.reg_order_date, \'%d.%m.%Y\') AS reg_order_date,
lg.gibdd_reg_number,
DATE_FORMAT(lg.gibdd_reg_date, \'%d.%m.%Y\') AS gibdd_reg_date,
DATE_FORMAT(lg.theory_exam_date, \'%d.%m.%Y\') AS theory_exam_date,
DATE_FORMAT(lg.practice_exam_date, \'%d.%m.%Y\') AS practice_exam_date,
s.firstname gibdd_reg_staff_firstname,
s.middlename gibdd_reg_staff_middlename,
s.lastname gibdd_reg_staff_lastname
from learning_groups lg
inner join learning_programs lp on lp.id = lg.learning_program_id
left join staff s on s.id = lg.gibdd_reg_staff where lg.id = '.$learning_group_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('B34',$arr['number']);
					$sheet->setCellValue('B35',$arr['learning_program_name_full']);				 
					$sheet->setCellValue('B37',$arr['date_start']);					 
					$sheet->setCellValue('B38',$arr['date_end']);					 
					$sheet->setCellValue('B39',$arr['reg_order_number']);					 
					$sheet->setCellValue('B40',$arr['reg_order_date']);					 
					$sheet->setCellValue('B41',$arr['gibdd_reg_number']);					 
					$sheet->setCellValue('B42',$arr['gibdd_reg_date']);	 
					$sheet->setCellValue('B43',$arr['theory_exam_date']);
					$sheet->setCellValue('B44',$arr['practice_exam_date']);
					$sheet->setCellValue('C53',$arr['gibdd_reg_staff_firstname']);
					$sheet->setCellValue('D53',$arr['gibdd_reg_staff_middlename']);
					$sheet->setCellValue('B53',$arr['gibdd_reg_staff_lastname']);
				}
			
				$result->free_result();
				
				$query = 'SELECT 
        v.name as var_name,
        ld.name AS learning_discipline_name,
        s.firstname AS firstname,
        s.middlename AS middlename,
        s.lastname AS lastname,
        s.initials_name AS initials_name
    FROM
        learning_group_staff lgs
        LEFT JOIN learning_disciplines ld ON ld.id = lgs.learning_discipline_id
        LEFT JOIN v_staff s ON lgs.staff_id = s.id
        inner JOIN variables v ON v.value = ld.id
            AND v.name LIKE \'%theory_discipline_id_%\'
    where learning_group_id = '.$learning_group_id;
					
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('A'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['learning_discipline_name']);
					$sheet->setCellValue('B'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['lastname']);
					$sheet->setCellValue('C'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['firstname']);					 
					$sheet->setCellValue('D'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['middlename']);					 
					$sheet->setCellValue('E'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['initials_name']);	
				}
			
				$result->free_result();
				
				$query = ' SELECT 
        lgv.learning_group_id AS learning_group_id,
        s.firstname AS firstname,
        s.middlename AS middlename,
        s.lastname AS lastname,
        v.reg_number AS reg_number,
        v.model_name AS model_name,
        (SELECT 
                COUNT(0)
            FROM
                students_operations so
            WHERE
                ((so.learning_group_id = lgv.learning_group_id)
                    AND (so.staff_id = lgv.staff_id))) AS students_count
    FROM
        learning_group_vehicles lgv
        JOIN v_staff s ON s.id = lgv.staff_id
        JOIN v_vehicles v ON v.id = lgv.vehicle_id where learning_group_id = '.$learning_group_id.' order by lastname';
					
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				while ($arr = $result->fetch_assoc()) {
					 $sheet->setCellValue('B'.($i+61),$arr['lastname']);
					 $sheet->setCellValue('C'.($i+61),$arr['firstname']);					 
					 $sheet->setCellValue('D'.($i+61),$arr['middlename']);					 
					 $sheet->setCellValue('E'.($i+61),$arr['students_count']);	
					 $sheet->setCellValue('H'.($i+61),$arr['model_name']);
					 $sheet->setCellValue('I'.($i+61),$arr['reg_number']);
					 $i++;
				}
				
				$result->free_result();
				$query = 'SELECT 
        so.id AS id,
        (case so.group_reg
			when \'1\' then \'1\'
			else \'0\'
        end) as group_reg,
        stf.initials_name AS staff_name,
        v.model_name AS model_name,
        v.reg_number AS reg_number,
        s.firstname AS firstname,
        s.middlename AS middlename,
        s.lastname AS lastname,
        DATE_FORMAT(s.birthdate, \'%d.%m.%Y\') AS birthdate,
        (CASE s.gender
            WHEN \'1\' THEN \'Мужской\'
            WHEN \'0\' THEN \'Женский\'
            ELSE NULL
        END) AS gender_name,
        e.name AS education_name,
        r.name AS region_name,
        d.name AS district_name,
        s.addr_city AS addr_city,
        s.addr_street AS addr_street,
        s.addr_house AS addr_house,
        s.addr_build AS addr_build,
        s.addr_flat AS addr_flat,
        s.phone_home AS phone_home,
        s.phone_work AS phone_work,
        s.work_place AS work_place,
        doc_pers.serial AS personal_serial,
        doc_pers.number AS personal_number,
		DATE_FORMAT(doc_pers.date_start, \'%d.%m.%Y\') AS personal_date,
        doc_dl.serial AS driver_license_serial,
        doc_dl.number AS driver_license_number
        
    FROM
        students_operations so
        LEFT JOIN students s ON so.student_id = s.id
        LEFT JOIN education e ON e.id = s.education_id
        LEFT JOIN v_staff stf ON stf.id = so.staff_id
        LEFT JOIN learning_group_vehicles lgv ON (lgv.staff_id = so.staff_id)
            AND (lgv.learning_group_id = so.learning_group_id)
        LEFT JOIN v_vehicles v ON v.id = lgv.vehicle_id
        LEFT JOIN region r ON r.id = s.addr_region
        LEFT JOIN region d ON r.id = s.addr_district
        LEFT JOIN v_doc_id_pers doc_id_personal ON doc_id_personal.student_operation_id = so.id
        LEFT JOIN v_doc_id_dl doc_id_driver_license ON doc_id_driver_license.student_operation_id = so.id
        LEFT JOIN documents doc_pers ON doc_pers.id = doc_id_personal.id
        LEFT JOIN documents doc_dl ON doc_dl.id = doc_id_driver_license.id
        LEFT JOIN learning_groups lg ON so.learning_group_id = lg.id where so.learning_group_id = '.$learning_group_id.' order by so.number_in_group,so.id';

				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('D'.($i+72),$arr['staff_name']);// D Инструктор факт.	
					$sheet->setCellValue('F'.($i+72),$arr['model_name']);// F Марка автомобиля	
					$sheet->setCellValue('G'.($i+72),$arr['reg_number']);// G Номер автомобиля	
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('O'.($i+72),$arr['birthdate']);// O Дата рождения	
					$sheet->setCellValue('Q'.($i+72),$arr['gender_name']);// Q Пол	
					$sheet->setCellValue('R'.($i+72),$arr['education_name']);// R Образование	
					$sheet->setCellValue('S'.($i+72),$arr['region_name']);// S Регион полный	
					$sheet->setCellValue('T'.($i+72),$arr['region_name']);// T Регион краткий	
					$sheet->setCellValue('U'.($i+72),$arr['district_name']);// U Район	
					$sheet->setCellValue('V'.($i+72),$arr['addr_city']);// V Населенный пункт	
					$sheet->setCellValue('W'.($i+72),$arr['addr_street']);// W Улица	
					$sheet->setCellValue('X'.($i+72),$arr['addr_house']);// X Дом	
					$sheet->setCellValue('Y'.($i+72),$arr['addr_build']);// Y Корпус	
					$sheet->setCellValue('Z'.($i+72),$arr['addr_flat']);// Z Квартира	
					$sheet->setCellValue('AA'.($i+72),$arr['phone_home']);// AA Телефон домашний	
					$sheet->setCellValue('AB'.($i+72),$arr['phone_work']);// AB Телефон рабочий	
					$sheet->setCellValue('AF'.($i+72),$arr['personal_serial']);// AF Серия паспорта	
					$sheet->setCellValue('AG'.($i+72),$arr['personal_number']);// AG Номер паспорта	
					$sheet->setCellValue('AH'.($i+72),$arr['personal_date']);// AH Дата выдачи	
					$sheet->setCellValue('AS'.($i+72),$arr['driver_license_serial']);// AS Серия ВУ	
					$sheet->setCellValue('AT'.($i+72),$arr['driver_license_number']);// AT Номер ВУ	
					$i++;
					
				}
				$result->free_result();
			}
			if ($student_operation_id != -1){
				
			$query = 'select
lg.id, lg.number, lp.name_full learning_program_name_full,
DATE_FORMAT(lg.date_start, \'%d.%m.%Y\') AS date_start
from learning_groups lg
inner join learning_programs lp on lp.id = lg.learning_program_id
inner join students_operations so on so.learning_group_id = lg.id where so.id = '.$student_operation_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('B34',$arr['number']);
					$sheet->setCellValue('B35',$arr['learning_program_name_full']);				 
					$sheet->setCellValue('B37',$arr['date_start']);					 
				}
			
				$result->free_result();
				
				$query = 'SELECT 
        v.name as var_name,
        ld.name AS learning_discipline_name,
        s.firstname AS firstname,
        s.middlename AS middlename,
        s.lastname AS lastname,
        s.initials_name AS initials_name
    FROM
        learning_group_staff lgs
        LEFT JOIN learning_disciplines ld ON ld.id = lgs.learning_discipline_id
        LEFT JOIN v_staff s ON lgs.staff_id = s.id
        inner JOIN variables v ON v.value = ld.id
            AND v.name LIKE \'%theory_discipline_id_%\'
		inner join students_operations so on so.learning_group_id = lgs.learning_group_id
    where so.id = '.$student_operation_id;

				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('A'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['learning_discipline_name']);
					$sheet->setCellValue('B'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['lastname']);
					$sheet->setCellValue('C'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['firstname']);					 
					$sheet->setCellValue('D'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['middlename']);					 
					$sheet->setCellValue('E'.(mb_substr($arr['var_name'], mb_strlen($arr['var_name'])-1)+53),$arr['initials_name']);	
				}
			
				$result->free_result();
				
				$query = 'SELECT 
        so.id AS id,
		case ifnull(so.number_in_group,0) when 0 then \'\' else  so.number_in_group end as number_in_group,
        (case so.group_reg
			when \'1\' then \'1\'
			else \'0\'
        end) as group_reg,
        so.expulsion_order_number,
        DATE_FORMAT(so.expulsion_date, \'%d.%m.%Y\') AS expulsion_date,
        er.name as expulsion_reason,
        s.firstname AS firstname,
        s.middlename AS middlename,
        s.lastname AS lastname,
        DATE_FORMAT(s.birthdate, \'%d.%m.%Y\') AS birthdate,
         r.name AS region_name,
        d.name AS district_name,
        s.addr_city AS addr_city,
        s.addr_street AS addr_street,
        s.addr_house AS addr_house,
        s.addr_build AS addr_build,
        s.addr_flat AS addr_flat,
        doc_pers.serial AS personal_serial,
        doc_pers.number AS personal_number,
		DATE_FORMAT(doc_pers.date_start, \'%d.%m.%Y\') AS personal_date,
        doc_pers.given_by AS personal_given_by,
        doc_med.comment AS medical_comment,
        doc_cert.number as cert_number,
        doc_dl.serial AS driver_license_serial,
        doc_dl.number AS driver_license_number,
        DATE_FORMAT(esgs.protocol_date, \'%d.%m.%Y\') AS last_protocol_date
        
    FROM
        students_operations so
        left join expulsion_reasons er on er.id = so.expulsion_reason
        LEFT JOIN students s ON so.student_id = s.id
        LEFT JOIN region r ON r.id = s.addr_region
        LEFT JOIN region d ON r.id = s.addr_district
        LEFT JOIN v_doc_id_pers doc_id_personal ON doc_id_personal.student_operation_id = so.id
        LEFT JOIN v_doc_id_dl doc_id_driver_license ON doc_id_driver_license.student_operation_id = so.id
        LEFT JOIN v_doc_id_med doc_id_medical ON doc_id_medical.student_operation_id = so.id
        LEFT JOIN v_doc_id_cert doc_id_certificate ON doc_id_certificate.student_operation_id = so.id
        
        LEFT JOIN documents doc_pers ON doc_pers.id = doc_id_personal.id
        LEFT JOIN documents doc_dl ON doc_dl.id = doc_id_driver_license.id
        LEFT JOIN documents doc_med ON doc_med.id = doc_id_medical.id
        LEFT JOIN documents doc_cert ON doc_cert.id = doc_id_certificate.id
       
        LEFT JOIN v_school_exam_last_groups selg ON selg.student_operation_id = so.id
		LEFT JOIN v_exam_school_groups esgs ON esgs.id = selg.exam_group_id
        
        where so.id = '.$student_operation_id;

				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				while ($arr = $result->fetch_assoc()) {
				
					$sheet->setCellValue('B'.($i+72),$arr['number_in_group']);
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('I'.($i+72),$arr['expulsion_order_number']);
					$sheet->setCellValue('J'.($i+72),$arr['expulsion_date']);
					$sheet->setCellValue('K'.($i+72),$arr['expulsion_reason']);
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('O'.($i+72),$arr['birthdate']);// O Дата рождения	
					$sheet->setCellValue('S'.($i+72),$arr['region_name']);// S Регион полный	
					$sheet->setCellValue('T'.($i+72),$arr['region_name']);// T Регион краткий	
					$sheet->setCellValue('U'.($i+72),$arr['district_name']);// U Район	
					$sheet->setCellValue('V'.($i+72),$arr['addr_city']);// V Населенный пункт	
					$sheet->setCellValue('W'.($i+72),$arr['addr_street']);// W Улица	
					$sheet->setCellValue('X'.($i+72),$arr['addr_house']);// X Дом	
					$sheet->setCellValue('Y'.($i+72),$arr['addr_build']);// Y Корпус	
					$sheet->setCellValue('Z'.($i+72),$arr['addr_flat']);// Z Квартира	
					$sheet->setCellValue('AF'.($i+72),$arr['personal_serial']);// AF Серия паспорта	
					$sheet->setCellValue('AG'.($i+72),$arr['personal_number']);// AG Номер паспорта	
					$sheet->setCellValue('AH'.($i+72),$arr['personal_date']);// AH Дата выдачи	
					$sheet->setCellValue('AI'.($i+72),$arr['personal_given_by']);
					$sheet->setCellValue('AO'.($i+72),$arr['medical_comment']);
					$sheet->setCellValue('AQ'.($i+72),$arr['cert_number']);
					$sheet->setCellValue('AS'.($i+72),$arr['driver_license_serial']);// AS Серия ВУ	
					$sheet->setCellValue('AT'.($i+72),$arr['driver_license_number']);// AT Номер ВУ	
					$sheet->setCellValue('BA'.($i+72),$arr['last_protocol_date']);
					$i++;
					
				}
				$result->free_result();
			}
			if ($test_staff_id != -1){			
				$query = 'SELECT  
			(case so.group_reg
				when \'1\' then \'1\'
				else \'0\'
			end) as group_reg,
			s.initials_name staff_initials_name,
			so.firstname,
			so.middlename,
			so.lastname,
			t.learning_group_number
			FROM autoschool.v_school_tests t
			inner join v_staff s on s.id = t.staff_id
			inner join v_students_operations so on so.id = t.student_operation_id
			where t.staff_id = '.$test_staff_id.' and t.type_id = '.$test_type_id.' and t.exam_date = '.$test_date;

				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				$sheet->setCellValue('D34',$test_date);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('D'.($i+72),$arr['staff_initials_name']);
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('BH'.($i+72),$arr['learning_group_number']);
					$i++;
				}
				$result->free_result();
			}
			if ($individual_student_operation_id != -1){					
				$query = 'select lp.name_full 
				from learning_programs lp
				inner join students_operations so on so.learning_program_id = lp.id
				where so.id = '.$individual_student_operation_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('B35',$arr['name_full']);
				}
				$result->free_result();
				
				$query = 'SELECT  
			(case so.group_reg
				when \'1\' then \'1\'
				else \'0\'
			end) as group_reg,
			s.initials_name staff_initials_name,
			so.firstname,
			so.middlename,
			so.lastname,
			(select v.vehicle_name from v_vehicles v where v.staff_id = so.staff_id order by active asc, id desc limit 1) as model_name
			FROM v_students_operations so
			inner join v_staff s on s.id = so.staff_id
			
			where so.id = '.$individual_student_operation_id;

				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				$sheet->setCellValue('D34',$test_date);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('D'.($i+72),$arr['staff_initials_name']);
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('F'.($i+72),$arr['model_name']);// F Марка автомобиля	
					$i++;
				}
				$result->free_result();
			}
			if ($exam_school_group_id != -1){				
				$query = 'SELECT 
				number,
				protocol_number,
				DATE_FORMAT(protocol_date, \'%d.%m.%Y\') AS protocol_date,
				(select count(*) from v_exam_school_group esg where esg.exam_group_id = g.id and theory_result>2 and city_result>2) total_success
				FROM v_exam_school_groups g
				where g.id = '.$exam_school_group_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('D35',$arr['protocol_number']);
					$sheet->setCellValue('D36',$arr['total_success']);
					$sheet->setCellValue('D37',$arr['protocol_date']);
					$sheet->setCellValue('D38',$arr['number']);
				}
			
				$result->free_result();
				
				$query = 'SELECT 
				   so.id AS id,
				   case so.group_reg when \'1\' then \'1\' else \'0\' end group_reg,
				   (CASE so.card_number
						WHEN 0 THEN \'\'
						ELSE so.card_number
					END) AS card_number,
					s.firstname AS firstname,
					s.middlename AS middlename,
					s.lastname AS lastname,
					doc_cert.serial AS certificate_serial,
					doc_cert.number AS certificate_number,
					esg.theory_result AS theory_result,
					esg.city_result AS city_result,
					lg.number AS learning_group_number
				FROM
					students_operations so
					left JOIN students s ON so.student_id = s.id
					LEFT JOIN v_doc_id_cert doc_id_certificate ON doc_id_certificate.student_operation_id = so.id
					LEFT JOIN documents doc_cert ON doc_cert.id = doc_id_certificate.id
					LEFT JOIN learning_groups lg ON so.learning_group_id = lg.id
					inner JOIN v_exam_school_group esg on esg.student_operation_id = so.id
					where esg.exam_group_id = '.$exam_school_group_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('H'.($i+72),$arr['card_number']);
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('AP'.($i+72),$arr['certificate_serial']);
					$sheet->setCellValue('AQ'.($i+72),$arr['certificate_number']);
					$sheet->setCellValue('BC'.($i+72),$arr['theory_result']);
					$sheet->setCellValue('BE'.($i+72),$arr['city_result']);
					$sheet->setCellValue('BH'.($i+72),$arr['learning_group_number']);
					$i++;
					
				}
				$result->free_result();							
				
			}
			if ($exam_school_group_student_operation_id != -1){			
				Log_('exam_school_group_student_operation_id = '.$exam_school_group_student_operation_id);	
				$query = 'select
lg.id, lg.number, lp.name_full learning_program_name_full,
lp.category,
DATE_FORMAT(lg.date_start, \'%d.%m.%Y\') AS date_start,
DATE_FORMAT(lg.date_end, \'%d.%m.%Y\') AS date_end
from learning_groups lg
inner join learning_programs lp on lp.id = lg.learning_program_id
where lg.id = (select learning_group_id from students_operations so where so.id = '.$exam_school_group_student_operation_id.')';
				Log_($query);
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('B34',$arr['number']);
					$sheet->setCellValue('B35',$arr['learning_program_name_full']);	
					$sheet->setCellValue('B36',$arr['category']);	
					$sheet->setCellValue('B37',$arr['date_start']);					 
					$sheet->setCellValue('B38',$arr['date_end']);					 
				}
			
				$result->free_result();
				
				$query = 'SELECT 
        so.id AS id,
		 case ifnull(so.number_in_group,0) when 0 then \'\' else  so.number_in_group end as number_in_group,
                (case so.group_reg
			when \'1\' then \'1\'
			else \'0\'
        end) as group_reg,
        s.firstname AS firstname,
        s.middlename AS middlename,
        s.lastname AS lastname,
        DATE_FORMAT(s.birthdate, \'%d.%m.%Y\') AS birthdate,
        s.birthplace,
        (CASE s.gender
            WHEN \'1\' THEN \'Мужской\'
            WHEN \'0\' THEN \'Женский\'
            ELSE NULL
        END) AS gender_name,
        r.name AS region_name,
        d.name AS district_name,
        s.addr_city AS addr_city,
        s.addr_street AS addr_street,
        s.addr_house AS addr_house,
        s.addr_build AS addr_build,
        s.addr_flat AS addr_flat,
        dt_pers.name AS personal_type,
        doc_pers.serial AS personal_serial,
        doc_pers.number AS personal_number,
		DATE_FORMAT(doc_pers.date_start, \'%d.%m.%Y\') AS personal_date,	
        doc_pers.given_by AS personal_given_by,
        doc_med.serial AS medical_serial,
        doc_med.number AS medical_number,
		DATE_FORMAT(doc_med.date_start, \'%d.%m.%Y\') AS medical_date,		
        doc_med.given_by AS medical_given_by,
        doc_med.comment AS medical_comment,
        doc_cert.serial AS certificate_serial,
        doc_cert.number AS certificate_number,
		DATE_FORMAT(doc_cert.date_start, \'%d.%m.%Y\') AS certificate_date,
        doc_dl.serial AS driver_license_serial,
        doc_dl.number AS driver_license_number,
        esgs.protocol_number AS protocol_number,
        DATE_FORMAT(esgs.protocol_date, \'%d.%m.%Y\') AS protocol_date,
        esg.theory_result AS theory_result,
        esg.city_result AS city_result,
        doc_dl.category AS driver_license_category,
		DATE_FORMAT(doc_dl.date_start, \'%d.%m.%Y\') AS driver_license_date,
        IFNULL(so.gearbox, \'1\') AS gearbox
       
    FROM
        students_operations so
        LEFT JOIN students s ON so.student_id = s.id
        LEFT JOIN region r ON r.id = s.addr_region
        LEFT JOIN region d ON r.id = s.addr_district
        LEFT JOIN v_doc_id_pers doc_id_personal ON doc_id_personal.student_operation_id = so.id
        LEFT JOIN v_doc_id_med doc_id_medical ON doc_id_medical.student_operation_id = so.id
        LEFT JOIN v_doc_id_cert doc_id_certificate ON doc_id_certificate.student_operation_id = so.id
        LEFT JOIN v_doc_id_dl doc_id_driver_license ON doc_id_driver_license.student_operation_id = so.id
        LEFT JOIN documents doc_pers ON doc_pers.id = doc_id_personal.id
        LEFT JOIN document_types dt_pers ON dt_pers.id = doc_pers.document_type_id
        LEFT JOIN documents doc_med ON doc_med.id = doc_id_medical.id
        LEFT JOIN documents doc_cert ON doc_cert.id = doc_id_certificate.id
        LEFT JOIN documents doc_dl ON doc_dl.id = doc_id_driver_license.id
        LEFT JOIN v_school_exam_last_groups selg ON selg.student_operation_id = so.id
        LEFT JOIN v_exam_school_groups esgs ON esgs.id = selg.exam_group_id
        LEFT JOIN v_exam_school_group esg ON (esg.exam_group_id = selg.exam_group_id)
            AND (esg.student_operation_id = so.id) 
	where so.id = '.$exam_school_group_student_operation_id;
				Log_($query);
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('B'.($i+72),$arr['number_in_group']);
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('O'.($i+72),$arr['birthdate']);
					$sheet->setCellValue('P'.($i+72),$arr['birthplace']);
					$sheet->setCellValue('Q'.($i+72),$arr['gender_name']);
					$sheet->setCellValue('T'.($i+72),$arr['region_name']);
					$sheet->setCellValue('T'.($i+72),$arr['region_name']);
					$sheet->setCellValue('U'.($i+72),$arr['district_name']);
					$sheet->setCellValue('V'.($i+72),$arr['addr_city']);
					$sheet->setCellValue('W'.($i+72),$arr['addr_street']);
					$sheet->setCellValue('X'.($i+72),$arr['addr_house']);
					$sheet->setCellValue('Y'.($i+72),$arr['addr_build']);
					$sheet->setCellValue('Z'.($i+72),$arr['addr_flat']);
					$sheet->setCellValue('AE'.($i+72),$arr['personal_type']);
					$sheet->setCellValue('AF'.($i+72),$arr['personal_serial']);
					$sheet->setCellValue('AG'.($i+72),$arr['personal_number']);
					$sheet->setCellValue('AH'.($i+72),$arr['personal_date']);
					$sheet->setCellValue('AI'.($i+72),$arr['personal_given_by']);
					$sheet->setCellValue('AK'.($i+72),$arr['medical_serial']);
					$sheet->setCellValue('AL'.($i+72),$arr['medical_number']);
					$sheet->setCellValue('AM'.($i+72),$arr['medical_date']);
					$sheet->setCellValue('AN'.($i+72),$arr['medical_given_by']);
					$sheet->setCellValue('AO'.($i+72),$arr['medical_comment']);
					$sheet->setCellValue('AP'.($i+72),$arr['certificate_serial']);
					$sheet->setCellValue('AQ'.($i+72),$arr['certificate_number']);
					$sheet->setCellValue('AR'.($i+72),$arr['certificate_date']);
					$sheet->setCellValue('AS'.($i+72),$arr['driver_license_serial']);
					$sheet->setCellValue('AT'.($i+72),$arr['driver_license_number']);
					$sheet->setCellValue('AZ'.($i+72),$arr['protocol_number']);
					$sheet->setCellValue('BA'.($i+72),$arr['protocol_date']);
					$sheet->setCellValue('BC'.($i+72),$arr['theory_result']);
					$sheet->setCellValue('BE'.($i+72),$arr['city_result']);
					$sheet->setCellValue('BJ'.($i+72),$arr['driver_license_category']);
					$sheet->setCellValue('BK'.($i+72),$arr['driver_license_date']);
					$sheet->setCellValue('BL'.($i+72),$arr['gearbox']);
					
					
					$i++;
					
				}
				$result->free_result();				

			}
			if ($exam_gibdd_group_id != -1){					
				$query = 'select 
				g.number,
				lp.name_full,
				DATE_FORMAT(g.exam_date, \'%d.%m.%Y\') AS exam_date
				from v_exam_gibdd_groups g
				left join learning_groups lg on lg.id = g.learning_group_id
				left join learning_programs lp on lp.id = lg.learning_program_id
				where g.id = '.$exam_gibdd_group_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('B34',$arr['number']);
					$sheet->setCellValue('B35',$arr['name_full']);
					$sheet->setCellValue('D40',$arr['exam_date']);
				}
			
				$result->free_result();
				
				$query = 'SELECT 
				so.id AS id,
				case so.group_reg when \'1\' then \'1\' else \'0\' end group_reg,
				s.firstname AS firstname,
				s.middlename AS middlename,
				s.lastname AS lastname,
				DATE_FORMAT(s.birthdate, \'%d.%m.%Y\') AS birthdate,
				r.name AS region_name,
				d.name AS district_name,
				s.addr_city AS addr_city,
				s.addr_street AS addr_street,
				s.addr_house AS addr_house,
				s.addr_build AS addr_build,
				s.addr_flat AS addr_flat,
				doc_dl.serial as driver_license_serial,
				doc_dl.number AS driver_license_number,
				lg.number AS learning_group_number
				FROM
				students_operations so
				left JOIN students s ON so.student_id = s.id
				LEFT JOIN region r ON r.id = s.addr_region
				LEFT JOIN region d ON r.id = s.addr_district
				LEFT JOIN learning_groups lg ON so.learning_group_id = lg.id
				LEFT JOIN v_doc_id_dl doc_id_driver_license ON doc_id_driver_license.student_operation_id = so.id
				LEFT JOIN documents doc_dl ON doc_dl.id = doc_id_driver_license.id
				inner JOIN v_exam_gibdd_group egg on egg.student_operation_id = so.id
				where exam_group_id = '.$exam_gibdd_group_id;
				$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
				$i = 0;
				while ($arr = $result->fetch_assoc()) {
					$sheet->setCellValue('C'.($i+72),$arr['group_reg']);// C Признак дополнительного	
					$sheet->setCellValue('L'.($i+72),$arr['lastname']);// L Фамилия	
					$sheet->setCellValue('M'.($i+72),$arr['firstname']);// M Имя	
					$sheet->setCellValue('N'.($i+72),$arr['middlename']);// N Отчество	
					$sheet->setCellValue('O'.($i+72),$arr['birthdate']);
					$sheet->setCellValue('T'.($i+72),$arr['region_name']);
					$sheet->setCellValue('T'.($i+72),$arr['region_name']);
					$sheet->setCellValue('U'.($i+72),$arr['district_name']);
					$sheet->setCellValue('V'.($i+72),$arr['addr_city']);
					$sheet->setCellValue('W'.($i+72),$arr['addr_street']);
					$sheet->setCellValue('X'.($i+72),$arr['addr_house']);
					$sheet->setCellValue('Y'.($i+72),$arr['addr_build']);
					$sheet->setCellValue('Z'.($i+72),$arr['addr_flat']);
					$sheet->setCellValue('AS'.($i+72),$arr['driver_license_serial']);
					$sheet->setCellValue('AT'.($i+72),$arr['driver_license_number']);
					$sheet->setCellValue('BH'.($i+72),$arr['learning_group_number']);
					$i++;
					
				}
				$result->free_result();				
			}
			if($list != '#'){
				$list = mb_substr($list, 1,strlen($list)-2);
				$listArray = explode('#',$list);
				for ($i = 0; $i < count($listArray); $i++){
					$file = $objReader->load($REPORTS_TEMPLATES_PATH.'doc'.$listArray[$i].'.xlsx');
					$file->setActiveSheetIndex(1);
					$sheet = $file->getActiveSheet();			
					$xls->addExternalSheet($sheet);
				}
			}
			$xls->setActiveSheetIndex(0);
			$sheet = $xls->getActiveSheet();
			$sheet->setSheetState(PHPExcel_Worksheet::SHEETSTATE_HIDDEN);
			$xls->setActiveSheetIndex(1);
			$objWriter = new PHPExcel_Writer_Excel2007($xls);
			$objWriter->save($REPORTS_TMP_PATH.$file_id);
		}
	} else {
		Log_('Ошибка: Файл '.$REPORTS_TEMPLATES_PATH.$DOC_TEMPLATE_NAME.' не существует');
		echo 'Ошибка: Файл '.$REPORTS_TEMPLATES_PATH.$DOC_TEMPLATE_NAME.' не существует';
		exit;
	}
} catch (Exception $e) {
	Log_('Ошибка: '.$e->getMessage());
	echo 'Ошибка: '.$e->getMessage();
	exit;
}
	
echo 'ok#'.$file_id;
 