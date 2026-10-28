import * as T from "./actionTypes";

const API = "http://localhost:5000";

export const fetchStudentsRequest = () => ({ type: T.FETCH_STUDENTS_REQUEST });
export const fetchStudentsSuccess = (students) => ({ type: T.FETCH_STUDENTS_SUCCESS, payload: students });
export const fetchStudentsFailure = (error) => ({ type: T.FETCH_STUDENTS_FAILURE, payload: error });
export const addStudentSuccess = (student) => ({ type: T.ADD_STUDENT_SUCCESS, payload: student });
export const updateStudentSuccess = (student) => ({ type: T.UPDATE_STUDENT_SUCCESS, payload: student });
export const deleteStudentSuccess = (id) => ({ type: T.DELETE_STUDENT_SUCCESS, payload: id });
export const studentError = (error) => ({ type: T.STUDENT_ERROR, payload: error });

export const fetchStudents = () => async (dispatch) => {
  dispatch(fetchStudentsRequest());
  try {
    const res = await fetch(`${API}/students`);
    if (!res.ok) throw new Error("Failed to fetch students");
    const data = await res.json();
    dispatch(fetchStudentsSuccess(data));
  } catch (err) {
    dispatch(fetchStudentsFailure(err.message));
  }
};

export const addStudent = (student) => async (dispatch) => {
  try {
    const res = await fetch(`${API}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!res.ok) throw new Error("Failed to add student");
    const data = await res.json();
    dispatch(addStudentSuccess(data));
    return data;
  } catch (err) {
    dispatch(studentError(err.message));
    throw err;
  }
};

export const updateStudent = (id, student) => async (dispatch) => {
  try {
    const res = await fetch(`${API}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!res.ok) throw new Error("Failed to update student");
    const data = await res.json();
    dispatch(updateStudentSuccess(data));
    return data;
  } catch (err) {
    dispatch(studentError(err.message));
    throw err;
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${API}/students/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete student");
    dispatch(deleteStudentSuccess(id));
  } catch (err) {
    dispatch(studentError(err.message));
    throw err;
  }
};
