enum ROUTE_PATH {
  HOME = "/",
  ABOUT = "/about",
  CONTACT = "/contact",
  LOGIN = "/account/login",
  REGISTER = "/account/register",
  FORGET_PASSWORD = "/account/forget-password",
  RESET_PASSWORD = "/account/reset-password",

  //admin routes
  ADMIN_DASHBOARD = "/admin/dashboard",
  ADMIN_USERS = "/admin/users/manage-users",
  ADMIN_ROLES = "/admin/roles/manage-roles",
  ADMIN_QUESTION_BANK = "/admin/question-bank",
  ADMIN_SKILL_DETAIL = "/admin/question-bank/:skillId",
  ADMIN_LEVEL_DETAIL = "/admin/question-bank/:skillId/:levelId",
  ADMIN_CATEGORY_DETAIL = "/admin/question-bank/:skillId/:levelId/:categoryId",
  ADMIN_QUESTION_CREATE = "/admin/question-bank/:skillId/:levelId/:categoryId/create-question",
  ADMIN_LIST_EXAM = "/admin/list-exam",
  ADMIN_MANAGE_ORGANIZATION = "/admin/manage-organization",
  ADMIN_MANAGE_SCHEDULE = "/admin/manage-schedule",

  // recruiter routes
  EXAMINER_DASHBOARD = "/examiner/dashboard",
  EXAMINER_QUESTION_BANK = "/examiner/question-bank",
  EXAMINER_LIST_EXAM = "/examiner/list-exam",

  EXAM = "/exam",
  EXAM_ROOM = "/exam/room",
  EXAM_PARTICIPATE = "/exam/participate",
  EXAM_SCORE = "/exam/score/:examId",
}
export default ROUTE_PATH;
