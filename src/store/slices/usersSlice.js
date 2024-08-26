import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersLoading: (state) => {
      state.loading = "loading";
    },

    fetchUsersSuccess: (state, action) => {
      state.loading = "idle";
      state.users = action.payload;
    },

    fetchUsersFailure: (state, action) => {
      state.loading = "failure";
      state.error = action.payload;
    },
  },
});

export const { fetchUsersLoading, fetchUsersSuccess, fetchUsersFailure } =
  usersSlice.actions;

export default usersSlice.reducer;
