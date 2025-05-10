import CardCustom from "@/components/Card";
import ModalChooseUser from "@/components/ModalChooseUser";
import PaginationCustom from "@/components/Pagination";
import { AppDispatch, RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { IGetAllExamDTO } from "@/types/exam/ExamTypes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import HeaderListExam from "./components/HeaderListExam";
import TableListExams from "./components/TableListExams";

interface IAdminListExamProps {
  role: "admin" | "examiner";
}
const AdminListExam = ({ role }: IAdminListExamProps) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { examPageData, isOpenModalChooseUser } = useSelector((state: RootState) => state.examStore);
  const [listSelectedUser, setListSelectedUser] = React.useState<string[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 10);
  const limit = parseInt(queryParams.get("limit") || "10", 10);
  const handleCloseModalChooseUser = () => {
    dispatch(ExamActions.changeIsOpenModalChooseUser(false));
  };
  const handleConfirmChooseUser = (listUser: string[]) => {
    setListSelectedUser(listUser);
    dispatch(ExamActions.changeIsOpenModalChooseUser(false));
  };
  useEffect(() => {
    const getAllExamData: IGetAllExamDTO = {
      page,
      limit,
      userIds: listSelectedUser,
    };
    dispatch(ExamActions.getAllExams(getAllExamData));
  }, [dispatch, limit, page, listSelectedUser]);
  return (
    <CardCustom title='Tổng hợp bài thi của thí sinh' fullHeight>
      <HeaderListExam />
      <div className='mt-10'>
        <TableListExams role={role} />
        <div className='flex justify-content-end'>
          <PaginationCustom total={examPageData?.totalItems || 0} limit={examPageData?.limit} />
        </div>
      </div>
      <div>
        <ModalChooseUser
          onChooseUser={handleConfirmChooseUser}
          selectedUsers={listSelectedUser}
          isOpen={isOpenModalChooseUser}
          onClose={handleCloseModalChooseUser}
        />
      </div>
    </CardCustom>
  );
};
export default AdminListExam;
