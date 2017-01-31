<?php
	
	require('config.php');
	header('Content-type: application/javascript; charset=utf-8');
	
	if (isset($_REQUEST['callback'])) {
		$callback = $_REQUEST['callback'];
		} else {
		$callback = '';
	}
	
	if (isset($_REQUEST['id'])) {
		$id = $_REQUEST['id'];
	} else {
		$id = -1;
	}
	$id = intval($id);
	
	if (isset($_REQUEST['vehicle_id'])) {
		$vehicle_id = $_REQUEST['vehicle_id'];
		} else {
		$vehicle_id = '-1';
	}
	$vehicle_id = intval($vehicle_id);
	
	if (isset($_REQUEST['student_operation_id'])) {
		$student_operation_id = $_REQUEST['student_operation_id'];
		} else {
		$student_operation_id = '-1';
	}
	$student_operation_id = intval($student_operation_id);
	
	if (isset($_REQUEST['given_student_operation_id'])) {
		$given_student_operation_id = $_REQUEST['given_student_operation_id'];
		} else {
		$given_student_operation_id = '-1';
	}
	$given_student_operation_id = intval($given_student_operation_id);
	
	if (isset($_REQUEST['staff_id'])) {
		$staff_id = $_REQUEST['staff_id'];
		} else {
		$staff_id = '-1';
	}
	$staff_id = intval($staff_id);
	
	if (isset($_REQUEST['sort'])) {
		$sort = $_REQUEST['sort'];
		} else {
		$sort = 'name';
	}
	
	$sorters = array(
    'name' => 'name'
	);
	
	if (!isset($sorters[$sort])) {
		$sort = 'name';
	}
	
	$sort = $sorters[$sort];
	
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
	
	//---------------------------------------
	$offset = ($page - 1) * $limit;
	$query = 'SELECT id,vehicle_id,staff_id,student_operation_id,given_student_operation_id,document_type_id,name,serial,number,given_by,code,category,comment,date_start,date_end,date_start_text,date_end_text FROM v_documents';
	if($id != -1){
		$query .= ' where id = '.$id;
	} else {
		
			if ($vehicle_id != -1) {
				$query .= ' where active != 2 and vehicle_id = '.$vehicle_id;
			}
			if ($staff_id != -1) {
				$query .= ' where active != 2 and staff_id = '.$staff_id;
			}
			if ($student_operation_id != -1) {
				$query .= ' where active != 2 and student_operation_id = '.$student_operation_id;
			}
			if ($given_student_operation_id != -1) {
				$query .= ' where active != 2 and given_student_operation_id = '.$given_student_operation_id;
			}
			
		
	}
	$query .= ' limit ' . $limit . ' offset ' . $offset;
	
	$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
	$d = '';
	while ($arr = $result->fetch_assoc()) {
		$d.=',{
		\'id\':' . intval($arr['id']) . ',
		\'vehicle_id\':' . intval($arr['vehicle_id']) . ',
		\'staff_id\':' . intval($arr['staff_id']) . ',
		\'student_operation_id\':' . intval($arr['student_operation_id']) . ',
		\'given_student_operation_id\':' . intval($arr['given_student_operation_id']) . ',
		\'document_type_id\':' . intval($arr['document_type_id']) . ',
		\'name\': \'' . escape4js($arr['name']) . '\',
		\'serial\': \'' . escape4js($arr['serial']) . '\',
		\'number\': \'' . escape4js($arr['number']) . '\',
		\'given_by\': \'' . escape4js($arr['given_by']) . '\',
		\'code\': \'' . escape4js($arr['code']) . '\',
		\'category\': \'' . escape4js($arr['category']) . '\',
		\'comment\': \'' . escape4js($arr['comment']) . '\',
		\'date_start\': ' . (($arr['date_start_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_start_text']) . '\')') . ',
		\'date_end\': ' . (($arr['date_end_text'] == '') ? 'null' : 'new Date(\'' . escape4js($arr['date_end_text']) . '\')') . '
		}';
	}
	$result->free_result();
	if ($d != '') {
		$d = mb_substr($d, 1);
	}
	$query = 'SELECT count(*) AS Total FROM v_documents';
		if($id != -1){
		$query .= ' where id = '.$id;
	} else {
		
			if ($vehicle_id != -1) {
				$query .= ' where vehicle_id = '.$vehicle_id;
			}
			if ($staff_id != -1) {
				$query .= ' where staff_id = '.$staff_id;
			}
			if ($student_operation_id != -1) {
				$query .= ' where student_operation_id = '.$student_operation_id;
			}
			if ($given_student_operation_id != -1) {
				$query .= ' where given_student_operation_id = '.$given_student_operation_id;
			}
			
		
	}
	$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
	$total = 0;
	while ($arr = $result->fetch_assoc()) {
		$total = intval($arr['Total']);
		break;
	}
	$result->free_result();
	
	echo $callback . '({\'total\': ' . $total . ',\'list\':[' . $d . ']});';
