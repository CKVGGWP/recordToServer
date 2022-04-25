<?php

if (isset($_POST['send'])) {
    $path = "uploads";
    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }

    $videoData = $_FILES['videoData'];
    $videoFile = $_POST['fileName'];
    $videoToUpload = $videoData['tmp_name'];

    $videoPath = "uploads/" . $videoFile . ".mp4";
    echo $videoPath;
    echo $videoToUpload;
    move_uploaded_file($videoToUpload, $videoPath) or die("Failed to Upload:" . $videoToUpload);
    // echo "Completed";
}
// return ($_POST  ."+". $_FILES);
