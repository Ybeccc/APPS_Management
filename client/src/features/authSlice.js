import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Async thunk for logging in the user
export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
            usrUsername: user.usrUsername,
            usrPassword: user.usrPassword
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Corrected async thunk for getting user session (Me endpoint)
export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:3001/me", {
            withCredentials: true // Ensures cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return rejectWithValue(message);
        }
    }
});

// Async thunk for logging out the user
export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await axios.delete('http://localhost:3001/logout', {
        withCredentials: true
    });
});

// Auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            console.log("auth/reset triggered"); // Debug log
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            console.log("LoginUser fulfilled"); // Debug log
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            console.log("getMe fulfilled"); // Debug log
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message || "An unexpected error occurred.";
        });

        builder.addCase(LogOut.fulfilled, (state) => {
            state.user = null;
            state.isSuccess = false;
            state.isError = false;
            state.message = "Logged out successfully";
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;