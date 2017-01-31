<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');
if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
} else {
    $callback = '';
}

if (isset($_REQUEST['student_operation_id'])) {
    $student_operation_id = $_REQUEST['student_operation_id'];
} else {
    $student_operation_id = '-1';
}

$student_operation_id = intval($student_operation_id);

//---------------------------------------
$offset = ($page - 1) * $limit;
$query = 'SELECT '.$student_operation_id.' as student_operation_id,
(select count(*) from waybills_students where student_operation_id = '.$student_operation_id.') as drive_lessons_total,
(select count(*) from waybills_students where student_operation_id = '.$student_operation_id.' and place in (\'1\',\'2\')) as drive_lessons_program,
(select count(*) from waybills_students where student_operation_id = '.$student_operation_id.' and place in (\'1\')) as drive_lessons_city,
(select count(*) from waybills_students where student_operation_id = '.$student_operation_id.' and place in (\'2\')) as drive_lessons_polygon,
(select count(*) from waybills_students where student_operation_id = '.$student_operation_id.' and place in (\'3\')) as drive_lessons_add
';

$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while ($arr = $result->fetch_assoc()) {
    $d.='{
\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
\'drive_lessons_total\':' . intval($arr['drive_lessons_total']) . ',
\'drive_lessons_program\':' . intval($arr['drive_lessons_program']) . ',
\'drive_lessons_city\':' . intval($arr['drive_lessons_city']) . ',
\'drive_lessons_polygon\':' . intval($arr['drive_lessons_polygon']) . ',
\'drive_lessons_add\':' . intval($arr['drive_lessons_add']) . '

}';
}
$result->free_result();


echo $callback . '({\'list\':[' . $d . ']});';
