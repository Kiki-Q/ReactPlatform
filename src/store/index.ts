import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual,
} from 'react-redux';
import couterReducer from './modules/counterSlice';

const store = configureStore({
  reducer: {
    counter: couterReducer,
  },
});

type GetStateFnType = typeof store.getState;
type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const shallowEqualApp = shallowEqual;
export default store;
