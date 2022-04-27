import IReturnRandomStatus from '../../interface/IReturnRandomStatus';
import IRobot from '../../interface/IRobot';

export const getAllActiveRobots = async (Robots: IRobot[]):Promise<IRobot[]> => {
  return Robots.filter((r => r.active === true));
};

export const getOneRobot = async (Robots: IRobot[], id: number):Promise<IRobot> => {
  return Robots.filter((r => r.id === id))[0];
};

export const deactivateActiveRobot = (id:number, Robots: IRobot[]):IRobot[] => {
  return Robots.filter((r => r.id === id))
    .filter((r => r.active === true))
    .map((r) => {
      r.active = false;
      return r;
    });
};

export const getRandomOpponent = async (
  Robots:IRobot[], robotId:number):Promise<IReturnRandomStatus> => {
  
  const result:IReturnRandomStatus = { status:false, message:'', robotObj:undefined };
  
  const allActiveRobots = await getAllActiveRobots(Robots);

  if (allActiveRobots.length < 2) {
    result.message = 'Uh Oh! You deleted all your opponents?';
    result.status = false;
    return result;
  }

  const activeRandom = Robots
    .filter(r => r.active === true)
    .filter(r => Number(r.id) !== Number(robotId));

  const randomRobot = Math.floor(Math.random() * (activeRandom.length));
  
  result.status = true;
  result.message = 'Random opponent identified. Fight!';
  result.robotObj = activeRandom[randomRobot];

  return result;
};