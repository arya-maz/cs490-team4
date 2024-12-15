import re
from collections import Counter
from nltk.corpus import stopwords
import openai
import ssl
import nltk

try:
    _create_unverified_https_context = ssl._create_unverified_context # bypass SSL certificate to run stopwords
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('stopwords')
STOPWORDS = set(stopwords.words('english'))

openai.api_key = "KEY"  # replace with actual key

def tokenize_and_normalize(text, stopwords=None):
    if not text:  # empty input case
        return []
    text = text.lower()  # converting to lowercase
    text = re.sub(r'[^\w\s]', '', text)  # removing punctuation
    tokens = text.split()  # splitting into token words

    if stopwords:
        tokens = [word for word in tokens if word not in stopwords]

    return tokens

def calculate_fit_score(resume_text, job_description, stopwords=None):
    if not resume_text or not job_description:  # empty input case
        return 0
    try:
        resume_tokens = tokenize_and_normalize(resume_text, stopwords) # tokenize resume and description
        job_tokens = tokenize_and_normalize(job_description, stopwords)

        resume_counter = Counter(resume_tokens) # count token occurences
        job_counter = Counter(job_tokens)

        matched_keywords = sum((resume_counter & job_counter).values()) # how many tokens match
        total_keywords = len(job_tokens)

        if total_keywords == 0:
            return 0

        fit_score = (matched_keywords / total_keywords) * 100 # percentage of matches
        return round(fit_score, 2)
    except Exception as e:
        print(f"Error calculating fit score: {e}")
        return 0

def identify_missing_keywords(resume_text, job_description, stopwords=None):
    resume_tokens = set(tokenize_and_normalize(resume_text, stopwords))
    job_tokens = set(tokenize_and_normalize(job_description, stopwords))
    missing_keywords = list(job_tokens - resume_tokens)  # keywords missing from the resume
    return missing_keywords

def generate_feedback(missing_keywords):
    """
    Generates actionable feedback using OpenAI API based on missing keywords.
    """
    if not missing_keywords:
        return []

    prompt = (
        f"The following keywords are missing from the resume: {', '.join(missing_keywords)}. "
        "Provide actionable suggestions for including these skills or experiences in the resume."
    )

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        suggestions = response['choices'][0]['text'].strip().split("\n")
        return suggestions
    except Exception as e:
        print(f"Error generating feedback: {e}")
        return []

def provide_resume_feedback(resume_text, job_description, stopwords=None):
    """
    Combines missing keyword identification and OpenAI-powered feedback generation.
    """
    missing_keywords = identify_missing_keywords(resume_text, job_description, stopwords)
    suggestions = generate_feedback(missing_keywords)
    return {
        "missing_keywords": missing_keywords,
        "suggestions": suggestions
    }