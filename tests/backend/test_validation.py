import pytest
from backend.standard_input_output.validation import validate_input

def test_valid_input():
    valid_data = {
        "resume_text": "This is a valid resume.",
        "job_description": "This is a valid job description."
    }
    assert validate_input(valid_data) == True

def test_invalid_input_missing_field():
    invalid_data = {
        "resume_text": "This is a valid resume."
    }
    result = validate_input(invalid_data)
    assert "job_description" in result["error"][0]["loc"]

def test_invalid_input_exceeds_limit():
    invalid_data = {
        "resume_text": "x" * 10001,  # 10,001 characters
        "job_description": "This is valid."
    }
    result = validate_input(invalid_data)
    
    # Check that the error message matches the expected output
    error_message = result["error"][0]["msg"]
    assert error_message == "String should have at most 10000 characters"