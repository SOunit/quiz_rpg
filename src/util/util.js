export const getRandomTargetIndex = (array) => {
  const targetId = Math.floor(Math.random() * array.length);
  return targetId;
};
