import CardCustom from "@/components/Card";
import PaginationCustom from "@/components/Pagination";
import { AppDispatch, RootState } from "@/stores";
import { EvaluateActions } from "@/stores/evaluateStore/evaluateReducer";
import { IGetAllEvaluateDTO } from "@/types/evaluate/EvaluateTypes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TableEvaluate from "./components/TableEvaluate";

const AdminEvaluate = () => {
  const { evaluatePaginationData } = useSelector((state: RootState) => state.evaluateStore);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 1);
  const limit = parseInt(queryParams.get("limit") || "10", 10);

  console.log(page, limit);

  useEffect(() => {
    const getEvaluates = async () => {
      const dataGetEvaluate: IGetAllEvaluateDTO = {
        page: page,
        limit: limit,
      };
      dispatch(EvaluateActions.getAllEvaluates(dataGetEvaluate));
    };
    getEvaluates();
  }, [dispatch, limit, page]);
  return (
    <CardCustom title='Đánh giá từ người dùng' fullHeight>
      <TableEvaluate />
      <div className='flex justify-content-end'>
        <PaginationCustom total={evaluatePaginationData?.totalItems || 0} limit={evaluatePaginationData?.limit} />
      </div>
    </CardCustom>
  );
};
export default AdminEvaluate;
