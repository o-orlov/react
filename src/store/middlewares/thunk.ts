import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';

import { RootState } from '../store';

type ThunkAction = (
  dispatch: Dispatch,
  getState: () => RootState
) => void;

const createThunkMiddleware: () => Middleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI) => (
    next: Dispatch<AnyAction>
  ) => (action: AnyAction | ThunkAction) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
};

const thunkMiddleware = createThunkMiddleware();

export default thunkMiddleware;
