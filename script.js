document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const micButton = document.getElementById("toggle-voice");

    let mediaRecorder;
    let audioChunks = [];

    micButton.addEventListener("click", () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            stopRecording();
        } else {
            startRecording();
        }
    });

    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                    sendAudioToServer(audioBlob);
                };

                mediaRecorder.start();
                micButton.innerText = "🎙️ Recording... (Click to Stop)";
            })
            .catch(error => {
                console.error("Microphone access error:", error);
                alert("Please allow microphone access.");
            });
    }

    function stopRecording() {
        mediaRecorder.stop();
        micButton.innerText = "🎤 Speak";
    }

    function sendAudioToServer(audioBlob) {
        const formData = new FormData();
        formData.append("file", audioBlob, "speech.wav");

        fetch("http://127.0.0.1:8000/speech-to-text/", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.recognized_text) {
                addMessage("user", "You: " + data.recognized_text);
                botResponse(data.recognized_text);
            } else {
                addMessage("bot", "Bot: Sorry, I couldn't understand.");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    function addMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = sender;
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

