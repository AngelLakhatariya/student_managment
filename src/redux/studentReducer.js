import * as T from "./actionTypes";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case T.FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case T.FETCH_STUDENTS_SUCCESS:
      return { ...state, loading: false, students: action.payload };
    case T.FETCH_STUDENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case T.ADD_STUDENT_SUCCESS:
      return { ...state, students: [...state.students, action.payload] };
    case T.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map((s) => (s.id === action.payload.id ? action.payload : s)),
      };
    case T.DELETE_STUDENT_SUCCESS:
      return { ...state, students: state.students.filter((s) => s.id !== action.payload) };
    case T.STUDENT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
