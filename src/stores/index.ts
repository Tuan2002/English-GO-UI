import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./authStore/authReducer";
import { UserSlice } from "./userStore/userReducer";
import { AppSlice } from "./appStore/appReducer";
import { RoleSlice } from "./roleStore/roleReducer";
import { GeneralSlice } from "./generalStore/generalReducer";
import { CompanySlice } from "./companyStore/companyReducer";

export const store = configureStore({
  reducer: {
    authStore: AuthSlice.reducer,
    userStore: UserSlice.reducer,
    appStore: AppSlice.reducer,
    roleStore: RoleSlice.reducer,
    generalStore: GeneralSlice.reducer,
    companyStore: CompanySlice.reducer,
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
