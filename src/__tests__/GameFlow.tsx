import { act, renderHook } from '@testing-library/react-hooks'

import RobotDataHook from '../lib/hooks/data/RobotDataHook';

const initialRobotCount = 9;

test('we should have 9 robots', () => {
  const { result } = renderHook(() => RobotDataHook());

  expect(result.current.robots.length).toBe(initialRobotCount);
});

test('select Bob the robot', async () => {
  
  const { result } = renderHook( async () => RobotDataHook());

  await act(async () => {

    await (await result.current).dispatchRobot('ONE_ROBOT', 
    { robotId: 2, selectedRobotIndex: 0 });
    
    const myRobot = (await result.current).selectedRobot;
    expect(myRobot?.name).toBe('Bob');
  });
});

// note to self: add more tests