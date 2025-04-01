/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IGradingFeedbackQuestion } from "@/types/gradingFeedback/GradingFeedbackType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const gradingWritingWithAI = createAsyncThunk(
  "grades/gradingWritingWithAI",
  async (examId: string, { rejectWithValue }): Promise<IAppResposeBase<null>> => {
    try {
      const grades: IAppResposeBase<null> = await http.post("/api/grades/grade-writing-with-ai", {
        examId,
      });
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getGradingFeedbackWithAI = createAsyncThunk(
  "grades/getGradingFeedbackWithAI",
  async (
    { examId, skill }: { examId: string; skill: "writing" | "speaking" },
    { rejectWithValue }
  ): Promise<IAppResposeBase<IGradingFeedbackQuestion[]>> => {
    try {
      const grades: IAppResposeBase<IGradingFeedbackQuestion[]> = await http.get(
        `/api/grades/grading-feedback-with-ai/${examId}?skill=${skill}`
      );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const GradingThunks = {
  gradingWritingWithAI,
  getGradingFeedbackWithAI,
};
export default GradingThunks;
