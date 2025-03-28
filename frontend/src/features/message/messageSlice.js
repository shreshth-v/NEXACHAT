import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiClient, apiClientFileUpload } from "../../utils/apiClient";

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (messageData, { getState, rejectWithValue }) => {
    try {
      const activeChatId = getState().chat.activeChat._id;
      const response = await apiClientFileUpload.post(
        `/message/${activeChatId}`,
        messageData
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (_, { getState, rejectWithValue }) => {
    try {
      const activeChatId = getState().chat.activeChat._id;
      const response = await apiClient.get(`/message/${activeChatId}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const sendMessageToAi = createAsyncThunk(
  "message/sendMessageToAi",
  async (text, { getState, rejectWithValue }) => {
    try {
      const activeChatId = getState().chat.activeChat._id;
      const response = await apiClient.post(`/message/ai/${activeChatId}`, {
        text,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  activeChatMessages: [],
  isSendingMessage: false,
  isGettingMessages: false,
  isSendingMessageToAi: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    removeActiveChatMessages: (state) => {
      state.activeChatMessages = [];
    },
    addToActiveChatMessages: (state, action) => {
      state.activeChatMessages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      // send message
      .addCase(sendMessage.pending, (state, action) => {
        state.isSendingMessage = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSendingMessage = false;
        state.activeChatMessages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.error = action.payload;
      })

      // get messages
      .addCase(getMessages.pending, (state, action) => {
        state.isGettingMessages = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isGettingMessages = false;
        state.activeChatMessages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isGettingMessages = false;
        state.error = action.payload;
      })

      // send message to Ai
      .addCase(sendMessageToAi.pending, (state, action) => {
        state.isSendingMessageToAi = true;
      })
      .addCase(sendMessageToAi.fulfilled, (state, action) => {
        state.isSendingMessageToAi = false;
        state.activeChatMessages.push(action.payload);
      })
      .addCase(sendMessageToAi.rejected, (state, action) => {
        state.isSendingMessageToAi = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { removeActiveChatMessages, addToActiveChatMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
