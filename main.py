from pathlib import Path
import sqlite3
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "feedback.db"

app = FastAPI(title="Simple Feedback App")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def create_table():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                rating INTEGER NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)


create_table()


class Feedback(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=3, max_length=120)
    rating: int = Field(ge=1, le=5)
    message: str = Field(min_length=3, max_length=1000)


@app.get("/")
def home():
    return FileResponse(BASE_DIR / "static" / "index.html")


@app.post("/api/feedback")
def submit_feedback(feedback: Feedback):
    name = feedback.name.strip()
    email = feedback.email.strip()
    message = feedback.message.strip()

    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="Please fill in every field.")

    with get_connection() as connection:
        cursor = connection.execute(
            """INSERT INTO feedback (name, email, rating, message, created_at)
               VALUES (?, ?, ?, ?, ?)""",
            (
                name,
                email,
                feedback.rating,
                message,
                datetime.now(timezone.utc).isoformat(timespec="seconds"),
            ),
        )
        feedback_id = cursor.lastrowid

    return {"message": "Thank you! Your feedback has been saved.", "id": feedback_id}


@app.post("/api/feedback")
def submit_feedback(feedback: Feedback):

    with get_connection() as connection:
        connection.execute(
            """INSERT INTO feedback
            (name, email, rating, message, created_at)
            VALUES (?, ?, ?, ?, ?)""",
            (
                feedback.name,
                feedback.email,
                feedback.rating,
                feedback.message,
                datetime.now(timezone.utc).isoformat()
            )
        )

    return {
        "message": "Feedback saved successfully!"
    }
