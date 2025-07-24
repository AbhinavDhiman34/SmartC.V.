from typing import Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import numpy as np

from .utils import clean_text, extract_keywords_and_entities, experience_score
from .parser import extract_sections

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

default_weights = {
    'skills': 0.4,
    'experience': 0.3,
    'summary': 0.15,
    'education': 0.05,
    'projects': 0.05,
    'certifications': 0.025,
    'awards': 0.025
}

def section_weighted_scoring(resume_sections: dict, jd_text: str, weights: Optional[dict] = None):
    if weights is None:
        weights = default_weights
    known_sections = set(weights.keys())
    details = {}
    total_score = 0
    jd_keywords, _ = extract_keywords_and_entities(jd_text)
    n_jd_keywords = len(jd_keywords) + 1e-8

    for sec in known_sections:
        if sec in resume_sections:
            section_text = resume_sections[sec]
            section_keywords, _ = extract_keywords_and_entities(section_text)
            matched = section_keywords & jd_keywords
            section_score = len(matched) / n_jd_keywords
            total_score += section_score * weights[sec]
            details[sec] = {
                'score': int(section_score * 100),
                'matched_keywords': list(matched),
                'missing_keywords': list(jd_keywords - section_keywords)
            }
        else:
            details[sec] = {'score': 0, 'matched_keywords': [], 'missing_keywords': list(jd_keywords)}
    return int(total_score * 100), details

def ats_friendly_format_check(resume_text: str) -> list:
    issues = []
    words = resume_text.split()
    if len(words) < 100:
        issues.append("Resume appears too short; consider adding more details.")
    if len(words) > 3000:
        issues.append("Resume appears very long; trimming may improve ATS processing.")
    return issues

def score_resume(
    resume_text_raw: str,
    jd_text_raw: str,
    weights: Optional[dict] = None,
    role: Optional[str] = None
) -> dict:
    weights = weights or default_weights
    resume_text = clean_text(resume_text_raw)
    jd_text = clean_text(jd_text_raw)
    resume_sections = extract_sections(resume_text_raw)

    section_score, section_details = section_weighted_scoring(resume_sections, jd_text, weights)

    # Text similarity scores
    tfidf_vect = TfidfVectorizer().fit([resume_text, jd_text])
    tfidf_sim = cosine_similarity(tfidf_vect.transform([resume_text]), tfidf_vect.transform([jd_text]))[0, 0]
    emb_resume = embedding_model.encode([resume_text])[0]
    emb_jd = embedding_model.encode([jd_text])[0]
    sem_sim = np.dot(emb_resume, emb_jd) / (np.linalg.norm(emb_resume) * np.linalg.norm(emb_jd))
    combined_text_sim = 0.5 * tfidf_sim + 0.5 * sem_sim

    exp_score = experience_score(resume_text_raw, jd_text_raw)

    ats_score = (
        section_score * 0.4 +
        combined_text_sim * 100 * 0.4 +
        exp_score * 100 * 0.2
    )
    ats_score = int(min(ats_score, 100))

    jd_keywords, _ = extract_keywords_and_entities(jd_text)
    resume_keywords, _ = extract_keywords_and_entities(resume_text)
    missing_keywords = list(jd_keywords - resume_keywords)
    keyword_match_pct = int((len(jd_keywords) - len(missing_keywords)) / (len(jd_keywords) + 1e-8) * 100) if jd_keywords else 0

    format_issues = ats_friendly_format_check(resume_text_raw)

    # Section feedback: Only show once per main section
    primary_sections = ['skills', 'experience', 'projects']
    already_reported = set()
    section_feedback = []
    for sec in primary_sections:
        if sec in section_details and section_details[sec]['missing_keywords']:
            to_report = set(section_details[sec]['missing_keywords']) - already_reported
            if to_report:
                section_feedback.append(
                    f"Consider mentioning these in your '{sec}' section: {', '.join(list(to_report)[:5])}"
                )
                already_reported |= to_report

    suggestions = [
        f"Your ATS score is {ats_score}. Aim for at least 80 for better chances.",
        f"Keyword match percentage: {keyword_match_pct}%",
        "Formatting issues: " + (", ".join(format_issues) if format_issues else "None"),
        "Consider emphasizing relevant skills and projects in the Skills and Experience sections.",
        "Make sure your resume format is ATS-friendly (avoid unnecessary images or decorations)."
    ]
    if exp_score < 1.0:
        if exp_score == 0:
            suggestions.append("No matching experience duration detected in your resume. If you have relevant experience, state it clearly (e.g. 'Intern at X, 3 months').")
        else:
            suggestions.append("Your experience duration seems less than required; mention your work duration more clearly.")

    return {
        "ats_score": ats_score,
        "keyword_match_percentage": keyword_match_pct,
        "format_issues": format_issues,
        "section_feedback": section_feedback,
        "suggestions": suggestions,
        "sections_detail": section_details,
    }
