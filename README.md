# SmartCV 📄

**🚀 AI-Powered CV Builder & ATS Optimization Tool**

A modern, open-source platform for crafting **professional CVs** and **resumes** with built-in **Applicant Tracking System (ATS)** scoring. Designed for job seekers, academics, and professionals seeking to optimize their applications for global opportunities.

👉 **Formerly known as SmartResume**

---

## 🌟 Key Features

### 📝 Multi-Format CV Builder

- **Drag-and-Drop Editor** with real-time previews
- **20+ Templates** (US Resume, EU CV, Academic CV formats)
- **Region-Specific Guidance** (Auto-formatting for target countries)

### 🧠 ATS Score Optimizer

- **AI-Powered Analysis** (Python NLP engine)
- **Keyword Gap Identification**
- **Score Breakdown** (Experience, Skills, Education matching)

### 🎯 Professional Tools

- **One-Click PDF Export**
- **Version History**
- **JWT Authentication**
- **Multi-Page CV Support**

---

## 🧱 Tech Stack

| Layer          | Technologies Used                     |
| -------------- | ------------------------------------- |
| **Frontend**   | React.js, Tailwind CSS, Formik        |
| **Backend**    | Node.js, Express.js                   |
| **Database**   | MongoDB (Atlas)                       |
| **ATS Engine** | Python (FastAPI), spaCy, scikit-learn |
| **Hosting**    | Vercel (FE), Railway (BE)             |

---

## 🔍 Why SmartCV?

**CVs vs. Resumes:**  
This tool supports both formats with smart defaults:

- **Resumes** (1-page, US-focused)
- **CVs** (Multi-page, academic/global use)

**Key Improvements from SmartResume v1:**  
✅ Expanded academic sections (Publications, Research Experience)  
✅ Improved ATS scoring for international formats  
✅ Dedicated EU CV template with photo support

---

## � How the ATS Checker Works

1. **Upload** your CV/Resume (PDF/DOCX) or build one in-app
2. **Paste** the target job description
3. **AI Analysis**:
   - Text extraction using OCR (if needed)
   - Keyword/skill matching via cosine similarity
   - Experience validation
4. **Get Results**:
   - 📊 **ATS Score** (0-100)
   - 🔍 **Missing Keywords**
   - 💡 **Actionable Suggestions**

> The scoring engine is built with Python and uses NLP libraries like spaCy, scikit-learn, and sentence-transformers.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- MongoDB (Local or Atlas)

### Project Structure

```
smartcv/
├── client/           # React Frontend
├── server/           # Express Backend
├── ats-engine/       # Python NLP Service
├── shared/           # Templates & Configs
└── README.md
```

### Installation

```bash
git clone https://github.com/your-username/smartcv.git
cd smartcv

# Frontend
cd client && npm install

# Backend
cd ../server && npm install

# ATS Engine
cd ../ats-engine && pip install -r requirements.txt
```

## 🤝 How to Contribute

We welcome contributions! Please read:

- [📜 Code of Conduct](https://github.com/AbhinavDhiman34/SmartCV/blob/896071696d7e2113f3c543645b262206da69cd16/CODE_OF_CONDUCT.md)
- [🛠️ Contributing Guidelines](https://github.com/AbhinavDhiman34/SmartCV/blob/896071696d7e2113f3c543645b262206da69cd16/CONTRIBUTING.md)

Before submitting issues/PRs:

1. Check existing [issues](https://github.com/AbhinavDhiman34/SmartCV/issues)
2. Follow our [branching model](https://github.com/AbhinavDhiman34/SmartCV/issues)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<p align="center">
  <a href="#top" style="font-size: 18px; padding: 8px 16px; display: inline-block; border: 1px solid #ccc; border-radius: 6px; text-decoration: none;">
    ⬆️ Back to Top
  </a>
</p>
