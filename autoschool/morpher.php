<?php
	require('config.php');
	if(set_time_limit(1200)){
		// $query = 'SELECT n FROM morpher where g is null or g = \'\' or a is null or a = \'\' limit 10';
		$query = 'SELECT n FROM morpher limit 5';
		Log_($query);
		$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
	//ivan_vasiliev - ivan_vasiliev13
		while ($arr = $result->fetch_assoc()) {
			$query1 = 'update morpher set g = \''.morpher_inflect($arr['n'],'Р').'\',a = \''.morpher_inflect($arr['n'],'В').'\' where n = \''.$arr['n'].'\'';
			Log_($query1);
			$AS_db->query($query1) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query1 . "\n" . $AS_db->error, $AS_db->error);
		}
		$result->free_result();
	}
	echo 'ok';
