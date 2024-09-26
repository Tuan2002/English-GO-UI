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
  ADMIN_PROFESSIONS = "/admin/generals/manage-professions",
  ADMIN_EXPERIENCES = "/admin/generals/manage-experiences",
  ADMIN_JOB_LOCATIONS = "/admin/generals/manage-job-locations",
  ADMIN_POSITIONS = "/admin/generals/manage-positions",
  ADMIN_SALARY_RANGES = "/admin/generals/manage-salary-ranges",
  ADMIN_MANAGE_COMPANY = "/admin/manage-company",

  // recruiter routes
  RECRUITER_DASHBOARD = "/recruiter/dashboard",
  RECRUITER_COMPANY = "/recruiter/company",
  RECRUITER_RECRUITMENT_NEW = "/recruiter/recruitment-news",

  // manager routes
  MANAGER_DASHBOARD = "/manager/dashboard",
  MANAGER_COMPANY = "/manager/company",

  REGISTER_RECRUITMENT = "/company/register-recruitment",
}
export default ROUTE_PATH;
