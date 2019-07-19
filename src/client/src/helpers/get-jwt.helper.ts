export const getJWT = () => {
  const token = localStorage.getItem('jwt');

  return token;
};
