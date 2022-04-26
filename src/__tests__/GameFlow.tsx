import { renderHook } from '@testing-library/react-hooks'

import RobotDataHook from '../lib/hooks/data/RobotDataHook';
import GameHistoryDataHook from '../lib/hooks/data/GameHistoryDataHook';
import UserDataHook from '../lib/hooks/data/UserDataHook';

const initialRobotCount = 9;

test('should have 9 robots', () => {
  const { result } = renderHook(() => RobotDataHook());
  expect(result.current.robots.length).toBe(initialRobotCount);
});

test('select robot at random', () => {
  const randomNum = Math.random() * initialRobotCount;
  expect(randomNum).toBeGreaterThanOrEqual(0);
  expect(randomNum).toBeLessThan(9);
  // const { result } = renderHook(() => RobotDataHook());
  // expect(result.current.robots.length).toBe(9);
});