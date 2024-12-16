from backend.resume_upload.resume_upload import resume_router
from backend.user_login.user_login import login_router
from backend.user_signup.user_signup import signup_router
from backend.resume_analyzer.resume_analyzer import resume_analyzer_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(resume_router)
app.include_router(signup_router)
app.include_router(login_router)
app.include_router(resume_analyzer_router)

# added for connectivity to frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
