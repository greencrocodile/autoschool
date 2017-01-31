<?php

require('config.php');
header('Content-type: application/javascript; charset=utf-8');

if (isset($_REQUEST['table_name'])) {
    $table_name = trim($_REQUEST['table_name']);
} else {
    $table_name = 'document_types';
}
if ($table_name == '') {
    echo 'Не задан справочник.';
    exit;
}

$query = 'SELECT id,parent_id,name FROM '.$table_name.' order by parent_id, id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);
$d = '';
while (($arr = $result->fetch_assoc())) {
	$data[] = $arr;
}

$result->free_result();

$itemsByReference = array();

// Build array of item references:
foreach($data as $key => &$item) {
   $itemsByReference[$item['id']] = &$item;
   // Children array:
   $itemsByReference[$item['id']]['children'] = array();
   // Empty data class (so that json_encode adds "data: {}" ) 
   $itemsByReference[$item['id']]['data'] = new StdClass();
}

// Set items as children of the relevant parent item.
foreach($data as $key => &$item)
   if($item['parent_id'] && isset($itemsByReference[$item['parent_id']]))
      $itemsByReference [$item['parent_id']]['children'][] = &$item;

// Remove items that were added to parents elsewhere:
foreach($data as $key => &$item) {
   if($item['parent_id'] && isset($itemsByReference[$item['parent_id']]))
      unset($data[$key]);
}

// Encode:
$json = json_encode($data);
echo $json;