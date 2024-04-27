document.addEventListener("DOMContentLoaded", function () {
  run();
});

async function run() {
  // Load the models (adjust paths if necessary)
  try {
    await faceapi.loadFaceRecognitionModel("/models");
    await faceapi.loadFaceLandmarkModel("/models");
    await faceapi.loadSsdMobilenetv1Model("/models");

    console.log("Models loaded successfully!");
  } catch (error) {
    console.error("Error loading models:", error);
  }

  const videoEl = document.getElementById("inputVideo");

  navigator.getUserMedia(
    { video: {} },
    (stream) => {
      videoEl.srcObject = stream;

      async function detectFaces() {
        const detections = await faceapi
          .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        const faces = await faceapi.extractFaces(videoEl, detections);

        // Display the detected faces on the page
        showDetectedFaces(faces);
      }

      detectFaces(); // Call the async function to start detection
    },
    (err) => console.error("Error accessing webcam:", err)
  );
}
