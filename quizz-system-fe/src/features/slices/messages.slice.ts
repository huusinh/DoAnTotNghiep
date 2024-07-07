import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

export type Message = string | string[]

export type MessageOption = {
  message: Message;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
};

const initialState = {
  messages: [] as (MessageOption | Message)[],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessageDialog(
      state,
      { payload }: PayloadAction<MessageOption | Message>
    ) {
      if (typeof payload === "string") {
        state.messages.unshift({
          message: [payload],
        });
      } else if (Array.isArray(payload)) {
        state.messages.unshift({
          message: payload,
        });
      } else {
        state.messages.unshift(payload);
      }
    },
    closeMessageDialog(state) {
      state.messages.shift();
    },
  },
});

export const { showMessageDialog, closeMessageDialog } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
export const selectCurrentMessage = (state: RootState) =>
  state.messages.messages[0] as MessageOption;
