from backend.app import app
from fastapi.testclient import TestClient
from io import BytesIO
from backend.resume_upload.resume_upload_controller import UploadResponse, JobDescriptionPayload
from backend.user_login.user_login import LoginPayload, LoginResponse
from backend.user_signup.user_signup import SignupResponse, UserSignupPayload
from backend.resume_analyzer.resume_analyzer_controller import ResumeAnalyzerPayload
from backend.resume_analyzer.resume_analyzer_controller import ResumeAnalyzerResult


class TestApiBaseClient(TestClient):
    def __init__(self):
        super().__init__(app)

    def url(self, postfix):
        return f'/api/{postfix}'

    def upload_resume(self, file, content_type: bytes | str = 'application/pdf', file_name="test_resume.pdf"):
        if isinstance(file, bytes):
            url = self.url('resume-upload')
            payload = {"resume_file": (file_name, BytesIO(file), content_type)}
            response = self.post(url, files=payload)
            return UploadResponse(**response.json())
        return

    def upload_job_description(self, payload: dict | JobDescriptionPayload) -> UploadResponse:
        if isinstance(payload, JobDescriptionPayload):
            url = self.url('job-description')
            response = self.post(url, json=payload.model_dump())
            return UploadResponse(**response.json())
        elif isinstance(payload, dict):
            url = self.url('job-description')
            response = self.post(url, json=payload)
            return UploadResponse(**response.json())
        else:
            return

    def signup_user(self, username: str, email: str, password: str):
        if username is not None and email is not None and password is not None:
            payload = {"username": username, "email": email, "password": password}
            url = self.url('signup')
            response = self.post(url, json=UserSignupPayload(**payload).model_dump())
            return SignupResponse(**response.json())
        else:
            return

    def login_user(self, email: str, password: str):
        if email is not None and password is not None:
            payload = {"email": email, "password": password}
            url = self.url('login')
            response = self.post(url, json=LoginPayload(**payload).model_dump())
            return LoginResponse(**response.json())
        else:
            return ''

    def analyze_resume(self, uid: str):
        if uid is not None:
            payload = {"uid": uid}
            url = self.url('analyze')
            response = self.post(url, json=ResumeAnalyzerPayload(**payload).model_dump())
            return ResumeAnalyzerResult(**response.json())
