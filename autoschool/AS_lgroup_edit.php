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

if (isset($_REQUEST['learning_program_id'])) {
    $learning_program_id = $_REQUEST['learning_program_id'];
} else {
    $learning_program_id = '-1';
}

if ($learning_program_id == '-1') {
    $learning_program_id = 'null';
} else {
    $learning_program_id = intval($learning_program_id);
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

if (isset($_REQUEST['gibdd_reg_staff_id'])) {
    $gibdd_reg_staff_id = $_REQUEST['gibdd_reg_staff_id'];
} else {
    $gibdd_reg_staff_id = '-1';
}

if ($gibdd_reg_staff_id == '-1') {
    $gibdd_reg_staff_id = 'null';
} else {
    $gibdd_reg_staff_id = intval($gibdd_reg_staff_id);
}



if (isset($_REQUEST['price'])) {
    $price = $_REQUEST['price'];
} else {
    $price = '-1';
}

if ($price == '-1') {
    $price = 'null';
} else {
	$price = intval($price);
}

if (isset($_REQUEST['number'])) {
    $number = $_REQUEST['number'];
} else {
    $number = '';
}

$number = '\'' . $number . '\'';

if (isset($_REQUEST['reg_order_number'])) {
    $reg_order_number = $_REQUEST['reg_order_number'];
} else {
    $reg_order_number = '';
}

$reg_order_number = '\'' . $reg_order_number . '\'';

if (isset($_REQUEST['gibdd_reg_order_number'])) {
    $gibdd_reg_order_number = $_REQUEST['gibdd_reg_order_number'];
} else {
    $gibdd_reg_order_number = '';
}

$gibdd_reg_order_number = '\'' . $gibdd_reg_order_number . '\'';

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

if (isset($_REQUEST['reg_order_date'])) {
    $reg_order_date = $_REQUEST['reg_order_date'];
} else {
    $reg_order_date = '';
}

if ($reg_order_date == '') {
    $reg_order_date = 'null';
} else {
    $reg_order_date = '\'' . $reg_order_date . '\'';
}

if (isset($_REQUEST['gibdd_reg_order_date'])) {
    $gibdd_reg_order_date = $_REQUEST['gibdd_reg_order_date'];
} else {
    $gibdd_reg_order_date = '';
}

if ($gibdd_reg_order_date == '') {
    $gibdd_reg_order_date = 'null';
} else {
    $gibdd_reg_order_date = '\'' . $gibdd_reg_order_date . '\'';
}

if (isset($_REQUEST['theory_exam_date'])) {
    $theory_exam_date = $_REQUEST['theory_exam_date'];
} else {
    $theory_exam_date = '';
}

if ($theory_exam_date == '') {
    $theory_exam_date = 'null';
} else {
    $theory_exam_date = '\'' . $theory_exam_date . '\'';
}

if (isset($_REQUEST['practice_exam_date'])) {
    $practice_exam_date = $_REQUEST['practice_exam_date'];
} else {
    $practice_exam_date = '';
}

if ($practice_exam_date == '') {
    $practice_exam_date = 'null';
} else {
    $practice_exam_date = '\'' . $practice_exam_date . '\'';
}

if (isset($_REQUEST['gibdd_exam_date'])) {
    $gibdd_exam_date = $_REQUEST['gibdd_exam_date'];
} else {
    $gibdd_exam_date = '';
}

if ($gibdd_exam_date == '') {
    $gibdd_exam_date = 'null';
} else {
    $gibdd_exam_date = '\'' . $gibdd_exam_date . '\'';
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

$query = 'set @p_id = ' . $id;
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'CALL sp_LearningGroupEdit(@p_id,'.$learning_program_id.','.$school_unit_id.','.$gibdd_reg_staff_id.','.$number.','.$date_start.','.$date_end.','.$reg_order_number.','.$reg_order_date.','.$gibdd_reg_order_number.','.$gibdd_reg_order_date.','.$theory_exam_date.','.$practice_exam_date.','.$gibdd_exam_date.','.$price.','.$user_id.')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
