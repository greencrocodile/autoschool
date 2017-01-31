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


if (isset($_REQUEST['name_short'])) {
    $name_short = $_REQUEST['name_short'];
} else {
    $name_short = '';
}
if ($name_short == '') {
    echo 'Не задано краткое наименование.';
    exit;
} else {
    $name_short = '\'' . $name_short . '\'';
}

if (isset($_REQUEST['name_full'])) {
    $name_full = $_REQUEST['name_full'];
} else {
    $name_full = '';
}
if ($name_full == '') {
    echo 'Не задано полное наименование.';
    exit;
} else {
    $name_full = '\'' . $name_full . '\'';
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
    $addr_region = '';
}

$addr_region = '\'' . $addr_region . '\'';

if (isset($_REQUEST['addr_district'])) {
    $addr_district = $_REQUEST['addr_district'];
} else {
    $addr_district = '';
}

$addr_district = '\'' . $addr_district . '\'';

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

if (isset($_REQUEST['inn'])) {
    $inn = $_REQUEST['inn'];
} else {
    $inn = '';
}

$inn = '\'' . $inn . '\'';

if (isset($_REQUEST['rs'])) {
    $rs = $_REQUEST['rs'];
} else {
    $rs = '';
}

$rs = '\'' . $rs . '\'';

if (isset($_REQUEST['bank_name'])) {
    $bank_name = $_REQUEST['bank_name'];
} else {
    $bank_name = '';
}

$bank_name = '\'' . $bank_name . '\'';

if (isset($_REQUEST['ks'])) {
    $ks = $_REQUEST['ks'];
} else {
    $ks = '';
}

$ks = '\'' . $ks . '\'';

if (isset($_REQUEST['bik'])) {
    $bik = $_REQUEST['bik'];
} else {
    $bik = '';
}

$bik = '\'' . $bik . '\'';

if (isset($_REQUEST['license_serial'])) {
    $license_serial = $_REQUEST['license_serial'];
} else {
    $license_serial = '';
}

$license_serial = '\'' . $license_serial . '\'';

if (isset($_REQUEST['license_number'])) {
    $license_number = $_REQUEST['license_number'];
} else {
    $license_number = '';
}

$license_number = '\'' . $license_number . '\'';

if (isset($_REQUEST['license_giver'])) {
    $license_giver = $_REQUEST['license_giver'];
} else {
    $license_giver = '';
}

$license_giver = '\'' . $license_giver . '\'';

if (isset($_REQUEST['license_date_start'])) {
    $license_date_start = $_REQUEST['license_date_start'];
} else {
    $license_date_start = '';
}

if ($license_date_start == '') {
    $license_date_start = 'null';
} else {
    $license_date_start = '\'' . $license_date_start . '\'';
}

if (isset($_REQUEST['license_date_end'])) {
    $license_date_end = $_REQUEST['license_date_end'];
} else {
    $license_date_end = '';
}

if ($license_date_end == '') {
    $license_date_end = 'null';
} else {
    $license_date_end = '\'' . $license_date_end . '\'';
}

if (isset($_REQUEST['reg_number'])) {
    $reg_number = $_REQUEST['reg_number'];
} else {
    $reg_number = '';
}

$reg_number = '\'' . $reg_number . '\'';

if (isset($_REQUEST['reg_date'])) {
    $reg_date = $_REQUEST['reg_date'];
} else {
    $reg_date = '';
}

if ($reg_date == '') {
    $reg_date = 'null';
} else {
    $reg_date = '\'' . $reg_date . '\'';
}

if (isset($_REQUEST['gibdd_license_number'])) {
    $gibdd_license_number = $_REQUEST['gibdd_license_number'];
} else {
    $gibdd_license_number = '';
}

$gibdd_license_number = '\'' . $gibdd_license_number . '\'';

if (isset($_REQUEST['gibdd_license_date_start'])) {
    $gibdd_license_date_start = $_REQUEST['gibdd_license_date_start'];
} else {
    $gibdd_license_date_start = '';
}

if ($gibdd_license_date_start == '') {
    $gibdd_license_date_start = 'null';
} else {
    $gibdd_license_date_start = '\'' . $gibdd_license_date_start . '\'';
}

if (isset($_REQUEST['gibdd_license_date_end'])) {
    $gibdd_license_date_end = $_REQUEST['gibdd_license_date_end'];
} else {
    $gibdd_license_date_end = '';
}

if ($gibdd_license_date_end == '') {
    $gibdd_license_date_end = 'null';
} else {
    $gibdd_license_date_end = '\'' . $gibdd_license_date_end . '\'';
}

if (isset($_REQUEST['rent_contract_number'])) {
    $rent_contract_number = $_REQUEST['rent_contract_number'];
} else {
    $rent_contract_number = '';
}

$rent_contract_number = '\'' . $rent_contract_number . '\'';

if (isset($_REQUEST['rent_contract_date_start'])) {
    $rent_contract_date_start = $_REQUEST['rent_contract_date_start'];
} else {
    $rent_contract_date_start = '';
}

if ($rent_contract_date_start == '') {
    $rent_contract_date_start = 'null';
} else {
    $rent_contract_date_start = '\'' . $rent_contract_date_start . '\'';
}

if (isset($_REQUEST['rent_contract_date_end'])) {
    $rent_contract_date_end = $_REQUEST['rent_contract_date_end'];
} else {
    $rent_contract_date_end = '';
}

if ($rent_contract_date_end == '') {
    $rent_contract_date_end = 'null';
} else {
    $rent_contract_date_end = '\'' . $rent_contract_date_end . '\'';
}

if (isset($_REQUEST['ground_rent_contract_number'])) {
    $ground_rent_contract_number = $_REQUEST['ground_rent_contract_number'];
} else {
    $ground_rent_contract_number = '';
}

$ground_rent_contract_number = '\'' . $ground_rent_contract_number . '\'';

if (isset($_REQUEST['ground_rent_contract_date_start'])) {
    $ground_rent_contract_date_start = $_REQUEST['ground_rent_contract_date_start'];
} else {
    $ground_rent_contract_date_start = '';
}

if ($ground_rent_contract_date_start == '') {
    $ground_rent_contract_date_start = 'null';
} else {
    $ground_rent_contract_date_start = '\'' . $ground_rent_contract_date_start . '\'';
}

if (isset($_REQUEST['ground_rent_contract_date_end'])) {
    $ground_rent_contract_date_end = $_REQUEST['ground_rent_contract_date_end'];
} else {
    $ground_rent_contract_date_end = '';
}

if ($ground_rent_contract_date_end == '') {
    $ground_rent_contract_date_end = 'null';
} else {
    $ground_rent_contract_date_end = '\'' . $ground_rent_contract_date_end . '\'';
}

if (isset($_REQUEST['head_id'])) {
    $head_id = $_REQUEST['head_id'];
} else {
    $head_id = '';
}

if ($head_id == '') {
    echo 'не задан руководитель';
    exit;
} else {
    $head_id = intval($head_id);
}

if (isset($_REQUEST['is_main'])) {
    $is_main = $_REQUEST['is_main'];
} else {
    $is_main = '';
}

if ($is_main == '') {
    $is_main = 0;
} else {
    $is_main = intval($is_main);
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

$query = 'CALL sp_SchoolUnitEdit(@p_id,' . $name_short . ',' . $name_full . ',' . $addr_index . ',' . $addr_region . ',' . $addr_district . ',' . $addr_city . ',' . $addr_street . ',' . $addr_house . ',' . $addr_build . ',' . $addr_flat . ',' . $inn . ',' . $rs . ',' . $bank_name . ',' . $ks . ',' . $bik . ',' . $license_serial . ',' . $license_number . ',' . $license_giver . ',' . $license_date_start . ',' . $license_date_end . ',' . $reg_number . ',' . $reg_date . ',' . $gibdd_license_number . ',' . $gibdd_license_date_start . ',' . $gibdd_license_date_end . ',' . $rent_contract_number . ',' . $rent_contract_date_start . ',' . $rent_contract_date_end . ',' . $ground_rent_contract_number . ',' . $ground_rent_contract_date_start . ',' . $ground_rent_contract_date_end . ',' . $head_id . ',' . $is_main . ',' . $user_id . ')';
$AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

$query = 'SELECT @p_id as id';
$result = $AS_db->query($query) or die_(__FILE__, __LINE__, 'Ошибка при выполнении запроса: ' . "\n" . $query . "\n" . $AS_db->error, $AS_db->error);

while ($arr = $result->fetch_assoc()) {
    $id = intval($arr['id']);
    break;
}

$result->free_result();

echo 'ok#' . $id;
