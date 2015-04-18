<?php
require_once dirname(__FILE__).'/const.php';

$name = '';
$isopen = '';
$posX = '';
$posY = '';
$map = '';
$pass = '';

foreach($ADD_HOME_PARAMS as $param) {
	if(isset($_POST[$param]) && $_POST[$param] != '') {
		$$param = $_POST[$param];
	} else {
		doErrorResponse();
	}
}

if ($pass !== 'mogura') {
	doErrorResponse();
}

if (!in_array($map, $MAP_NAMES)) {
	doErrorResponse();
}

$line = $name.','.$isopen.','.floor($posX).','.floor($posY);

$fp = fopen('./map_datas/'.$map.'.dat', 'a');
$result = fwrite($fp, $line . "\n");
fclose($fp);

if (!$result) {
	doErrorResponse();
}
header("Content-Type: application/json; charset=utf-8");
echo '{"result":true}';

function doErrorResponse() {
	header("HTTP/1.1 500 Internal Server Error");
	echo '{"result":false}';
	exit;
}
