import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

// Асинхронные экшены
export const fetchRegister = createAsyncThunk("/test/fetchTest", async (params) => {
  const { data } = await axios.post("/user/registry", params);
  return data;
});

export const fetchUserMe = createAsyncThunk("/user/fetchUserMe", async () => {
  const { data } = await axios.get("/user/auth/me");
  console.log("получаю данные");
  return data;
});

export const fetchAuth = createAsyncThunk("/user/fetchauth", async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/user/login", params);

    if (data?.token) {
      window.localStorage.setItem('token', data.token);
      return data;
    } else {
      return rejectWithValue("Authentication failed: no token received.");
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed.");
  }
});

// Начальное состояние
const initialState = {
  user: null,
  status: "idle", // Можно использовать "idle", "loading", "succeeded", "failed"
  error: null,
};

// Слайс
const userSlice = createSlice({
  name: "user",
  initialState,
  // userSlice.js
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Экшен авторизации
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Экшен получения данных пользователя
      .addCase(fetchUserMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
// ✅ Экспорт actions
export const { logout } = userSlice.actions;