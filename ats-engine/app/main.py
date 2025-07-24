from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from app.parser import extract_text_from_pdf, extract_text_from_docx
from app.scoring import score_resume
import tempfile, os

app = FastAPI(title="ATS Engine")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict on prod to your frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ats/score")
async def ats_score_endpoint(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    suffix = resume.filename.split('.')[-1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{suffix}") as temp_file:
        temp_file.write(await resume.read())
        temp_file.flush()
        if suffix.lower() == "pdf":
            resume_text = extract_text_from_pdf(temp_file.name)
        elif suffix.lower() == "docx":
            resume_text = extract_text_from_docx(temp_file.name)
        else:
            os.remove(temp_file.name)
            return {"error": "Unsupported file type"}
    os.remove(temp_file.name)
    result = score_resume(resume_text, job_description)
    return result
