import { configureStore } from "@reduxjs/toolkit";
import { AppSlice } from "./appStore/appReducer";
import { AuthSlice } from "./authStore/authReducer";
import { CategorySlice } from "./categoryStore/categoryReducer";
import { EvaluateSlice } from "./evaluateStore/evaluateReducer";
import { ExaminerIntroductionSlice } from "./examinerIntroduciton/examinerReducer";
import { ExamSlice } from "./examStore/examReducer";
import { FeedbackSlice } from "./feedbackStore/feedbackReducer";
import { LevelSlice } from "./levelStore/levelReducer";
import { OrganizationSlice } from "./organizationStore/organizationReducer";
import { PlanSlice } from "./planStore/planReducer";
import { QuestionSlice } from "./questionStore/questionReducer";
import { RoleSlice } from "./roleStore/roleReducer";
import { ScheduleSlice } from "./schedule/scheduleReducer";
import { SkillSlice } from "./skillStore/skillReducer";
import { UserSlice } from "./userStore/userReducer";

export const store = configureStore({
  reducer: {
    authStore: AuthSlice.reducer,
    userStore: UserSlice.reducer,
    appStore: AppSlice.reducer,
    roleStore: RoleSlice.reducer,
    skillStore: SkillSlice.reducer,
    levelStore: LevelSlice.reducer,
    categoryStore: CategorySlice.reducer,
    questionStore: QuestionSlice.reducer,
    examStore: ExamSlice.reducer,
    organizationStore: OrganizationSlice.reducer,
    scheduleStore: ScheduleSlice.reducer,
    feedbackStore: FeedbackSlice.reducer,
    examinerIntroductionStore: ExaminerIntroductionSlice.reducer,
    planStore: PlanSlice.reducer,
    evaluateStore: EvaluateSlice.reducer,
  },
  // Added this mdware to fix error "A none-serializable value was detected..."
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);
