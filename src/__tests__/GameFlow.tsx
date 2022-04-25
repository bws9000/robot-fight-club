import { renderHook } from '@testing-library/react-hooks'
import RobotDataHook from '../lib/hooks/RobotDataHook';

test('should have 9 robots', () => {
  const { result } = renderHook(() => RobotDataHook());
  expect(result.current.robots.length).toBe(9);
});