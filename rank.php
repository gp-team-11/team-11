<!DOCTYPE HTML>
<html>
<head>
    <title>rank</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="rank.css?after">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#header-nav').find('a').click(function() { 
                if (window.matchMedia('(max-width: 720px)').matches) {
                    $('#header-nav').stop().slideUp(500);
                }
            });
            $('#header-button').click(function() { $('#header-nav').stop().slideToggle(500) });
            $(window).resize(function() {
                if (!window.matchMedia('(max-width: 720px)').matches) {
                    $('#header-nav').stop().fadeIn();
                }
            });
            $('#game-list').change(function () {
                let v = $('#game-list option:selected').val();
                if (v > 0) {
                    location.replace('?g=' + v);
                }
            });
        });
    </script>
</head>
<body>
    <div id="page">
        <header>
            <div class="wrapper">
                <div id="header-title">TEAM 11</div>
                <div id="header-menu">
                    <button id="header-button">≡</button>
                    <nav id="header-nav">
                        <ul>
                            <li><a href="./">HOME</a></li>
                            <li><a href="./#section-games">GAMES</a></li>
                            <li><a href="./#section-about">ABOUT</a></li>
                            <li><a href="rank.php">RANK</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <section>
            <div class="wrapper">
                <div id="rank-title">RANKING</div>
                <div id="rank-list">
<?php
$g = $_GET['g'];
$nums = [0, 1, 2, 3, 4, 5, 6, 7];
$titles = ["", "엄마의 삼단정리", "막내의 하나둘셋", "할매의 뽁뽁뽁뽁", "아빠의 키맞추기", "작은형의 넘버쓰리", "할배의 기억강화", "누나의 과외수업"];
echo "<select id=\"game-list\">";
foreach ($nums as $i => $value) {
    if ($g == $nums[$i]) {
        echo "<option value=" . $nums[$i] . " selected>" . $titles[$i] . "</option>";
    } else {
        echo "<option value=" . $nums[$i] . ">" . $titles[$i] . "</option>";
    }
}

?>
                    </select>
                </div>                
                <div id="rank-table">
<?php
include 'db.inc';
$sql = "SELECT name, score, date FROM apf_rank WHERE game = ". $g . " ORDER BY score DESC, id ASC";
if ($result = mysqli_query($conn,$sql)){
    echo "<table><tbody><tr>
    <th id=\"c1\">#</th>
    <th id=\"c2\">이름</th>
    <th id=\"c3\">점수</th>
    <th id=\"c4\">날짜</th>
    </tr>";

    $c = 0;
    $d = 0;
    $t = -1;
    while($row = mysqli_fetch_array($result)){
        $d++;
        if ($t != $row[1]) {
            $c = $d;
            $t = $row[1];
        }
        echo "<tr>
        <td>" . $c . "</td>
        <td>" . $row[0] . "</td>
        <td>" . $row[1] . "</td>
        <td>" . $row[2] . "</td>
        </tr>
        ";
    } 
    echo "</tbody></table>
    ";

    mysqli_close($conn);

} else {
    echo "게임을 선택해주세요.";
}
?>
                </div>
            </div>
        </section>
        <footer>
            <div class="wrapper">
                <div id="bottom-text">
                    <p>GitHub : https://github.com/gp-team-11/team-11</p>
                    <p>Font : 메이플스토리 서체 (https://maplestory.nexon.com/Media/Font)</p>
                </div>
            </div>
        </footer>
    </div>
</body>

</html>