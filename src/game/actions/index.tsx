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
    result.message = 'Error: Uh Oh! You deleted all your opponents?';
    result.status = false;
    return result;
  }

  console.log(robotId);

  // const activeRandom = Robots.filter(r => r.active === true);

  // const r = Math.floor(Math.random() * (activeRandom.length));

  // const notWithMySelectedRobot = activeRandom.filter( r => robotId !== Number(r));

  // const randomOpponent:IRobot = notWithMySelectedRobot[r];
  
  return result;
};