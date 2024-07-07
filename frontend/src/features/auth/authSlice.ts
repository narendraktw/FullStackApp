import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state) => {
      state.status = 'idle';
      state.isLoggedIn = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    googleLoginRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  googleLoginRequest, // Add googleLoginRequest here
} = authSlice.actions;

export default authSlice.reducer;
