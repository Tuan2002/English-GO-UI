import CardCustom from "@/components/Card";
import TableFeedback from "./components/TableFeedback";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { FeedbackActions } from "@/stores/feedbackStore/feedbackReducer";
import { useLocation } from "react-router-dom";
import { IGetAllFeedbackDTO } from "@/types/feedback/FeedbackTypes";
import PaginationCustom from "@/components/Pagination";
import ModalShowFeedback from "./components/ModalShowFeedback";

const AdminFeedback = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { feedbackPaginationData } = useSelector((state: RootState) => state.feedbackStore);
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 10);
  const limit = parseInt(queryParams.get("limit") || "10", 10);

  useEffect(() => {
    const getAllFeedbackData: IGetAllFeedbackDTO = {
      page,
      limit,
    };
    dispatch(FeedbackActions.getAllFeedbacks(getAllFeedbackData));
  }, [page, limit, dispatch]);
  return (
    <CardCustom title='Phản hồi từ người dùng' fullHeight>
      <TableFeedback />
      <div className='flex justify-content-end'>
        <PaginationCustom total={feedbackPaginationData?.totalItems || 0} limit={feedbackPaginationData?.limit} />
      </div>
      <div>
        <ModalShowFeedback />
      </div>
    </CardCustom>
  );
};
export default AdminFeedback;
