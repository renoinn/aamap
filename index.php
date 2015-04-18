<?php
require_once dirname(__FILE__).'/const.php';

$map_unchecked = $_GET['map'];

$no_map = false;
if (!in_array($map_unchecked, $MAP_NAMES)) {
	$no_map = true;
	require_once './templates/index.html';
	exit;
}
$map = $map_unchecked;

$file = file_get_contents('./map_datas/'.$map.'.dat');
/*
if(!$file) {
	$no_map = true;
	require_once './templates/index.html';
	exit;
}
*/
$data = explode("\n", $file);
$home_data = array();
foreach($data as $item) {
	if ($item === '') continue;

	$exploded = explode(',', $item);
	$tmp = array(
		'name' => $exploded[0],
		'posX' => $exploded[2],
		'posY' => $exploded[3],
	);
	if($exploded[1] === 'true') {
		$tmp['isopen'] = true;
	} else {
		$tmp['isopen'] = false;
	}
	$home_data[] = $tmp;
}

require_once './templates/index.html';
