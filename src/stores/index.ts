import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./authStore/authReducer";
import { UserSlice } from "./userStore/userReducer";
import { AppSlice } from "./appStore/appReducer";
import { RoleSlice } from "./roleStore/roleReducer";
import { SkillSlice } from "./skillStore/skillReducer";
import { LevelSlice } from "./levelStore/levelReducer";
import { CategorySlice } from "./categoryStore/categoryReducer";
import { QuestionSlice } from "./questionStore/questionReducer";

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
