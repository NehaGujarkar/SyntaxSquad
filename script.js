document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    function addMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = sender;
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        addMessage("user", "You: " + message);
        userInput.value = "";
        botResponse(message);
    }

    function botResponse(userMessage) {
        let response = "I'm here to guide you. How can I help?";
        
        if (userMessage.toLowerCase().includes("meditation")) {
            response = "Let's begin a guided meditation. Close your eyes and take deep breaths...";
        } else if (userMessage.toLowerCase().includes("breathing")) {
            response = "Breathe in... Hold... Breathe out...";
        } else if (userMessage.toLowerCase().includes("mood")) {
            response = "How are you feeling today? 😊😟😡";
        }

        setTimeout(() => addMessage("bot", "Bot: " + response), 1000);
    }

    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    function addMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = sender;
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        addMessage("user", "You: " + message);
        userInput.value = "";

        // Show "Typing..." effect
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing";
        typingDiv.innerText = "Bot is typing...";
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            chatBox.removeChild(typingDiv); // Remove "Typing..." message
            botResponse(message);
        }, 1000);
    }

    function botResponse(userMessage) {
        let response = "I'm here to guide you. How can I help?";
        
        if (userMessage.toLowerCase().includes("meditation")) {
            response = "Let's begin a guided meditation. Close your eyes and take deep breaths...";
        } else if (userMessage.toLowerCase().includes("breathing")) {
            response = "Breathe in... Hold... Breathe out...";
            showBreathingAnimation();
        } else if (userMessage.toLowerCase().includes("mood")) {
            response = "How are you feeling today? 😊😟😡";
        }

        addMessage("bot", "Bot: " + response);
    }

    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
});
