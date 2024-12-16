from fastapi import APIRouter, File, UploadFile
from backend.resume_upload.resume_upload_controller import *
from backend.resume_upload.resume_upload_controller import parse_pdf
resume_router = APIRouter()


@resume_router.post('/api/resume-upload')
async def resume_upload(resume_file: UploadFile = File(...)) -> UploadResponse:
    if resume_file.content_type != 'application/pdf':
        return UploadResponse(message=ResumeUploadMessages.NotAPdf, status=Status.Error)

    max_file_size = 2 * 1024 * 1024
    pdf_file = await resume_file.read()

    if len(pdf_file) > max_file_size:
        return UploadResponse(message=ResumeUploadMessages.TooLarge, status=Status.Error)
    parsed_pdf_uid = parse_pdf(pdf_file)
    return UploadResponse(uid=parsed_pdf_uid, message=ResumeUploadMessages.ResumeUploadSuccess, status=Status.Success)


@resume_router.post('/api/job-description')
def resume_upload(job_description: JobDescriptionPayload) -> UploadResponse:
    return validate_job_description(job_description)
