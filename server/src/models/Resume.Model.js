import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String },
  description: { type: String, required: true },
});

const socialLinksSchema = new mongoose.Schema({
  linkedin: { type: String },
  github: { type: String },
  portfolio: { type: String },
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [String],
    projects: [projectSchema],
    certifications: [String],
    socialLinks: socialLinksSchema,
    theme: {
      type: String,
      default: "default",
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
