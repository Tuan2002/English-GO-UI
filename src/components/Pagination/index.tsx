import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
interface PaginationCustomProps {
  total: number;
  limit?: number;
}

const PaginationCustom = ({ total, limit = 10 }: PaginationCustomProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page") || 1;
  const updateQueryParams = (newParams: any) => {
    // Lấy các tham số hiện tại từ URL
    const queryParams = new URLSearchParams(location.search);

    // Cập nhật các tham số mới
    for (const [key, value] of Object.entries(newParams)) {
      queryParams.set(key, (value as string).toString());
    }
    // Cập nhật URL với các tham số mới
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  const handleChangePage = (page: number) => {
    updateQueryParams({ page });
  };
  return (
    <Pagination
      className='mt-10 justify-content-end'
      size='small'
      hideOnSinglePage
      defaultCurrent={Number(page)}
      total={total}
      pageSize={limit}
      onChange={handleChangePage}
    />
  );
};
export default PaginationCustom;
