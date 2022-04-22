<?php

if (isset($_POST['send'])) {
    $video = $_FILES['video'];

    $videoName = $video['name'];

    echo $video;
}
