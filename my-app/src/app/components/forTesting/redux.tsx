// app/counter/page.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/../store';
import { increment, decrement, reset } from '@/../store/counterSlice';

export const CounterPage: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ padding: 20 }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>{' '}
      <button onClick={() => dispatch(decrement())}>Decrement</button>{' '}
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}