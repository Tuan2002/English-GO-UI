import { getCookie } from "../cookies";

const getAccessToken = (): string | undefined => {
  const accessToken = getCookie("accessToken");
  return accessToken;
};
export default getAccessToken;
