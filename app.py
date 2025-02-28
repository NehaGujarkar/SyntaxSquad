from fastapi import FastAPI, File, UploadFile
import speech_recognition as sr
import aiofiles

app = FastAPI()

# Function to generate chatbot responses
def get_bot_response(user_text):
    responses = {
        "hello": "Hello! How can I assist you today?",
        "how are you": "I'm just a bot, but I'm here to help!",
        "meditation": "I can guide you through a meditation. Would you like to start a breathing exercise?",
        "breathing exercise": "Let's begin! Inhale deeply... hold... and exhale slowly.",
    }
    return responses.get(user_text.lower(), "I'm not sure how to respond to that.")

@app.post("/speech-to-text/")
async def speech_to_text(file: UploadFile = File(...)):
    recognizer = sr.Recognizer()

    # Save the uploaded audio file
    file_location = "temp_audio.wav"
    async with aiofiles.open(file_location, "wb") as buffer:
        await buffer.write(await file.read())

    # Process the audio file
    with sr.AudioFile(file_location) as source:
        audio = recognizer.record(source)

    try:
        user_text = recognizer.recognize_google(audio)  # Convert speech to text
        bot_response = get_bot_response(user_text)  # Generate chatbot response
        return {"recognized_text": user_text, "bot_response": bot_response}
    except sr.UnknownValueError:
        return {"error": "Could not understand the audio"}
    except sr.RequestError:
        return {"error": "Speech recognition service error"}

# Run with: uvicorn app:app --reload
