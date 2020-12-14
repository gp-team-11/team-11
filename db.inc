<?php
$db_host = "aaaaaa"; // 본인의
$db_user = "aaaaaa"; // 환경에
$db_passwd = "aaaaaa"; // 맞게
$db_name = "aaaaaa"; // 세팅
$conn = mysqli_connect($db_host, $db_user, $db_passwd, $db_name);
mysqli_set_charset($conn, "utf8");
?>