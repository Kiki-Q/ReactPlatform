import React from 'react';
import { Button } from 'antd';
import { useAppSelector, shallowEqualApp, useAppDispatch } from '../store';
import { incremented, decremented } from '../store/modules/counterSlice';

export default function ReduxDemo() {
  const { count } = useAppSelector(
    (state) => ({
      count: state.counter.count,
    }),
    shallowEqualApp
  );

  const dispatch = useAppDispatch();
  const addCount = () => {
    dispatch(incremented());
  };
  const subCount = () => {
    dispatch(decremented());
  };

  const handleChangeMessage = () => {
    // dispatch(changeMessage('哈哈哈哈哈哈'))
  };
  return (
    <div>
      <div>count：{count}</div>
      <Button onClick={subCount}>-1</Button>
      <Button onClick={addCount}>+1</Button>
      <Button onClick={handleChangeMessage}>changeMessage</Button>
    </div>
  );
}
function changeMessage(arg0: string): any {
  throw new Error('Function not implemented.');
}
