<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.9/dist/sweetalert2.all.min.js"></script>

    <title>Document</title>
</head>

<body>

    <div class="container text-center mt-2">
        <div class="col-md-12 mb-3" style="z-index: 100000;">
            <h4>Select Device</h4>
            <select name="" id="videoSource"></select>
        </div>
        <video autoplay muted playsinline></video>
        <div>
            <button id="btn" class="btn btn-primary">Start Recording</button>
            <button id="stopbtn" class="btn btn-danger">Stop Recording</button>
            <button id="preview" class="btn btn-warning">Preview Video</button>
            <!--             <button id="upload" class="btn btn-secondary">Upload Video</button> -->
            <button id="download" class="btn btn-danger">Download Video</button>
        </div>
        <video id="previewVideo" class="mt-2"></video>
    </div>

</body>

<script async src="ck_index.js"></script>
<!-- <script src="sweetalert2.all.min.js"></script> -->

</html>