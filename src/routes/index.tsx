import ManageService from "@/features/manage-service/ManageService";
import ManageServiceAttribute from "@/features/manage-service/ManageServiceAttribute";
import ManageServiceType from "@/features/manage-service/ManageServiceType";
import AdminLayout from "@/layouts/AdminLayout";
import ContestantLayout from "@/layouts/ContestantLayout";
import ExaminerLayout from "@/layouts/ExaminerLayout";
import ProfileLayout from "@/layouts/ProfileLayout";
import ChangePasswordPage from "@/pages/account/ChangePasswordPage";
import MyProfilePage from "@/pages/account/MyProfilePage";
import UpgradeAcountPage from "@/pages/account/UpgradeAccountPage";
import AdminEvaluatePage from "@/pages/admin/admin-evaluate/AdminEvaluatePage";
import AdminFeedbackPage from "@/pages/admin/admin-feedback/AdminFeedbackPage";
import AdminGradeExamPage from "@/pages/admin/admin-grade-exam/AdminGradeExamPage";
import AdminListRegisteredGradingPage from "@/pages/admin/admin-grade-exam/AdminListRegisteredGradingPage";
import AdminManageOrganizationPage from "@/pages/admin/admin-manage-organization/AdminManageOrganizationPage";
import AdminManageSchedulePage from "@/pages/admin/admin-manage-schedule/AdminManageSchedulePage";
import AdminCategoryDetailPage from "@/pages/admin/admin-question-bank/AdminCategoryDetailPage";
import AdminCreateQuestionPage from "@/pages/admin/admin-question-bank/AdminCreateQuestionPage";
import AdminLevelDetailPage from "@/pages/admin/admin-question-bank/AdminLevelDetailPage";
import AdminQuestionBankPage from "@/pages/admin/admin-question-bank/AdminQuestionBankPage";
import AdminSkillDetailPage from "@/pages/admin/admin-question-bank/AdminSkillDetailPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminExamDetailPage from "@/pages/admin/manage-exam/AdminExamDetailPage";
import AdminListExamPage from "@/pages/admin/manage-exam/AdminListExamPage";
import AdminListSpeakingPage from "@/pages/admin/manage-exam/AdminListSpeakingPage";
import AdminListWritingPage from "@/pages/admin/manage-exam/AdminListWritingPage";
import ManageRolePage from "@/pages/admin/manage-user/ManageRolePage";
import ManageUserPage from "@/pages/admin/manage-user/ManageUserPage";
import LoginPage from "@/pages/auth/LoginPage";
import LoginSSO from "@/pages/auth/LoginSSO";
import RegisterPage from "@/pages/auth/RegisterPage";
import ContactPage from "@/pages/contact/ContactPage";
import NotFoundPage from "@/pages/error/NotFoundPage";
import ExamGradingRegisterPage from "@/pages/exam-history/ExamGradingRegisterPage";
import ExamGradingWithAIPage from "@/pages/exam-history/ExamGradingWithAIPage";
import ExamGradingWithPersonPage from "@/pages/exam-history/ExamGradingWithPersonPage";
import ExamHistoryListPage from "@/pages/exam-history/ExamHistoryListPage";
import ExamHistorySpeakingPage from "@/pages/exam-history/ExamHistorySpeakingPage";
import ExamHistoryWritingPage from "@/pages/exam-history/ExamHistoryWritingPage";
import ExamPage from "@/pages/exam/ExamPage";
import ExamParticipatePage from "@/pages/exam/ExamParticipatePage";
import ExamResultPage from "@/pages/exam/ExamResultPage";
import ExamRoomPage from "@/pages/exam/ExamRoomPage";
import ExamScorePage from "@/pages/exam/ExamScorePage";
import ExaminerDashboard from "@/pages/examiner/dashboard/Dashboard";
import ExaminerGradeExamPage from "@/pages/examiner/examiner-grade-exam/ExaminerGradeExamPage";
import ExaminerListRegisteredGradingPage from "@/pages/examiner/examiner-grade-exam/ExaminerListRegisteredGradingPage";
import ExaminerIntroductionPage from "@/pages/examiner/examiner-introduction/ExaminerIntroductionPage";
import UpdateExaminerIntroductionPage from "@/pages/examiner/examiner-introduction/UpdateExaminerIntroductionPage";
import ExaminerExamDetailPage from "@/pages/examiner/examiner-list-exam/ExaminerExamDetailPage";
import ExaminerListExamPage from "@/pages/examiner/examiner-list-exam/ExaminerListExamPage";
import ExaminerQuestionBankPage from "@/pages/examiner/examiner-question-bank/ExaminerQuestionBankPage";
import HomePage from "@/pages/home/HomePage";
import ExamScheduleLookupPage from "@/pages/lookup/ExamScheduleLookupPage";
import TestScoreLookupPage from "@/pages/lookup/TestScoreLookupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProtectRoute from "./AdminProtectRoute";
import AuthRoute from "./AuthRoute";
import ExaminerProtectRoute from "./ExaminerProtectRoute";
import ProtectRoute from "./ProtectRoute";
import ROUTE_PATH from "./routePath";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route element={<AdminProtectRoute />}>
            <Route element={<AdminLayout />}>
              {/* add other route of admin here */}
              <Route path={ROUTE_PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
              <Route path={ROUTE_PATH.ADMIN_USERS} element={<ManageUserPage />} />
              <Route path={ROUTE_PATH.ADMIN_ROLES} element={<ManageRolePage />} />
              <Route path={ROUTE_PATH.ADMIN_QUESTION_BANK} element={<AdminQuestionBankPage />} />
              <Route path={ROUTE_PATH.ADMIN_SKILL_DETAIL} element={<AdminSkillDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_LEVEL_DETAIL} element={<AdminLevelDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_CATEGORY_DETAIL} element={<AdminCategoryDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_QUESTION_CREATE} element={<AdminCreateQuestionPage />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_ORGANIZATION} element={<AdminManageOrganizationPage />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_SCHEDULE} element={<AdminManageSchedulePage />} />
              <Route path={ROUTE_PATH.ADMIN_LIST_EXAM} element={<AdminListExamPage />} />
              <Route path={ROUTE_PATH.ADMIN_LIST_SPEAKING_EXAM} element={<AdminListSpeakingPage />} />
              <Route path={ROUTE_PATH.ADMIN_LIST_WRITING_EXAM} element={<AdminListWritingPage />} />
              <Route path={ROUTE_PATH.ADMIN_EXAM_DETAIL} element={<AdminExamDetailPage />} />
              <Route path={ROUTE_PATH.ADMIN_FEEDBACK} element={<AdminFeedbackPage />} />
              <Route path={ROUTE_PATH.ADMIN_EVALUATE} element={<AdminEvaluatePage />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_SERVICE} element={<ManageService />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_SERVICE_TYPE} element={<ManageServiceType />} />
              <Route path={ROUTE_PATH.ADMIN_MANAGE_SERVICE_ATTRIBUTE} element={<ManageServiceAttribute />} />
              <Route path={ROUTE_PATH.ADMIN_LIST_REGISTERED_GRADE_EXAM} element={<AdminListRegisteredGradingPage />} />
              <Route path={ROUTE_PATH.ADMIN_GRADE_EXAM} element={<AdminGradeExamPage />} />
            </Route>
          </Route>

          <Route element={<ExaminerProtectRoute />}>
            <Route element={<ExaminerLayout />}>
              {/* Add other route of examiner here */}
              <Route path={ROUTE_PATH.EXAMINER_DASHBOARD} element={<ExaminerDashboard />} />
              <Route path={ROUTE_PATH.EXAMINER_INTRODUCTION} element={<ExaminerIntroductionPage />} />
              <Route path={ROUTE_PATH.EXAMINER_QUESTION_BANK} element={<ExaminerQuestionBankPage />} />
              <Route path={ROUTE_PATH.EXAMINER_UPDATE_INTRODUCTION} element={<UpdateExaminerIntroductionPage />} />
              <Route path={ROUTE_PATH.EXAMINER_LIST_EXAM} element={<ExaminerListExamPage />} />
              <Route path={ROUTE_PATH.EXAMINER_EXAM_DETAIL} element={<ExaminerExamDetailPage />} />
              <Route path={ROUTE_PATH.EXAMINER_LIST_REGISTERED_GRADE_EXAM} element={<ExaminerListRegisteredGradingPage />} />
              <Route path={ROUTE_PATH.EXAMINER_GRADE_EXAM} element={<ExaminerGradeExamPage />} />
            </Route>
          </Route>

          <Route path={ROUTE_PATH.EXAM_ROOM} element={<ExamRoomPage />} />
          <Route path={ROUTE_PATH.EXAM_PARTICIPATE} element={<ExamParticipatePage />} />
          <Route element={<ContestantLayout />}>
            <Route path={ROUTE_PATH.EXAM_SCORE} element={<ExamScorePage />} />
            <Route path={ROUTE_PATH.EXAM_RESULT} element={<ExamResultPage />} />
            <Route element={<ProfileLayout pageName='exam' />}>
              <Route path={ROUTE_PATH.EXAM_HISTORY_LIST} element={<ExamHistoryListPage />} />
              <Route path={ROUTE_PATH.EXAM_HISTORY_SPEAKING} element={<ExamHistorySpeakingPage />} />
              <Route path={ROUTE_PATH.EXAM_HISTORY_WRITING} element={<ExamHistoryWritingPage />} />
              <Route path={ROUTE_PATH.EXAM_HISTORY_GRADING_WITH_AI} element={<ExamGradingWithAIPage />} />
              <Route path={ROUTE_PATH.EXAM_HISTORY_GRADING_WITH_PERSON} element={<ExamGradingWithPersonPage />} />
              <Route path={ROUTE_PATH.EXAM_HISTORY_GRADING_REGISTER} element={<ExamGradingRegisterPage />} />
            </Route>
            <Route element={<ProfileLayout pageName='profile' />}>
              <Route path={ROUTE_PATH.ACCOUNT_PROFILE} element={<MyProfilePage />} />
              <Route path={ROUTE_PATH.ACCOUNT_CHANGE_PASSWORD} element={<ChangePasswordPage />} />
              <Route path={ROUTE_PATH.ACCOUNT_UPGRADE} element={<UpgradeAcountPage />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<ContestantLayout />}>
          <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
          <Route path={ROUTE_PATH.ABOUT} element={<span>About</span>} />
          <Route path={ROUTE_PATH.EXAM} element={<ExamPage />} />
          <Route path={ROUTE_PATH.CONTACT} element={<ContactPage />} />
          <Route path={ROUTE_PATH.LOOKUP_TEST_SCORE} element={<TestScoreLookupPage />} />
          <Route path={ROUTE_PATH.LOOKUP_EXAM_SCHEDULE} element={<ExamScheduleLookupPage />} />
        </Route>
        <Route path={ROUTE_PATH.LOGIN_SSO} element={<LoginSSO />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
