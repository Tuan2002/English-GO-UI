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
  ADMIN_LIST_EXAM = "/admin/list-exam",

  // recruiter routes
  EXAMINER_DASHBOARD = "/examiner/dashboard",
  EXAMINER_QUESTION_BANK = "/examiner/question-bank",
  EXAMINER_LIST_EXAM = "/examiner/list-exam",

  REGISTER_RECRUITMENT = "/company/register-recruitment",
}
export default ROUTE_PATH;
