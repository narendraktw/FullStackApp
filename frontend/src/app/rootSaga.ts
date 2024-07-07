import { all, fork } from 'redux-saga/effects';
import authSaga from 'src/features/auth/authSaga';
import userSaga from 'src/features/user/userSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga)]);
}
