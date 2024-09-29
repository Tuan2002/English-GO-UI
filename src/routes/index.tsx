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
              <Route path={ROUTE_PATH.ADMIN_LIST_EXAM} element={<AdminListExamPage />} />
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

          <Route element={<ContestantLayout />}></Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<ContestantLayout />}>
          <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
          <Route path={ROUTE_PATH.ABOUT} element={<span>About</span>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
