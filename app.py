from fastapi import FastAPI, File, UploadFile
import speech_recognition as sr
import aiofiles

app = FastAPI()

@app.post("/speech-to-text/")
async def speech_to_text(file: UploadFile = File(...)):
    recognizer = sr.Recognizer()

    # Save the uploaded audio file
    file_location = "temp_audio.wav"
    async with aiofiles.open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    # Process the audio file
    with sr.AudioFile(file_location) as source:
        audio = recognizer.record(source)  # Convert to audio format

    try:
        text = recognizer.recognize_google(audio)  # Convert to text
        return {"recognized_text": text}
    except sr.UnknownValueError:
        return {"error": "Could not understand the audio"}
    except sr.RequestError:
        return {"error": "Speech recognition service error"}

# Run the server using:
# uvicorn app:app --reload
