import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiClient, apiClientFileUpload } from "../../utils/apiClient";
import { connectSocket, disconnectSocket } from "../../utils/socket";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClientFileUpload.post("/auth/signup", formData);
      toast.success("User registered successfully!");
      connectSocket(response.data._id);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", formData);
      toast.success("Login successful!");
      connectSocket(response.data._id);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/check");
      connectSocket(response.data._id);
      return response.data;
    } catch (error) {
      //   toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/logout");
      toast.success(response?.data?.message);
      disconnectSocket();
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClientFileUpload.patch(
        "/auth/profile",
        formData
      );
      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  authUser: null,
  onlineUsers: [],
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state, action) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        state.error = action.payload;
      })

      // login
      .addCase(login.pending, (state, action) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload;
      })

      // checkAuth
      .addCase(checkAuth.pending, (state, action) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.error = action.payload;
      })

      // logout
      .addCase(logout.pending, (state, action) => {
        state.isLoggingOut = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggingOut = false;
        state.authUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload;
      })

      // update profile
      .addCase(updateProfile.pending, (state, action) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setOnlineUsers } = authSlice.actions;

export default authSlice.reducer;
