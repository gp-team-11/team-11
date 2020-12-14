<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<?php
include 'db.inc';

$pattern = '/([\xEA-\xED][\x80-\xBF]{2}|[a-zA-Z0-9])+|\s+/';

$game = (int) $_POST['game'];
$name = preg_replace('/\s+/', ' ', $_POST['name']);
$score = (int) $_POST['score'];
$date = date("Y-m-d", time());

preg_match_all($pattern, $name, $match);
$name = implode('', $match[0]);

if ($name == '') {
    $name = 'no name';
}

if ($game > 0) {
    $sql = "INSERT INTO apf_rank (id, game, name, score, date) VALUES (NULL, '$game', '$name', '$score', '$date')";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    echo "<script>location.replace('.\/" . $game . "')</script>";
}
?>
<script>location.replace('./')</script>
</body>
</html>