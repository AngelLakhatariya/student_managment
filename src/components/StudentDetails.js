import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudents, updateStudent, deleteStudent } from "../redux/studentActions";

export default function StudentDetails() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading } = useSelector((state) => state.students);
  const student = students.find((s) => String(s.id) === String(id));

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (students.length === 0) dispatch(fetchStudents());
  }, [dispatch, students.length]);

  useEffect(() => {
    if (student) setForm(student);
  }, [student]);

  if (loading || (!student && students.length === 0)) return <div className="page-bg container">Loading...</div>;
  if (!student || !form) return <div className="page-bg container">Student not found.</div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(
        updateStudent(student.id, {
          ...form,
          rollNumber: Number(form.rollNumber),
          age: Number(form.age),
          marks: Number(form.marks),
        })
      );
      setMessage("Student updated successfully ✔");
      setTimeout(() => setMessage(""), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!window.confirm(`Delete ${student.name}?`)) return;
    await dispatch(deleteStudent(student.id));
    navigate("/");
  };

  const input = (label, name, type = "text", col = "col-md-6") => (
    <div className={col}>
      <label className="form-label small fw-semibold">{label}</label>
      <input type={type} name={name} value={form[name] ?? ""} onChange={handleChange} className="form-control" required />
    </div>
  );

  return (
    <div className="page-bg">
      <div className="container" style={{ maxWidth: 800 }}>
        <form className="card-surface p-4" onSubmit={handleUpdateStudent}>
          <div className="d-flex align-items-center mb-4">
            <img src={form.image} alt="" className="avatar-lg me-3" />
            <div>
              <h4 className="fw-bold mb-0">{student.name}</h4>
              <small className="text-muted">Roll No. {student.rollNumber} · {student.grade}</small>
            </div>
          </div>

          {message && <div className="alert alert-success py-2">{message}</div>}

          <div className="row g-3">
            {input("Name", "name")}
            {input("Roll Number", "rollNumber", "number")}
            {input("Phone", "phone", "tel")}
            {input("Email", "email", "email")}
            {input("Age", "age", "number", "col-md-4")}
            {input("Class", "class", "text", "col-md-4")}
            {input("Grade", "grade", "text", "col-md-4")}
            {input("Subject", "subject")}
            {input("Marks", "marks", "number")}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Type of Exam</label>
              <select name="examType" className="form-select" value={form.examType} onChange={handleChange}>
                <option>Class Exam</option>
                <option>Online Exam</option>
                <option>Missed Exam</option>
              </select>
            </div>
            {input("Image URL", "image")}
          </div>

          <div className="mt-4 d-flex gap-2 flex-wrap">
            <button type="submit" className="btn btn-primary-pill" disabled={saving}>
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
            <button type="button" className="btn btn-outline-danger rounded-pill" onClick={handleDeleteStudent}>
              Delete
            </button>
            <button type="button" className="btn btn-outline-secondary rounded-pill ms-auto" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
