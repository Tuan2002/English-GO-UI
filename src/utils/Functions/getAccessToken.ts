const getAccessToken = (): string | undefined => {
  // get access token from local storage
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null ? accessToken : undefined;
};
export default getAccessToken;
