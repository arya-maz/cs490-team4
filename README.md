# AI-Powered Resume Analyzer and Job Matcher

Project uses ChatGPT AI to take inputs (Resumes) and return feedback.

## Project Members:

- Arya Mazandarani
- Kyrylo Honcharov
- Daniel Olson
- Omoze Oyarebu
- Alen Kylyshbek
- Nifesimi Akintola

<a href="https://trello.com/b/KFmJz5Q3/cs490-ai-powered-resume-analyzer-and-job-matcher">Trello Board</a>

# How To Initialize And Run The FastAPI Endpoints

1. First you will need to initialize a local python environment in the root directory of the project. Run `python3 -m venv venv` while
   in <b>cs490-team4</b> folder.
2. After initializing the virtual environment, it should create a folder in your directory called <b>venv</b>.
3. Next, if the virtual environment did not activate for you, run `source venv/bin/activate`.
4. In your cli, you should see <b>(venv)</b> at the beginning of the prompt.
5. Then, run `pip install -r requiremenets.txt`. This will install all the packages necessary to run the project.
6. To run the API, in your console type in `fastapi dev backend/app.py`. This should enable the FastAPI endpoints on port 8000. To see the
   swagger with all the explanation head to <b>localhost:8000/docs</b>.

# How To Run Backend Tests

1. After initializing the packages, run this command in your console: `pytest tests/backend` to run all of the backend python tests.


# How To Write Tests For Endpoints

1. Import `TestClient` from `fastapi.testclient`.
2. Import the app from `backend/app.py`.
3. To create a test function, write a function that start with `test_<name-of-your-test>`
4. Test it using the command in <b>How To Run Backend Tests</b>. 


# How To Write An Endpoint

1. Create a new directory inside the `backend` subdirectory with a desired endpoint.
2. Inside of the directory, initialize an ApiRouter.
3. Write the desired endpoint.
4. Import the router into `backend/app.py` and initialize it with `app.include_router(<your-endpoint>)`.
5. Run it with `fastapi dev backend/app.py` to make sure everything is correct.

# How to connect Gemini LLM

1. Create your own Gemini API Key by following <a href="https://ai.google.dev/">this link</a>
2. Once you get the API
3. Find the `.env` file inside the `backend/resume_analyzer` folder
4. Open the file to reveal a blank field called `GEMINI_API_KEY`
5. Copy and paste your Gemini API Key inside of that file to enable the AI functionality
6. Enjoy!

<i>Good Luck Coding!</i>

# FrontEnd Instructions

- Navigate to `frontend/sign-on-form` for a detailed read me about running the react project

