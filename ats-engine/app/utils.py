import re
import spacy

nlp = spacy.load('en_core_web_sm')

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

def extract_keywords_and_entities(text: str):
    doc = nlp(text)
    keywords = set(token.lemma_ for token in doc if token.is_alpha and not token.is_stop)
    # Use only basic NER; in practice, customize for skills
    entities = set(ent.text.lower() for ent in doc.ents)
    return keywords, entities

def detect_experience(text: str) -> int:
    exp_matches = re.findall(r'(\d+)\+?\s+years?', text.lower())
    if exp_matches:
        return max([int(e) for e in exp_matches])
    if re.search(r'\bsenior\b', text):
        return 5
    if re.search(r'\bjunior\b', text):
        return 1
    if re.search(r'\bintern\b', text) or re.search(r'\bstudent\b', text):
        return 0
    return 0

def experience_score(resume_text: str, jd_text: str) -> float:
    resume_exp = detect_experience(resume_text)
    jd_exp = detect_experience(jd_text)
    if jd_exp == 0:
        return 1.0
    elif resume_exp >= jd_exp:
        return 1.0
    elif resume_exp > 0:
        return resume_exp / jd_exp
    else:
        return 0.0
