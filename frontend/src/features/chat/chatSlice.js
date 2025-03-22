import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiClient, apiClientFileUpload } from "../../utils/apiClient";
import { sendMessage } from "../message/messageSlice";

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (otherUserId, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/chat", { otherUserId });
      toast.success("Chat created successfully!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createGroupChat = createAsyncThunk(
  "chat/createGroupChat",
  async (groupInfo, { rejectWithValue }) => {
    try {
      const response = await apiClientFileUpload.post("/chat/group", groupInfo);
      toast.success("Group created successfully!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/chat");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  chats: [],
  activeChat: null,
  isCreatingChat: false,
  isCreatingGroupChat: false,
  isFetchingChats: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    removeActiveChat: (state) => {
      state.activeChat = null;
    },
    setLatestMessageOfChat: (state, action) => {
      // Used when new message is received from another user
      const { chatIndex, message } = action.payload;

      // Update latest message
      state.chats[chatIndex].latestMessage = message;
      state.chats[chatIndex].updatedAt =
        message.createdAt || new Date().toISOString();

      // Move chat to the top only if it's not already at index 0
      if (chatIndex !== 0) {
        const [movedChat] = state.chats.splice(chatIndex, 1);
        state.chats.unshift(movedChat);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // create chat
      .addCase(createChat.pending, (state, action) => {
        state.isCreatingChat = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isCreatingChat = false;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isCreatingChat = false;
        state.error = action.payload;
      })

      // create group chat
      .addCase(createGroupChat.pending, (state, action) => {
        state.isCreatingGroupChat = true;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.isCreatingGroupChat = false;
        state.chats.push(action.payload);
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.isCreatingGroupChat = false;
        state.error = action.payload;
      })

      // fetch all chat
      .addCase(fetchChats.pending, (state, action) => {
        state.isFetchingChats = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isFetchingChats = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isFetchingChats = false;
        state.error = action.payload;
      })

      // send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const newMessage = action.payload;

        const chatIndex = state.chats.findIndex(
          (chat) => chat._id === state.activeChat._id
        );

        if (chatIndex !== -1) {
          // Update latest message
          state.chats[chatIndex].latestMessage = newMessage;
          state.chats[chatIndex].updatedAt =
            newMessage.createdAt || new Date().toISOString();

          // Move chat to the top only if it's not already at index 0
          if (chatIndex !== 0) {
            const [movedChat] = state.chats.splice(chatIndex, 1);
            state.chats.unshift(movedChat);
          }
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveChat, removeActiveChat, setLatestMessageOfChat } =
  chatSlice.actions;

export default chatSlice.reducer;
