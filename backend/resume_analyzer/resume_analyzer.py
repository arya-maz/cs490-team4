from fastapi import APIRouter
from backend.resume_analyzer.resume_analyzer_controller import ResumeAnalyzerPayload, analyze_resume, ResumeAnalyzerResult

resume_analyzer_router = APIRouter()


@resume_analyzer_router.post('/api/analyze')
async def resume_analyzer(resume_uid: ResumeAnalyzerPayload) -> ResumeAnalyzerResult:
    resume_feedback = analyze_resume(resume_uid)
    return resume_feedback

