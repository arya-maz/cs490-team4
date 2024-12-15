import pytest
from backend.resume_description_compare.compare import calculate_fit_score

def test_basic_match():
    resume = "Experienced software engineer with Python and Java skills."
    job = "Looking for a software engineer with experience in Python, C, Java, and SQL."
    score = calculate_fit_score(resume, job)
    assert score > 0  # make sure theres some match
    assert score < 100  # make sure its not a perfect match

def test_perfect_match():
    resume = "Python C C# Java React SQL"
    job = "Python C C# Java React SQL"
    score = calculate_fit_score(resume, job)
    assert score == 100

def test_no_match():
    resume = "Visual Basic Mango DB"
    job = "Python C C# Java React SQL"
    score = calculate_fit_score(resume, job)
    assert score == 0

def test_empty_input():
    resume = ""
    job = "Python C C# Java React SQL"
    score = calculate_fit_score(resume, job)
    assert score == 0

    resume = "Python C C# Java React SQL"
    job = ""
    score = calculate_fit_score(resume, job)
    assert score == 0

    resume = ""
    job = ""
    score = calculate_fit_score(resume, job)
    assert score == 0