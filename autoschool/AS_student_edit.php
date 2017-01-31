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

if (isset($_REQUEST['student_id'])) {
    $student_id = $_REQUEST['student_id'];
} else {
    $student_id = '';
}
if ($student_id == '') {
    echo 'Не задан идентификатор.';
    exit;
} else {
	$student_id = intval($student_id);
	if ($student_id == 0){
		$student_id = 'null';
	}
}

if (isset($_REQUEST['firstname'])) {
    $firstname = $_REQUEST['firstname'];
} else {
    $firstname = '';
}

$firstname = '\'' . $firstname . '\'';

if (isset($_REQUEST['middlename'])) {
    $middlename = $_REQUEST['middlename'];
} else {
    $middlename = '';
}

$middlename = '\'' . $middlename . '\'';

if (isset($_REQUEST['lastname'])) {
    $lastname = $_REQUEST['lastname'];
} else {
    $lastname = '';
}

$lastname = '\'' . $lastname . '\'';

if (isset($_REQUEST['birthdate'])) {
    $birthdate = $_REQUEST['birthdate'];
} else {
    $birthdate = '';
}

if ($birthdate == '') {
    $birthdate = 'null';
} else {
    $birthdate = '\'' . $birthdate . '\'';
}

if (isset($_REQUEST['birthplace'])) {
    $birthplace = $_REQUEST['birthplace'];
} else {
    $birthplace = '';
}
$birthplace = '\'' . $birthplace . '\'';


if (isset($_REQUEST['gender_id'])) {
    $gender_id = $_REQUEST['gender_id'];
} else {
    $gender_id = '-1';
}

if ($gender_id == '-1') {
    $gender_id = 'null';
} else {
    $gender_id = '\''.$gender_id.'\'';
}

if (isset($_REQUEST['addr_index'])) {
    $addr_index = $_REQUEST['addr_index'];
} else {
    $addr_index = '';
}

$addr_index = '\'' . $addr_index . '\'';

if (isset($_REQUEST['addr_region'])) {
    $addr_region = $_REQUEST['addr_region'];
} else {
    $addr_region = '-1';
}

if($addr_region == '-1'){
	$addr_region = 'null';
} else {
	$addr_region = intval($addr_region);	
}

if (isset($_REQUEST['addr_district'])) {
    $addr_district = $_REQUEST['addr_district'];
} else {
    $addr_district = '-1';
}

if($addr_district == '-1'){
	$addr_district = 'null';
} else {
	$addr_district = intval($addr_district);	
}

if (isset($_REQUEST['addr_city'])) {
    $addr_city = $_REQUEST['addr_city'];
} else {
    $addr_city = '';
}

$addr_city = '\'' . $addr_city . '\'';

if (isset($_REQUEST['addr_street'])) {
    $addr_street = $_REQUEST['addr_street'];
} else {
    $addr_street = '';
}

$addr_street = '\'' . $addr_street . '\'';

if (isset($_REQUEST['addr_house'])) {
    $addr_house = $_REQUEST['addr_house'];
} else {
    $addr_house = '';
}

$addr_house = '\'' . $addr_house . '\'';

if (isset($_REQUEST['addr_build'])) {
    $addr_build = $_REQUEST['addr_build'];
} else {
    $addr_build = '';
}

$addr_build = '\'' . $addr_build . '\'';

if (isset($_REQUEST['addr_flat'])) {
    $addr_flat = $_REQUEST['addr_flat'];
} else {
    $addr_flat = '';
}

$addr_flat = '\'' . $addr_flat . '\'';


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

if (isset($_REQUEST['phone_home'])) {
    $phone_home = $_REQUEST['phone_home'];
} else {
    $phone_home = '';
}

$phone_home = '\'' . $phone_home . '\'';

if (isset($_REQUEST['phone_cell'])) {
    $phone_cell = $_REQUEST['phone_cell'];
} else {
    $phone_cell = '';
}

$phone_cell = '\'' . $phone_cell . '\'';

if (isset($_REQUEST['phone_work'])) {
    $phone_work = $_REQUEST['phone_work'];
} else {
    $phone_work = '';
}

$phone_work = '\'' . $phone_work . '\'';

if (isset($_REQUEST['work_place'])) {
    $work_place = $_REQUEST['work_place'];
} else {
    $work_place = '';
}

$work_place = '\'' . $work_place . '\'';

if (isset($_REQUEST['post_name'])) {
    $post_name = $_REQUEST['post_name'];
} else {
    $post_name = '';
}

$post_name = '\'' . $post_name . '\'';

if (isset($_REQUEST['inn'])) {
    $inn = $_REQUEST['inn'];
} else {
    $inn = '';
}

$inn = '\'' . $inn . '\'';

if (isset($_REQUEST['staff_id'])) {
    $staff_id = $_REQUEST['staff_id'];
} else {
    $staff_id = '-1';
}

if ($staff_id == '-1') {
    $staff_id = 'null';
} else {
    $staff_id = intval($staff_id);
}

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '';
}

if ($learning_program_id == '') {
    $learning_program_id = 'null';
} else {
    $learning_program_id = intval($learning_program_id);
}

if (isset($_REQUEST['learning_group_id'])) {
    $learning_group_id = $_REQUEST['learning_group_id'];
} else {
    $learning_group_id = '-1';
}

if ($learning_group_id == '-1') {
    $learning_group_id = 'null';
} else {
    $learning_group_id = intval($learning_group_id);
}

if (isset($_REQUEST['price'])) {
    $price = $_REQUEST['price'];
} else {
    $price = '-1';
}

if($price == '-1'){
	$price = 'null';
} else {
	$price = intval($price);
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

if (isset($_REQUEST['number_in_group'])) {
    $number_in_group = $_REQUEST['number_in_group'];
} else {
    $number_in_group = '0';
}

$number_in_group = intval($number_in_group);

if (isset($_REQUEST['card_number'])) {
    $card_number = $_REQUEST['card_number'];
} else {
    $card_number = '';
}

$card_number = '\'' . $card_number . '\'';

if (isset($_REQUEST['category'])) {
    $category = $_REQUEST['category'];
} else {
    $category = '';
}

$category = '\'' . $category . '\'';

if (isset($_REQUEST['date_start'])) {
    $date_start = $_REQUEST['date_start'];
} else {
    $date_start = '';
}

if ($date_start == '') {
    $date_start = 'null';
} else {
    $date_start = '\'' . $date_start . '\'';
}

if (isset($_REQUEST['date_end'])) {
    $date_end = $_REQUEST['date_end'];
} else {
    $date_end = '';
}

if ($date_end == '') {
    $date_end = 'null';
} else {
    $date_end = '\'' . $date_end . '\'';
}

if (isset($_REQUEST['group_reg'])) {
    $group_reg = $_REQUEST['group_reg'];
} else {
    $group_reg = '-1';
}

if ($group_reg == '-1') {
    $group_reg = 'null';
} else {
	$group_reg = '\''.$group_reg.'\'';
}



if (isset($_REQUEST['status_id'])) {
    $status_id = $_REQUEST['status_id'];
} else {
    $status_id = '-1';
}

if ($status_id == '-1') {
    $status_id = 'null';
} else {
    $status_id = intval($status_id);
}

if (isset($_REQUEST['expulsion_order_number'])) {
    $expulsion_order_number = $_REQUEST['expulsion_order_number'];
} else {
    $expulsion_order_number = '';
}

$expulsion_order_number = '\'' . $expulsion_order_number . '\'';



if (isset($_REQUEST['expulsion_date'])) {
    $expulsion_date = $_REQUEST['expulsion_date'];
} else {
    $expulsion_date = '';
}

if ($expulsion_date == '') {
    $expulsion_date = 'null';
} else {
    $expulsion_date = '\'' . $expulsion_date . '\'';
}



if (isset($_REQUEST['expulsion_reason_id'])) {
    $expulsion_reason_id = $_REQUEST['expulsion_reason_id'];
} else {
    $expulsion_reason_id = '-1';
}

if ($expulsion_reason_id == '-1') {
    $expulsion_reason_id = 'null';
} else {
    $expulsion_reason_id = intval($expulsion_reason_id);
}

if (isset($_REQUEST['gearbox'])) {
    $gearbox = $_REQUEST['gearbox'];
} else {
    $gearbox = '-1';
}

if ($gearbox == '-1') {
    $gearbox = 'null';
} else {
	$gearbox = '\''.$gearbox.'\'';
}

if (isset($_REQUEST['comment'])) {
    $comment = $_REQUEST['comment'];
} else {
    $comment = '';
}

$comment = '\'' . $comment . '\'';

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

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$query = 'CALL sp_StudentOperationEdit(@p_id,'.$student_id.','.$firstname.','.$middlename.','.$lastname.','.$birthdate.','.$birthplace.','.$gender_id.','.$addr_index.','.$addr_region.','
.$addr_district.','.$addr_city.','.$addr_street.','.$addr_house.','.$addr_build.','.$addr_flat.','.$education_id.','.$phone_home.','.$phone_cell.','.$phone_work.','
.$work_place.','.$post_name.','.$inn.','.$staff_id.','.$learning_program_id.','.$learning_group_id.','.$price.','.$school_unit_id.','.$number_in_group.','.$card_number.','
.$category.','.$date_start.','.$date_end.','.$group_reg.','.$status_id.','.$expulsion_order_number.','.$expulsion_date.','.$expulsion_reason_id.','.$gearbox.','.$comment.','
.$user_id.')';

$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
