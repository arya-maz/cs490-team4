from backend.resume_upload.resume_upload_controller import JobDescriptionPayload
from tests.backend.base_client import TestApiBaseClient
import requests


def test_resume_analyze():
    test_client = TestApiBaseClient()
    file_path = "tests/backend/test_resume/kyryloHoncharov.pdf"
    with open(file_path, 'rb') as f:
        pdf_bytes = f.read()
    # resume_text = requests.get("https://announcements.asx.com.au/asxpdf/20171108/pdf/43p1l61zf2yct8.pdf")
    resume_upload_response = test_client.upload_resume(pdf_bytes)

    assert resume_upload_response.uid is not None
    job_description_payload = JobDescriptionPayload(uid=resume_upload_response.uid, job_description="python developer")
    job_description_response = test_client.upload_job_description(job_description_payload)
    assert job_description_response.uid == resume_upload_response.uid

    response = test_client.analyze_resume(job_description_response.uid)
    assert response.feedback is not None
    assert response.fit_score is not None