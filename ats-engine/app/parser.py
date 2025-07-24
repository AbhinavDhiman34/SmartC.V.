import pdfplumber
from docx import Document
import re

def extract_text_from_pdf(file_path: str) -> str:
    try:
        with pdfplumber.open(file_path) as pdf:
            text = ''.join(page.extract_text() or '' for page in pdf.pages)
        return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""

def extract_text_from_docx(file_path: str) -> str:
    try:
        doc = Document(file_path)
        return '\n'.join(p.text for p in doc.paragraphs)
    except Exception as e:
        print(f"Error parsing DOCX: {e}")
        return ""

def extract_sections(text: str) -> dict:
    # Robust section extraction, covers inline headers like "Skills: <content>"
    section_patterns = {
        'skills': re.compile(r'^\s*(skills?|technical skills?|key skills)[\s:–-]*', re.I),
        'experience': re.compile(r'^\s*(work experience|professional experience|experience|employment history)[\s:–-]*', re.I),
        'summary': re.compile(r'^\s*(summary|professional summary|profile|objective)[\s:–-]*', re.I),
        'education': re.compile(r'^\s*(education|academic background|academics)[\s:–-]*', re.I),
        'projects': re.compile(r'^\s*(projects?|personal projects|key projects|notable projects)[\s:–-]*', re.I),
        'certifications': re.compile(r'^\s*(certifications?|licenses?|accreditations)[\s:–-]*', re.I),
        'awards': re.compile(r'^\s*(awards?|achievements|honors?)[\s:–-]*', re.I)
    }
    sections = {}
    current_section = None
    for line in text.splitlines():
        stripped = line.strip()
        matched = False
        for cname, pattern in section_patterns.items():
            match = pattern.match(stripped)
            if match:
                current_section = cname
                if current_section not in sections:
                    sections[current_section] = ""
                after = stripped[match.end():].strip(":-• \t")
                if after:
                    sections[current_section] += after + "\n"
                matched = True
                break
        if not matched:
            if current_section:
                sections[current_section] += line + "\n"
            else:
                sections.setdefault('other', "")
                sections['other'] += line + "\n"
    for sec in list(sections.keys()):
        trimmed = sections[sec].strip()
        if trimmed:
            sections[sec] = trimmed
        else:
            sections.pop(sec)
    return sections
