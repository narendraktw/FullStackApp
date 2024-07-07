import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserAPI } from './userAPI';
import { AxiosResponse } from 'axios';
import { User } from 'src/types/user';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './userSlice';

// Define the type for the fetchUserAPI function
type FetchUserAPI = (userId: string) => Promise<AxiosResponse<User>>;

function* handleFetchUser(action: ReturnType<typeof fetchUserRequest>) {
  try {
    // Extract userId from action payload
    const userId: string = action.payload || '';

    // Call fetchUserAPI with userId as an argument
    const response: AxiosResponse<User> = yield call<FetchUserAPI>(fetchUserAPI, userId);

    // Dispatch success action with response data
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    // Dispatch failure action if an error occurs
    yield put(fetchUserFailure());
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserRequest.type, handleFetchUser);
}
