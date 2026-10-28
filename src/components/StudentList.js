import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents } from "../redux/studentActions";

const TABS = ["All", "Class Exam", "Online Exam", "Missed Exam"];

export default function StudentList() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const user = useSelector((state) => state.auth.user);

  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [classFilter, setClassFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = useMemo(
    () => ["All", ...Array.from(new Set(students.map((s) => s.class)))],
    [students]
  );

  const visible = useMemo(() => {
    let list = [...students];
    if (tab !== "All") list = list.filter((s) => s.examType === tab);
    if (classFilter !== "All") list = list.filter((s) => s.class === classFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.subject?.toLowerCase().includes(q));
    }
    list.sort((a, b) =>
      sortBy === "name" ? a.name.localeCompare(b.name) : Number(a.rollNumber) - Number(b.rollNumber)
    );
    return list;
  }, [students, tab, classFilter, search, sortBy]);

  const uniqueSubjects = new Set(students.map((s) => s.subject)).size;

  return (
    <div className="page-bg">
      <div className="container">
        <div className="dashboard-card">
          {/* ---------- purple header ---------- */}
          <div className="dash-header d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={user?.image} alt="" className="avatar-lg me-3" />
              <div>
                <h4 className="mb-0 fw-bold">{user?.name}</h4>
                <small className="opacity-75">{user?.school}</small>
              </div>
            </div>
            <div className="d-flex gap-4 text-center mt-3 mt-md-0">
              <div><div className="fw-bold fs-5">{students.length}</div><small>Students</small></div>
              <div><div className="fw-bold fs-5">{String(uniqueSubjects).padStart(2, "0")}</div><small>Subjects</small></div>
              <div><div className="fw-bold fs-5">{students.length}</div><small>Exams</small></div>
            </div>
          </div>

          {/* ---------- toolbar ---------- */}
          <div className="p-3 p-md-4 bg-light-gray d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <Link to="/add" className="btn btn-primary-pill">+ ADD NOW</Link>
            <div className="d-flex flex-wrap gap-2">
              <select className="form-select form-select-sm rounded-pill" value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="roll">Sort by Roll No.</option>
              </select>
              <select className="form-select form-select-sm rounded-pill" value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}>
                {classes.map((c) => (
                  <option key={c} value={c}>{c === "All" ? "All Classes" : `Class ${c}`}</option>
                ))}
              </select>
              <input className="form-control form-control-sm rounded-pill" placeholder="🔍 Search"
                     value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {/* ---------- tabs ---------- */}
          <div className="px-4 pt-3 d-flex gap-4 flex-wrap">
            {TABS.map((t) => (
              <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          {/* ---------- table ---------- */}
          <div className="p-3 p-md-4">
            {loading && <p className="text-center text-muted">Loading students...</p>}
            {error && (
              <div className="alert alert-danger">
                {error} — is json-server running on port 5000?
              </div>
            )}
            {!loading && !error && visible.length === 0 && <p className="text-center text-muted">No students found.</p>}

            {visible.length > 0 && (
              <div className="table-responsive">
                <table className="table align-middle student-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Roll No.</th><th>Subject</th>
                      <th>Marks Scored</th><th>Type of Exam</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={s.image} alt="" className="avatar-sm me-2" />
                            <div>
                              <Link to={`/students/${s.id}`} className="student-name">{s.name}</Link>
                              <div className="text-muted tiny">{s.grade}</div>
                            </div>
                          </div>
                        </td>
                        <td>{s.rollNumber}</td>
                        <td>{s.subject}</td>
                        <td>{s.marks} / 100</td>
                        <td className={s.examType === "Missed Exam" ? "text-danger" : ""}>{s.examType}</td>
                        <td><Link to={`/students/${s.id}`} className="edit-link">Edit</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
