import pytest
from backend.resume_description_compare.compare import provide_resume_feedback, identify_missing_keywords

def test_missing_keywords():
    resume = "Experienced software engineer with Python and Java skills."
    job = "Looking for a software engineer with experience in Python, AWS, and REST APIs."
    missing = identify_missing_keywords(resume, job)
    assert "aws" in missing
    assert "rest" in missing
    assert "apis" in missing

def test_no_missing_keywords():
    resume = "Python AWS REST APIs"
    job = "Python AWS REST APIs"
    feedback = provide_resume_feedback(resume, job)
    assert feedback["missing_keywords"] == []
    assert feedback["suggestions"] == []

def test_empty_inputs():
    resume = ""
    job = "Python AWS REST APIs"
    feedback = provide_resume_feedback(resume, job)
    assert "python" in feedback["missing_keywords"]

    resume = "Python AWS REST APIs"
    job = ""
    feedback = provide_resume_feedback(resume, job)
    assert feedback["missing_keywords"] == []