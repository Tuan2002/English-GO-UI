enum ROUTE_PATH {
  HOME = "/",
  ABOUT = "/about",
  CONTACT = "/contact",
  LOGIN = "/account/login",
  LOGIN_SSO = "/auth/callback",
  REGISTER = "/account/register",
  FORGET_PASSWORD = "/account/forget-password",
  RESET_PASSWORD = "/account/reset-password",
  ACCOUNT_CHANGE_PASSWORD = "/account/change-password",
  ACCOUNT_PROFILE = "/account/profile",
  ACCOUNT_UPGRADE = "/account/upgrade-account",

  //admin routes
  ADMIN_DASHBOARD = "/admin/dashboard",
  ADMIN_USERS = "/admin/users/manage-users",
  ADMIN_ROLES = "/admin/roles/manage-roles",
  ADMIN_QUESTION_BANK = "/admin/question-bank",
  ADMIN_SKILL_DETAIL = "/admin/question-bank/:skillId",
  ADMIN_LEVEL_DETAIL = "/admin/question-bank/:skillId/:levelId",
  ADMIN_CATEGORY_DETAIL = "/admin/question-bank/:skillId/:levelId/:categoryId",
  ADMIN_QUESTION_CREATE = "/admin/question-bank/:skillId/:levelId/:categoryId/create-question",
  ADMIN_MANAGE_ORGANIZATION = "/admin/manage-organization",
  ADMIN_MANAGE_SCHEDULE = "/admin/manage-schedule",
  ADMIN_LIST_EXAM = "/admin/list-exam",
  ADMIN_LIST_SPEAKING_EXAM = "/admin/list-exam/speaking",
  ADMIN_LIST_WRITING_EXAM = "/admin/list-exam/writing",
  ADMIN_EXAM_DETAIL = "/admin/list-exam/:examId",
  ADMIN_FEEDBACK = "/admin/feedback",
  ADMIN_FEEDBACK_DETAIL = "/admin/feedback/:feedbackId",
  ADMIN_EVALUATE = "/admin/evaluate",
  ADMIN_EVALUATE_DETAIL = "/admin/evaluate/:evaluateId",
  ADMIN_MANAGE_SERVICE = "/admin/manage-service/:serviceType",
  ADMIN_MANAGE_SERVICE_ATTRIBUTE = "/admin/manage-service-attribute",
  ADMIN_MANAGE_SERVICE_TYPE = "/admin/manage-service",

  // examiner routes
  EXAMINER_DASHBOARD = "/examiner/dashboard",
  EXAMINER_INTRODUCTION = "/examiner/introduction",
  EXAMINER_UPDATE_INTRODUCTION = "/examiner/introduction/update",
  EXAMINER_QUESTION_BANK = "/examiner/question-bank",
  EXAMINER_LIST_EXAM = "/examiner/list-exam",

  // exam routes
  EXAM = "/exam",
  EXAM_ROOM = "/exam/room",
  EXAM_PARTICIPATE = "/exam/participate",
  EXAM_SCORE = "/exam/score/:examId",
  EXAM_RESULT = "/exam/result/:examId",
  EXAM_HISTORY_LIST = "/exam/history/list",
  EXAM_HISTORY_SPEAKING = "/exam/history/speaking",
  EXAM_HISTORY_WRITING = "/exam/history/writing",
  EXAM_HISTORY_GRADING_REGISTER = "/exam/history/grading-register/:examId",
}
export default ROUTE_PATH;
