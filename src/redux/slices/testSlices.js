import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchTest = createAsyncThunk("/test/fetchTest", async(params)=>{
    const {data} = await axios.post("/test", params);
    console.log(params)
    return data;
})

const initialState = {
    message: null,
    status: 'idle',
    error: null,
  };

const testSlice = createSlice({
    name :"testMessage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchTest.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(fetchTest.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.message = action.payload;
          })
          .addCase(fetchTest.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
})

export const testReducer =  testSlice.reducer;