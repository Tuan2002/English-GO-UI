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
import ManageProfessionPage from "@/pages/admin/manage-general/ManageProfessionPage";
import ManageExperiencePage from "@/pages/admin/manage-general/ManageExperiencePage";
import ManageJobLocationPage from "@/pages/admin/manage-general/ManageJobLocationPage";
import ManagePositionPage from "@/pages/admin/manage-general/ManagePositionPage";
import CandidateLayout from "@/layouts/CandidateLayout";
import RegisterRecruitmentPage from "@/pages/company/RegisterRecruitmentPage";
import ManagerLayout from "@/layouts/ManagerLayout";
import ManagerProtectRoute from "./ManagerProtectRoute";
import ManageCompanyPage from "@/pages/manager/manager-company/ManagerCompanyPage";
import ManagerDashboardPage from "@/pages/manager/dashboard/ManagerDashboardPage";
import ManageCompanyAdminPage from "@/pages/admin/manage-company/ManageCompanyPage";
import RecruiterLayout from "@/layouts/RecruiterLayout";
import RecruiterDashboardPage from "@/pages/recruiter/dashboard/RecruiterDashboardPage";
import MyCompanyPage from "@/pages/recruiter/my-company/MyCompanyPage";
import RecruitmentNewsPage from "@/pages/recruiter/recruitment-news/RecruitmentNewsPage";
import RecruiterProtectRoute from "./RecruiterProtectRoute";
import CreateJobPage from "@/pages/recruiter/recruitment-news/CreateJob";

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
              <Route path={ROUTE_PATH.ADMIN_PROFESSIONS} element={<ManageProfessionPage />} />
              <Route path={ROUTE_PATH.ADMIN_EXPERIENCES} element={<ManageExperiencePage />} />
              <Route path={ROUTE_PATH.ADMIN_JOB_LOCATIONS} element={<ManageJobLocationPage />} />
              <Route path={ROUTE_PATH.ADMIN_POSITIONS} element={<ManagePositionPage />} />
              <Route path={ROUTE_PATH.ADMIN_SALARY_RANGES} element={<ManagePositionPage />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_COMPANY} element={<ManageCompanyAdminPage />} />
            </Route>
          </Route>

          <Route element={<ManagerLayout />}>
            <Route element={<ManagerProtectRoute />}>
              {/* add other route of manager here */}
              <Route path={ROUTE_PATH.MANAGER_DASHBOARD} element={<ManagerDashboardPage />} />
              <Route path={ROUTE_PATH.MANAGER_COMPANY} element={<ManageCompanyPage />} />
            </Route>
          </Route>

          <Route element={<RecruiterLayout />}>
            <Route element={<RecruiterProtectRoute />}>
              <Route path={ROUTE_PATH.RECRUITER_DASHBOARD} element={<RecruiterDashboardPage />} />
              <Route path={ROUTE_PATH.RECRUITER_COMPANY} element={<MyCompanyPage />} />
              <Route path={ROUTE_PATH.RECRUITER_RECRUITMENT_NEW}>
                <Route path='' element={<RecruitmentNewsPage />} />
                <Route path='create-job' element={<CreateJobPage />} />
              </Route>
            </Route>
          </Route>

          <Route element={<CandidateLayout />}>
            <Route path={ROUTE_PATH.REGISTER_RECRUITMENT} element={<RegisterRecruitmentPage />} />
          </Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<CandidateLayout />}>
          <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
          <Route path={ROUTE_PATH.ABOUT} element={<span>About</span>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
