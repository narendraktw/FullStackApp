import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/types/user';

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.status = 'loading';
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.status = 'idle';
      state.user = action.payload;
    },
    fetchUserFailure: (state) => {
      state.status = 'failed';
    },
  },
});

export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } = userSlice.actions;

export default userSlice.reducer;
