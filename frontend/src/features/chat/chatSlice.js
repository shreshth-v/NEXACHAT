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

export const updateGroupChat = createAsyncThunk(
  "chat/updateGroupChat",
  async (groupInfo, { getState, rejectWithValue }) => {
    try {
      const activeChatId = getState().chat.activeChat._id;
      const response = await apiClientFileUpload.patch(
        `/chat/group/${activeChatId}`,
        groupInfo
      );
      toast.success("Group info updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addUsersToGroup = createAsyncThunk(
  "chat/addUsersToGroup",
  async (usersToAddIds, { getState, rejectWithValue }) => {
    try {
      const activeChatId = getState().chat.activeChat._id;
      const response = await apiClient.patch(
        `/chat/group/add/${activeChatId}`,
        { usersToAddIds }
      );
      toast.success("User added successfully!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const removeUserFromGroup = createAsyncThunk(
  "chat/removeUserFromGroup",
  async (userToRemoveId, { getState, rejectWithValue }) => {
    try {
      const activeChatId = getState().chat.activeChat._id;
      const response = await apiClient.patch(
        `/chat/group/remove/${activeChatId}`,
        { userToRemoveId }
      );
      toast.success("User removed successfully!");
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
  isUpdatingGroupChat: false,
  isAddingUsersToGroup: false,
  isRemovingUserFromGroup: false,
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
        state.chats.unshift(action.payload);
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
        state.chats.unshift(action.payload);
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
      })

      // update group chat
      .addCase(updateGroupChat.pending, (state, action) => {
        state.isUpdatingGroupChat = true;
      })
      .addCase(updateGroupChat.fulfilled, (state, action) => {
        state.isUpdatingGroupChat = false;

        const updatedGroupChat = action.payload;

        state.activeChat = updatedGroupChat;

        state.chats = state.chats.map((chat) =>
          chat._id === updatedGroupChat._id ? updatedGroupChat : chat
        );
      })
      .addCase(updateGroupChat.rejected, (state, action) => {
        state.isUpdatingGroupChat = false;
        state.error = action.payload;
      })

      // add users to group chat
      .addCase(addUsersToGroup.pending, (state, action) => {
        state.isAddingUsersToGroup = true;
      })
      .addCase(addUsersToGroup.fulfilled, (state, action) => {
        state.isAddingUsersToGroup = false;

        const updatedGroupChat = action.payload;

        state.activeChat = updatedGroupChat;

        state.chats = state.chats.map((chat) =>
          chat._id === updatedGroupChat._id ? updatedGroupChat : chat
        );
      })
      .addCase(addUsersToGroup.rejected, (state, action) => {
        state.isAddingUsersToGroup = false;
        state.error = action.payload;
      })

      // remove user from group chat
      .addCase(removeUserFromGroup.pending, (state, action) => {
        state.isRemovingUserFromGroup = true;
      })
      .addCase(removeUserFromGroup.fulfilled, (state, action) => {
        state.isRemovingUserFromGroup = false;

        const updatedGroupChat = action.payload;

        state.activeChat = updatedGroupChat;

        state.chats = state.chats.map((chat) =>
          chat._id === updatedGroupChat._id ? updatedGroupChat : chat
        );
      })
      .addCase(removeUserFromGroup.rejected, (state, action) => {
        state.isRemovingUserFromGroup = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveChat, removeActiveChat, setLatestMessageOfChat } =
  chatSlice.actions;

export default chatSlice.reducer;
