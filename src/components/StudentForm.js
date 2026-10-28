import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../redux/studentActions";

const empty = {
  name: "", rollNumber: "", phone: "", email: "", age: "",
  class: "", grade: "", image: "", subject: "", marks: "", examType: "Class Exam",
};

export default function StudentForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.rollNumber) e.rollNumber = "Roll number is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Phone must be 10 digits";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.age || form.age < 3 || form.age > 25) e.age = "Enter a valid age";
    if (!form.class.trim()) e.class = "Class is required";
    if (!form.grade.trim()) e.grade = "Grade is required";
    if (form.marks !== "" && (form.marks < 0 || form.marks > 100)) e.marks = "Marks must be 0–100";
    return e;
  };

  const handleAddStudent = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSaving(true);
    try {
      await dispatch(
        addStudent({
          ...form,
          rollNumber: Number(form.rollNumber),
          age: Number(form.age),
          marks: Number(form.marks || 0),
          image: form.image || `https://i.pravatar.cc/100?u=${encodeURIComponent(form.email)}`,
        })
      );
      navigate("/");
    } catch {
      setSaving(false);
    }
  };

  const field = (label, name, type = "text", col = "col-md-6") => (
    <div className={col}>
      <label className="form-label small fw-semibold">{label}</label>
      <input type={type} name={name} value={form[name]} onChange={handleChange}
             className={`form-control ${errors[name] ? "is-invalid" : ""}`} />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );

  return (
    <div className="page-bg">
      <div className="container" style={{ maxWidth: 800 }}>
        <form className="card-surface p-4" onSubmit={handleAddStudent} noValidate>
          <h4 className="fw-bold mb-4">Add New Student</h4>
          <div className="row g-3">
            {field("Student's Name", "name")}
            {field("Roll Number", "rollNumber", "number")}
            {field("Phone", "phone", "tel")}
            {field("Email", "email", "email")}
            {field("Age", "age", "number", "col-md-4")}
            {field("Class (e.g. 3A)", "class", "text", "col-md-4")}
            {field("Grade (e.g. Grade 3)", "grade", "text", "col-md-4")}
            {field("Subject", "subject")}
            {field("Marks Scored (out of 100)", "marks", "number")}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Type of Exam</label>
              <select name="examType" className="form-select" value={form.examType} onChange={handleChange}>
                <option>Class Exam</option>
                <option>Online Exam</option>
                <option>Missed Exam</option>
              </select>
            </div>
            {field("Image URL (optional)", "image")}
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary-pill" disabled={saving}>
              {saving ? "SAVING..." : "ADD NOW"}
            </button>
            <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
