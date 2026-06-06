import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import profileReducer from "@/store/slices/profileSlice";
import billingReducer from "@/store/slices/billingSlice";
import companyReducer from "@/store/slices/companySlice";
import proposalsReducer from "@/store/slices/proposalsSlice";
import documentsReducer from "@/store/slices/documentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    billing: billingReducer,
    company: companyReducer,
    proposals: proposalsReducer,
    documents: documentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
