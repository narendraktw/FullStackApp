import { call, put, takeLatest } from 'redux-saga/effects';
import { loginAPI, googleLoginAPI } from './authAPI';
import { loginRequest, loginSuccess, loginFailure, googleLoginRequest } from './authSlice';

// Define the type for the response from loginAPI
type LoginApiResponse = {
  data: { message: string };
};

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<unknown, void, LoginApiResponse> {
  try {
    const response: LoginApiResponse = yield call(loginAPI, action.payload);
    yield put(loginSuccess(response.data)); // Ensure to access response.data here
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* handleGoogleLogin(
  action: ReturnType<typeof googleLoginRequest>
): Generator<unknown, void, LoginApiResponse> {
  try {
    // Make sure to use action.payload if necessary for your API call
    const response: LoginApiResponse = yield call(googleLoginAPI, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(googleLoginRequest.type, handleGoogleLogin);
}
