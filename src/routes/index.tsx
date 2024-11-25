import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./ProtectRoute";
import ROUTE_PATH from "./routePath";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/home/HomePage";
import AuthRoute from "./AuthRoute";
import AdminProtectRoute from "./AdminProtectRoute";
import MainLayout from "@/layouts/MainLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageUserPage from "@/pages/admin/manage-user/ManageUserPage";
import ManageRolePage from "@/pages/admin/manage-user/ManageRolePage";
import ExaminerProtectRoute from "./ExaminerProtectRoute";
import ContestantLayout from "@/layouts/ContestantLayout";
import ExaminerLayout from "@/layouts/ExaminerLayout";
import ExaminerDashboard from "@/pages/examiner/dashboard/Dashboard";
import ExaminerQuestionBankPage from "@/pages/examiner/examiner-question-bank/ExaminerQuestionBankPage";
import ExaminerListExamPage from "@/pages/examiner/examiner-list-exam/ExaminerQuestionBankPage";
import AdminListExamPage from "@/pages/admin/admin-list-exam/AdminListExamPage";
import AdminQuestionBankPage from "@/pages/admin/admin-question-bank/AdminQuestionBankPage";
import AdminSkillDetailPage from "@/pages/admin/admin-question-bank/AdminSkillDetailPage";
import AdminLevelDetailPage from "@/pages/admin/admin-question-bank/AdminLevelDetailPage";
import AdminCategoryDetailPage from "@/pages/admin/admin-question-bank/AdminCategoryDetailPage";
import AdminCreateQuestionPage from "@/pages/admin/admin-question-bank/AdminCreateQuestionPage";
import ExamPage from "@/pages/exam/ExamPage";
import ExamParticipatePage from "@/pages/exam/ExamParticipatePage";
import AdminManageOrganizationPage from "@/pages/admin/admin-manage-organization/AdminManageOrganizationPage";
import AdminManageSchedulePage from "@/pages/admin/admin-manage-schedule/AdminManageSchedulePage";
import ExamScorePage from "@/pages/exam/ExamScorePage";
import ExamRoomPage from "@/pages/exam/ExamRoomPage";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route element={<MainLayout />}>
            <Route element={<AdminProtectRoute />}>
              {/* add other route of admin here */}
              <Route path={ROUTE_PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
              <Route path={ROUTE_PATH.ADMIN_USERS} element={<ManageUserPage />} />
              <Route path={ROUTE_PATH.ADMIN_ROLES} element={<ManageRolePage />} />
              <Route path={ROUTE_PATH.ADMIN_QUESTION_BANK} element={<AdminQuestionBankPage />} />
              <Route path={ROUTE_PATH.ADMIN_SKILL_DETAIL} element={<AdminSkillDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_LEVEL_DETAIL} element={<AdminLevelDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_CATEGORY_DETAIL} element={<AdminCategoryDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_QUESTION_CREATE} element={<AdminCreateQuestionPage />} />
              <Route path={ROUTE_PATH.ADMIN_LIST_EXAM} element={<AdminListExamPage />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_ORGANIZATION} element={<AdminManageOrganizationPage />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_SCHEDULE} element={<AdminManageSchedulePage />} />
            </Route>
          </Route>

          <Route element={<ExaminerLayout />}>
            <Route element={<ExaminerProtectRoute />}>
              {/* add other route of manager here */}
              <Route path={ROUTE_PATH.EXAMINER_DASHBOARD} element={<ExaminerDashboard />} />
              <Route path={ROUTE_PATH.EXAMINER_QUESTION_BANK} element={<ExaminerQuestionBankPage />} />
              <Route path={ROUTE_PATH.EXAMINER_LIST_EXAM} element={<ExaminerListExamPage />} />
            </Route>
          </Route>

          <Route path={ROUTE_PATH.EXAM_ROOM} element={<ExamRoomPage />} />
          <Route path={ROUTE_PATH.EXAM_PARTICIPATE} element={<ExamParticipatePage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<ContestantLayout />}>
          <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
          <Route path={ROUTE_PATH.ABOUT} element={<span>About</span>} />
          <Route path={ROUTE_PATH.EXAM} element={<ExamPage />} />
          <Route path={ROUTE_PATH.EXAM_SCORE} element={<ExamScorePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
