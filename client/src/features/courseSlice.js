import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(course => course._id !== action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourses,
  addCourse,
  removeCourse,
  updateCourse,
  setSelectedCourse,
  setLoading,
  setError,
} = courseSlice.actions;
export default courseSlice.reducer;