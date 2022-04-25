import IRobot from '../../interface/IRobot';

export const getAllActiveRobots = async (Robots: IRobot[]):Promise<IRobot[]> => {
  return Robots.filter((r => r.active === true));
};

export const getOneRobot = async (Robots: IRobot[], id: number):Promise<IRobot[]> => {
  return Robots.filter(r => r.type === Number(id));
};