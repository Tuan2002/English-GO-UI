import { IGradingFeedbackQuestion } from "@/types/gradingFeedback/GradingFeedbackType";
import getQuestionName, { QuestionLevel } from "@/utils/Functions/getQuestionName";
import { createSlice } from "@reduxjs/toolkit";
import GradingThunks from "./gradingThunks";

export interface GradingState {
  loading: boolean;
  isSubmiting: boolean;
  gradingFeedbackQuestions: IGradingFeedbackQuestion[];
  listQuestionLevel: Array<{
    value: string;
    label: string;
  }>;
  selectedQuestionLevel?: string;
  selectedQuestion?: IGradingFeedbackQuestion;
}

const initialState: GradingState = {
  loading: false,
  isSubmiting: false,
  gradingFeedbackQuestions: [],
  listQuestionLevel: [],
};

export const GradingSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    changeIsSubmiting: (state, action) => {
      state.isSubmiting = action.payload;
    },
    setGradingFeedbackQuestions: (state, action) => {
      state.gradingFeedbackQuestions = action.payload;
    },
    setListQuestionLevel: (state, action) => {
      state.listQuestionLevel = action.payload;
    },
    setSelectedQuestionLevel: (state, action) => {
      state.selectedQuestionLevel = action.payload;
      state.selectedQuestion = state.gradingFeedbackQuestions.find((item) => item.question.levelId === action.payload);
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GradingThunks.gradingWritingWithAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(GradingThunks.gradingWritingWithAI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(GradingThunks.gradingWritingWithAI.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(GradingThunks.getGradingFeedbackWithAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(GradingThunks.getGradingFeedbackWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.gradingFeedbackQuestions = action.payload.data;
        const listQuestionLevel = action.payload.data.map((item) => {
          return {
            value: item.question.levelId,
            label: getQuestionName(item.question.levelId as QuestionLevel),
          };
        });
        state.listQuestionLevel = listQuestionLevel;
        state.selectedQuestionLevel = listQuestionLevel[0].value;
        state.selectedQuestion = action.payload.data[0];
      })
      .addCase(GradingThunks.getGradingFeedbackWithAI.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const GradingActions = {
  ...GradingSlice.actions,
  ...GradingThunks,
};

export default GradingSlice.reducer;
