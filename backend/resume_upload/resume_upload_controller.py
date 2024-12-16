from pydantic import BaseModel
from backend.models.enums import *
from pypdf import PdfReader
from io import BytesIO
from backend.models.storage import TempStorage


class JobDescriptionPayload(BaseModel):
    uid: str
    job_description: str


class UploadResponse(BaseModel):
    uid: str | None = None
    message: str
    status: str


def validate_job_description(job_description: JobDescriptionPayload):
    if len(job_description.job_description) > 5000:
        return UploadResponse(message=ResumeUploadMessages.JobDescriptionUploadFailure, status=Status.Error)

    temp_storage = TempStorage()
    temp_storage_content = temp_storage.read(job_description.uid)
    temp_storage_content['job_description'] = job_description.job_description
    storage_uid = temp_storage.update_storage(job_description.uid, temp_storage_content)

    return UploadResponse(uid=storage_uid, message=ResumeUploadMessages.JobDescriptionUploadSuccess, status=Status.Success)


def parse_pdf(pdf_file: bytes):
    try:
        pdf_file_bytes = BytesIO(pdf_file)
        pdf_file_read = PdfReader(pdf_file_bytes)
        resume_text = ""
        for page in pdf_file_read.pages:
            print(page.values())
            for line in page.extract_text().split("\n"):
                resume_text += (line.strip() + "\n")
            resume_storage = TempStorage()
            resume_uid = resume_storage.create({"resume_text": resume_text})
            return resume_uid
    except Exception as e:
        raise ValueError(f"Error processing the PDF: {e}")
