import os

from pydantic import BaseModel
# import openai
from dotenv import load_dotenv
from backend.models.storage import TempStorage
from typing import List
import google.generativeai as genai


class ResumeAnalyzerPayload(BaseModel):
    uid: str


class ResumeAnalyzerResult(BaseModel):
    fit_score: int
    feedback: List[str]


def analyze_resume(resume_uid: ResumeAnalyzerPayload):
    temp_storage = TempStorage()
    resume_storage = temp_storage.read(resume_uid.uid)
    load_dotenv()
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(f'''You are an expert resume reviewer. Your job is to provide feedback to the provided resume in the format: "
                                          "<feedback-point-1>,<feedback-point-2>,<feedback-point-n>"
                                          "The resume feedback points need to be one sentence bullet points, comma separated. I will give a resume and a job description, and then you will have to analyze it and provide a fit score for the job on the from 0 to 100. After finishin the bullet points, on the new line write score out of 100. The fit score should be in the format:<score>"
                                          "The feedback should also be provided with the words you, to specify that you are talking to a person. Focus on matching skills, experience, and education to the job description."
                                          resume text: {resume_storage.get("resume_text")} job description: {resume_storage.get("job_description")}''')

    return parse_ai_response(response.text)


    # openai.my_api_key = os.getenv("OPEN_AI_KEY")
    # client = openai.OpenAI()
    #
    # completion = client.chat.completions.create(
    #     model="gpt-4o",
    #     messages=[
    #         {"role": "system", "content": "You are an expert resume reviewer. Your job is to provide feedback on the provided resume in the format: "
    #                                       "Feedback:"
    #                                       "<feedback-point-1>"
    #                                       "<feedback-point-2>"
    #                                       "<feedback-point-n>"
    #                                       "I will give a resume and a job description, and then you will have to analyze it and provide a fit score for the job on the from 0 to 100. The fit score should be in the format:"
    #                                       "Score:"
    #                                       "<score>"
    #                                       "The feedback should also be provided with the words you, to specify that you are talking to a person. Focus on matching skills, experience, and education to the job description."},
    #         {"role": "user", "content": "Job Description:"
    #                                     f"{resume_storage.get('resume_text')}"
    #                                     "Resume:"
    #                                     f"{resume_storage.get('job_description')}"
    #                                     ""}
    #     ]
    # )
    #
    # feedback = completion['choices'][0]['message']['content']
    # return parse_ai_response(feedback)


def parse_ai_response(ai_response):
    split_response = ai_response.split('\n')
    feedback_points = split_response[0]
    feedback = feedback_points.split('.')
    stripped_points = []
    for point in feedback:
        stripped_points.append(point.strip())
    score = split_response[2]
    return ResumeAnalyzerResult(feedback=stripped_points, fit_score=score)
