export const fightResults = ():number => {
  // 1 me, 0 opponent win!
  const fightResults = Math.random();
  return (fightResults < 0.5) ? 1 : 0;
};