# Simple Feedback Form

A small feedback project using:
- **Frontend:** HTML, CSS and JavaScript
- **Backend:** Python with FastAPI
- **Database:** SQLite

## Run on macOS / Windows / Linux

1. Open a terminal in this project folder.
2. Create and activate a virtual environment (recommended):

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

   On Windows, activate with:

   ```powershell
   .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the application:

   ```bash
   uvicorn main:app --reload
   ```

5. Open **http://127.0.0.1:8000** in your browser.

## How it works

1. A user enters their name, email, rating and feedback.
2. JavaScript sends the form data to `POST /api/feedback`.
3. FastAPI validates the data and inserts it into `feedback.db`.
4. The database file and table are created automatically on the first run.

## View saved feedback

- Open **http://127.0.0.1:8000/api/feedback** to see saved feedback as JSON.
- Open **http://127.0.0.1:8000/docs** to test the API.

The SQLite database file (`feedback.db`) is created automatically beside `main.py`.
