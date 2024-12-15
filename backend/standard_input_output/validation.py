from pydantic import BaseModel, ValidationError, constr


class InputSchema(BaseModel):
    resume_text: constr(max_length=10000)
    job_description: constr(max_length=10000)


def validate_input(data: dict):
    try:
        # Attempt to validate the data against the schema
        InputSchema(**data)
        return True
    except ValidationError as e:
        # Return the errors from the exception instance
        return {"error": e.errors()}
