import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchSendApplication = createAsyncThunk("/fetch/employee/send", async (params) => {
    const { data } = await axios.post("/employee/send", params);
    return data;
});


export const fetchAllApplication = createAsyncThunk("/fetch/employee/application/all", async () => {
    const { data } = await axios.get("/employee/application/all");
    
    return data;
});




// Начальное состояние
const initialState = {
    applications: null,
    status: "idle", // Можно использовать "idle", "loading", "succeeded", "failed"
    error: null,
  };
  

const applicationsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSendApplication.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchSendApplication.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.applications = action.payload;
        })
        .addCase(fetchSendApplication.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchAllApplication.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchAllApplication.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.applications = action.payload;
        })
        .addCase(fetchAllApplication.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})


export const applicationsReducer = applicationsSlice.reducer