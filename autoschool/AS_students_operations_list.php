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

if (isset($_REQUEST['sort_by_numbers'])) {
    $sort_by_numbers = $_REQUEST['sort_by_numbers'];
} else {
    $sort_by_numbers = '-1';
}

$sort_by_numbers = intval($sort_by_numbers);


if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
} else {
    $id = '-1';
}

$id = intval($id);


if (isset($_REQUEST['start_id'])) {
    $start_id = $_REQUEST['start_id'];
} else {
    $start_id = '';
}

if ($start_id == '') {
    $start_id = '0';
} else {
    $start_id = intval($start_id);
}

if (isset($_REQUEST['active_only'])) {
    $active_only = $_REQUEST['active_only'];
} else {
    $active_only = '';
}

if ($active_only == '') {
    $active_only = '0';
} else {
    $active_only = intval($active_only);
}

if (isset($_REQUEST['learning_group_id'])) {
    $learning_group_id = $_REQUEST['learning_group_id'];
} else {
    $learning_group_id = '';
}

if ($learning_group_id == '') {
    $learning_group_id = '-1';
} else {
    $learning_group_id = intval($learning_group_id);
}

if (isset($_REQUEST['for_school_exam'])) {
    $for_school_exam = $_REQUEST['for_school_exam'];
} else {
    $for_school_exam = '';
}

if ($for_school_exam == '') {
    $for_school_exam = '-1';
} else {
    $for_school_exam = intval($for_school_exam);
}

if (isset($_REQUEST['for_gibdd_exam'])) {
    $for_gibdd_exam = $_REQUEST['for_gibdd_exam'];
} else {
    $for_gibdd_exam = '';
}

if ($for_gibdd_exam == '') {
    $for_gibdd_exam = '-1';
} else {
    $for_gibdd_exam = intval($for_gibdd_exam);
}

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '';
}

if ($learning_program_id == '') {
    $learning_program_id = '-1';
} else {
    $learning_program_id = intval($learning_program_id);
}

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

if (isset($_REQUEST['staff_id'])) {
    $staff_id = intval($_REQUEST['staff_id']);
} else {
    $staff_id = -1;
}

if (isset($_REQUEST['school_unit_id'])) {
    $school_unit_id = intval($_REQUEST['school_unit_id']);
} else {
    $school_unit_id = -1;
}

if (isset($_REQUEST['birthdate_from'])) {
    $birthdate_from = $_REQUEST['birthdate_from'];
} else {
    $birthdate_from = '';
}

if ($birthdate_from != ''){
	$birthdate_from = '\''.$birthdate_from.'\'';
}

if (isset($_REQUEST['phone_work'])) {
    $phone_work = $_REQUEST['phone_work'];
} else {
    $phone_work = '';
}

if (isset($_REQUEST['phone_cell'])) {
    $phone_cell = $_REQUEST['phone_cell'];
} else {
    $phone_cell = '';
}

if (isset($_REQUEST['phone_home'])) {
    $phone_home = $_REQUEST['phone_home'];
} else {
    $phone_home = '';
}

if (isset($_REQUEST['card_number'])) {
    $card_number = $_REQUEST['card_number'];
} else {
    $card_number = '';
}
	
if (isset($_REQUEST['status_id'])) {
    $status_id = intval($_REQUEST['status_id']);
} else {
    $status_id = -1;
}	

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT id,student_id,firstname,middlename,lastname,full_name,initials_name,full_name_with_group,birthdate,birthdate_text,birthplace,gender_id,gender_name,addr_index,addr_region,addr_district,addr_city,addr_street,
addr_house,addr_build,addr_flat,education_id,education_name,phone_home,phone_cell,phone_work,work_place,post_name,inn,staff_id,staff_name,learning_program_id,learning_program_type,learning_program_name_full,learning_program_name_short,
learning_group_id,learning_group_number,price_id,price,school_unit_id,school_unit_name_short,school_unit_name_full,number_in_group,card_number,category,date_start,date_start_text,date_end,date_end_text,group_reg,group_reg_name,
status_id,status_name,expulsion_order_number,expulsion_date,expulsion_date_text,expulsion_reason_id,expulsion_reason_name,gearbox,gearbox_name,comment,active FROM v_students_operations where id >= 0'; //.$start_id;
if ($id != -1) {
    $query.=' and id = ' . $id;
} else {
    if ($active_only == 1) {
        $query.=' and active = 1';
    } else {
        $query.=' and active in(0,1)';
    }
    if ($learning_group_id != -1) {
        $query.=' and learning_group_id =' . $learning_group_id;
    }
    if ($learning_program_id != -1) {
        $query.=' and learning_program_id =' . $learning_program_id;
    }
	if($firstname != ''){
		$query .= ' and firstname like \'%'.$firstname.'%\'';
	}
	if($middlename != ''){
			$query .= ' and middlename like \'%'.$middlename.'%\'';
	}
	if($lastname != ''){
			$query .= ' and lastname like \'%'.$lastname.'%\'';
	}
	if($staff_id != -1){
			$query .= ' and staff_id = '.$staff_id;
	}	
	if($school_unit_id != -1){
		$query .= ' and school_unit_id = '.$school_unit_id;
	}	
	if($birthdate_from != ''){
		$query .= ' and birthdate >= '.$birthdate_from;
	}	
	if($phone_work != ''){
		$query .= ' and phone_work like \'%'.$phone_work.'%\'';
	}
	if($phone_cell != ''){
		$query .= ' and phone_cell like \'%'.$phone_cell.'%\'';
	}	
	if($phone_home != ''){
		$query .= ' and phone_home like \'%'.$phone_home.'%\'';
	}
	if($card_number != ''){
		$query .= ' and card_number like \'%'.$card_number.'%\'';
	}
	if($status_id != -1){
		$query .= ' and status_id = '.$status_id;
	}	
	
	
	
	// if ($for_school_exam != -1){
		// $query .= ' and id in (select so.id from v_students_operations so
// inner join learning_programs lp on lp.id = so.learning_program_id
// where (lp.learning_program_type = \'0\' and lp.active = 1)
// and
// (so.status_id = 1)
// and
// (so.active = 1)
// and
// (((select count(*) from v_school_exams se where se.student_operation_id = so.id and type_id = (select value from variables where name = \'school_theory_exam\') and se.result > 2) = 0)
// or ((select count(*) from v_school_exams se where se.student_operation_id = so.id and type_id = (select value from variables where name = \'school_city_exam\') and se.result > 2) = 0)))';
	// }
	// if ($for_gibdd_exam != -1){
		// $query .= ' and id in (select so.id from v_students_operations so
// inner join learning_programs lp on lp.id = so.learning_program_id
// where (lp.learning_program_type = \'0\' and lp.active = 1)
// and
// (so.status_id = 1)
// and
// (so.active = 1)
// and
// (((select count(*) from v_gibdd_exams ge where ge.student_operation_id = so.id and type_id = (select value from variables where name = \'gibdd_theory_exam\') and ge.result_id = 1) = 0)
// or ((select count(*) from v_gibdd_exams ge where ge.student_operation_id = so.id and type_id = (select value from variables where name = \'gibdd_city_exam\') and ge.result_id = 1) = 0)
// or ((select count(*) from v_gibdd_exams ge where ge.student_operation_id = so.id and type_id = (select value from variables where name = \'gibdd_polygon_exam\') and ge.result_id = 1) = 0)))';
	// }
}
if ($sort_by_numbers == -1) {
    $query.=' order by active desc, ' . $sort . ' ' . $dir;
} else {
    $query.=' order by active desc, cast(number_in_group as UNSIGNED) asc, id asc';
}
$query.=' limit ' . $limit . ' offset ' . $offset;
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.=',{
\'id\':' . intval($arr['id']) . ',
\'student_id\':' . intval($arr['student_id']) . ',
\'firstname\': \'' . escape4js($arr['firstname']) . '\',
\'middlename\': \'' . escape4js($arr['middlename']) . '\',
\'lastname\': \'' . escape4js($arr['lastname']) . '\',
\'full_name\': \'' . escape4js($arr['full_name']) . '\',
\'initials_name\': \'' . escape4js($arr['initials_name']) . '\',
\'full_name_with_group\': \'' . escape4js($arr['full_name_with_group']) . '\',
\'birthdate\': ' . (($arr['birthdate_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['birthdate_text']) . '\')') . ',
\'birthplace\': \'' . escape4js($arr['birthplace']) . '\',
\'gender_id\':' . intval($arr['gender_id']) . ',
\'gender_name\': \'' . escape4js($arr['gender_name']) . '\',
\'addr_index\': \'' . escape4js($arr['addr_index']) . '\',
\'addr_region\':' . intval($arr['addr_region']) . ',
\'addr_district\':' . intval($arr['addr_district']) . ',
\'addr_city\': \'' . escape4js($arr['addr_city']) . '\',
\'addr_street\': \'' . escape4js($arr['addr_street']) . '\',
\'addr_house\': \'' . escape4js($arr['addr_house']) . '\',
\'addr_build\': \'' . escape4js($arr['addr_build']) . '\',
\'addr_flat\': \'' . escape4js($arr['addr_flat']) . '\',
\'education_id\':' . intval($arr['education_id']) . ',
\'education_name\': \'' . escape4js($arr['education_name']) . '\',
\'phone_home\': \'' . escape4js($arr['phone_home']) . '\',
\'phone_cell\': \'' . escape4js($arr['phone_cell']) . '\',
\'phone_work\': \'' . escape4js($arr['phone_work']) . '\',
\'work_place\': \'' . escape4js($arr['work_place']) . '\',
\'post_name\': \'' . escape4js($arr['post_name']) . '\',
\'inn\': \'' . escape4js($arr['inn']) . '\',
\'staff_id\':' . intval($arr['staff_id']) . ',
\'staff_name\': \'' . escape4js($arr['staff_name']) . '\',
\'learning_program_id\':' . intval($arr['learning_program_id']) . ',
\'learning_program_name_full\': \'' . escape4js($arr['learning_program_name_full']) . '\',
\'learning_program_name_short\': \'' . escape4js($arr['learning_program_name_short']) . '\',
\'learning_group_id\':' . intval($arr['learning_group_id']) . ',
\'learning_program_type\':' . intval($arr['learning_program_type']) . ',
\'learning_group_number\': \'' . escape4js($arr['learning_group_number']) . '\',
\'price_id\':' . intval($arr['price_id']) . ',
\'price\': \'' . escape4js($arr['price']) . '\',
\'school_unit_id\':' . intval($arr['school_unit_id']) . ',
\'school_unit_name_short\': \'' . escape4js($arr['school_unit_name_short']) . '\',
\'school_unit_name_full\': \'' . escape4js($arr['school_unit_name_full']) . '\',
\'number_in_group\': \'' . escape4js($arr['number_in_group']) . '\',
\'card_number\': \'' . escape4js($arr['card_number']) . '\',
\'category\': \'' . escape4js($arr['category']) . '\',
\'date_start\': ' . (($arr['date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_start_text']) . '\')') . ',
\'date_end\': ' . (($arr['date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_end_text']) . '\')') . ',
\'group_reg\':' . intval($arr['group_reg']) . ',
\'group_reg_name\': \'' . escape4js($arr['group_reg_name']) . '\',
\'status_id\':' . intval($arr['status_id']) . ',
\'status_name\': \'' . escape4js($arr['status_name']) . '\',
\'expulsion_order_number\': \'' . escape4js($arr['expulsion_order_number']) . '\',
\'expulsion_date\': ' . (($arr['expulsion_date_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['expulsion_date_text']) . '\')') . ',
\'expulsion_reason_id\':' . intval($arr['expulsion_reason_id']) . ',
\'expulsion_reason_name\': \'' . escape4js($arr['expulsion_reason_name']) . '\',
\'gearbox\':' . intval($arr['gearbox']) . ',
\'gearbox_name\': \'' . escape4js($arr['gearbox_name']) . '\',
\'comment\': \'' . escape4js($arr['comment']) . '\',
\'active\':' . intval($arr['active']) . '
}';
}
$result->free_result();

if ($start_id == -1) {
    $d=',{
\'id\':-1,
\'student_id\':-1,
\'firstname\': \'-----\',
\'middlename\': \'-----\',
\'lastname\': \'-----\',
\'full_name\': \'-----\',
\'initials_name\': \'-----\',
\'full_name_with_group\': \'-----\',
\'birthdate\': \'\',
\'birthplace\': \'\',
\'gender_id\':-1,
\'gender_name\': \'\',
\'addr_index\': \'\',
\'addr_region\':-1,
\'addr_district\':-1,
\'addr_city\': \'\',
\'addr_street\': \'\',
\'addr_house\': \'\',
\'addr_build\': \'\',
\'addr_flat\': \'\',
\'education_id\':-1,
\'education_name\': \'\',
\'phone_home\': \'\',
\'phone_cell\': \'\',
\'phone_work\': \'\',
\'work_place\': \'\',
\'post_name\': \'\',
\'INN\': \'\',
\'staff_id\':-1,
\'staff_name\': \'\',
\'learning_program_id\':-1,
\'learning_program_name_full\': \'\',
\'learning_program_name_short\': \'\',
\'learning_group_id\':-1,
\'learning_group_number\': \'\',
\'price_id\':-1,
\'price\': \'\',
\'school_unit_id\':-1,
\'school_unit_name_short\': \'\',
\'school_unit_name_full\': \'\',
\'number_in_group\': \'\',
\'card_number\': \'\',
\'category\': \'\',
\'date_start\': \'\',
\'date_end\': \'\',
\'group_reg\':-1,
\'group_reg_name\': \'\',
\'status_id\':-1,
\'status_name\': \'\',
\'expulsion_order_number\': \'\',
\'expulsion_date\': \'\',
\'expulsion_reason_id\':-1,
\'expulsion_reason_name\': \'\',
\'gearbox\':-1,
\'gearbox_name\': \'\',
\'comment\': \'\',
\'active\':-1
}'.$d;
}
if ($d != '') {
    $d = mb_substr($d, 1);
}
$query = 'SELECT count(*) AS Total FROM v_students_operations where id >= 0';
if ($id != -1) {
    $query.=' and id = ' . $id;
} else {
   if ($active_only == 1) {
        $query.=' and active = 1';
    } else {
        $query.=' and active in(0,1)';
    }
    if ($learning_group_id != -1) {
        $query.=' and learning_group_id =' . $learning_group_id;
    }
    if ($learning_program_id != -1) {
        $query.=' and learning_program_id =' . $learning_program_id;
    }
	if($firstname != ''){
		$query .= ' and firstname like \'%'.$firstname.'%\'';
	}
	if($middlename != ''){
			$query .= ' and middlename like \'%'.$middlename.'%\'';
	}
	if($lastname != ''){
			$query .= ' and lastname like \'%'.$lastname.'%\'';
	}
	if($staff_id != -1){
			$query .= ' and staff_id = '.$staff_id;
	}	
	if($school_unit_id != -1){
		$query .= ' and school_unit_id = '.$school_unit_id;
	}	
	if($birthdate_from != ''){
		$query .= ' and birthdate >= '.$birthdate_from;
	}	
	if($phone_work != ''){
		$query .= ' and phone_work like \'%'.$phone_work.'%\'';
	}
	if($phone_cell != ''){
		$query .= ' and phone_cell like \'%'.$phone_cell.'%\'';
	}	
	if($phone_home != ''){
		$query .= ' and phone_home like \'%'.$phone_home.'%\'';
	}
	if($card_number != ''){
		$query .= ' and card_number like \'%'.$card_number.'%\'';
	}
	if($status_id != -1){
		$query .= ' and status_id = '.$status_id;
	}	
	// if ($for_school_exam != -1){
		// $query .= ' and id in (select so.id from v_students_operations so
// inner join learning_programs lp on lp.id = so.learning_program_id
// where (lp.learning_program_type = \'0\' and lp.active = 1)
// and
// (so.status_id = 1)
// and
// (so.active = 1)
// and
// (((select count(*) from v_school_exams se where se.student_operation_id = so.id and type_id = (select value from variables where name = \'school_theory_exam\') and se.result > 2) = 0)
// or ((select count(*) from v_school_exams se where se.student_operation_id = so.id and type_id = (select value from variables where name = \'school_city_exam\') and se.result > 2) = 0)))';
	// }
	// if ($for_gibdd_exam != -1){
		// $query .= ' and id in (select so.id from v_students_operations so
// inner join learning_programs lp on lp.id = so.learning_program_id
// where (lp.learning_program_type = \'0\' and lp.active = 1)
// and
// (so.status_id = 1)
// and
// (so.active = 1)
// and
// (((select count(*) from v_gibdd_exams ge where ge.student_operation_id = so.id and type_id = (select value from variables where name = \'gibdd_theory_exam\') and ge.result_id = 1) = 0)
// or ((select count(*) from v_gibdd_exams ge where ge.student_operation_id = so.id and type_id = (select value from variables where name = \'gibdd_city_exam\') and ge.result_id = 1) = 0)
// or ((select count(*) from v_gibdd_exams ge where ge.student_operation_id = so.id and type_id = (select value from variables where name = \'gibdd_polygon_exam\') and ge.result_id = 1) = 0)))';
	// }
}

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$total = 0;
while ($arr = $result->fetch_assoc()) {
    $total = intval($arr['Total']);
    break;
}
$result->free_result();

echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
