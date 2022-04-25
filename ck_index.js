"use strict";

let recordButton = document.getElementById("btn");
let stopBtn = document.getElementById("stopbtn");
let previewBtn = document.getElementById("preview");
let uploadBtn = document.getElementById("upload");
let downloadBtn = document.getElementById("download");
let videoElement = document.querySelector("video");
let videoSelect = document.querySelector("select#videoSource");
let mediaRecorder;
const parts = [];

previewBtn.disabled = true;
// uploadBtn.disabled = true;
downloadBtn.disabled = true;
stopBtn.disabled = true;

videoSelect.onchange = getStream;
recordButton.onclick = record;
stopBtn.onclick = stop;
previewBtn.onclick = preview;
// uploadBtn.onclick = upload;
downloadBtn.onclick = download;

getStream().then(getDevices).then(gotDevices);

function getDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  console.log("Available input and output devices:", deviceInfos);
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "videoinput") {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const videoSource = videoSelect.value;
  const constraints = {
    audio: true,
    video: { deviceId: videoSource ? { exact: videoSource } : undefined },
  };
  return navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoSelect.selectedIndex = [...videoSelect.options].findIndex(
    (option) => option.text === stream.getVideoTracks()[0].label
  );
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.error("Error: ", error);
}

// Record Function

function record() {
  mediaRecorder = new MediaRecorder(window.stream);
  mediaRecorder.start(1000);
  mediaRecorder.ondataavailable = function (e) {
    parts.push(e.data);
  };
  recordButton.innerHTML =
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Recording...";
  stopBtn.disabled = false;
}

// Stop Record Function

function stop() {
  mediaRecorder.stop();
  recordButton.innerHTML = "Start Record";
  previewBtn.disabled = false;
  // uploadBtn.disabled = false;
  downloadBtn.disabled = false;
  stopBtn.disabled = false;

  var fileName = "";
  Swal.fire({
    title: "Enter File Name",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    allowEscapeKey: false,
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Discard",
    showLoaderOnConfirm: true,
  }).then((result) => {
    if (result.value) {
      upload(result.value);
    }
  });
}

// Preview Function

function preview() {
  uploadBtn.disabled = true;
  recordButton.disabled = true;
  previewBtn.innerHTML =
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Previewing...";
  let blob = new Blob(parts, { type: "video/mp4" });
  let videoURL = URL.createObjectURL(blob);
  let previewVideo = document.getElementById("previewVideo");
  previewVideo.src = videoURL;
  previewVideo.controls = true;

  previewVideo.onended = function () {
    uploadBtn.disabled = false;
    recordButton.disabled = false;
    previewBtn.innerHTML = "Preview Video";
    previewVideo.remove();
    previewBtn.disabled = true;
  };
}

// Upload to Server Function

function upload(fileName) {
  // console.log(window.URL.createObjectURL(new Blob(parts)));
  recordButton.disabled = true;
  previewBtn.disabled = true;
  stopBtn.disabled = false;
  let blob = new Blob(parts, { type: "video/mp4" });
  // alert(blob);
  // console.log(blob);
  let formData = new FormData();
  formData.append("videoData", blob);
  formData.append("fileName", fileName);
  formData.append("send", "true");
  // uploadBtn.innerHTML =
  // "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Uploading...";
  $.ajax({
    url: "ck_upload.php",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      // alert(data);
      // uploadBtn.innerHTML = "Upload Video";
      recordButton.disabled = false;
      previewBtn.disabled = false;
      stopBtn.disabled = false;
      console.log(data);
    },
  });
}

// Download Video Function

function download() {
  recordButton.disabled = true;
  previewBtn.disabled = true;
  stopBtn.disabled = true;
  let blob = new Blob(parts, { type: "video/mp4" });
  downloadBtn.innerHTML =
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Downloading...";
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "video.mp4";
  document.body.appendChild(a);
  a.click();
  a.remove();
  downloadBtn.innerHTML = "Download Video";
  recordButton.disabled = false;
  previewBtn.disabled = false;
  stopBtn.disabled = false;
}
