import { useLocation, useNavigate } from "react-router-dom";

const updateQueryParams = (newParams: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Lấy các tham số hiện tại từ URL
  const queryParams = new URLSearchParams(location.search);

  // Cập nhật các tham số mới
  for (const [key, value] of Object.entries(newParams)) {
    queryParams.set(key, (value as string).toString());
  }
  console.log(`${location.pathname}?${queryParams.toString()}`);

  // Cập nhật URL với các tham số mới
  navigate(`${location.pathname}?${queryParams.toString()}`);
};
export default updateQueryParams;
