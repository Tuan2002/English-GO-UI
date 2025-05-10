import { IGradingFeedbackQuestion, IRegisteredGradingExam } from "@/types/gradingFeedback/GradingFeedbackType";
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
  registeredGradingExams: IRegisteredGradingExam[];
  currentRegisteredGradingExam: IRegisteredGradingExam | null;
}

const initialState: GradingState = {
  loading: false,
  isSubmiting: false,
  gradingFeedbackQuestions: [],
  listQuestionLevel: [],
  registeredGradingExams: [],
  currentRegisteredGradingExam: null,
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
    builder
      .addCase(GradingThunks.registerGradingExamWithPerson.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(GradingThunks.registerGradingExamWithPerson.fulfilled, (state) => {
        state.isSubmiting = false;
      })
      .addCase(GradingThunks.registerGradingExamWithPerson.rejected, (state) => {
        state.isSubmiting = false;
      });
    builder
      .addCase(GradingActions.checkRegisterGradingExamWithPerson.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(GradingActions.checkRegisterGradingExamWithPerson.fulfilled, (state) => {
        state.isSubmiting = false;
      })
      .addCase(GradingActions.checkRegisterGradingExamWithPerson.rejected, (state) => {
        state.isSubmiting = false;
      });
    builder
      .addCase(GradingThunks.getListRegisteredGradeExamByExaminer.pending, (state) => {
        state.loading = true;
      })
      .addCase(GradingThunks.getListRegisteredGradeExamByExaminer.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredGradingExams = action.payload.data;
      })
      .addCase(GradingThunks.getListRegisteredGradeExamByExaminer.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(GradingThunks.getGradingFeedbackWithPerson.pending, (state) => {
        state.loading = true;
      })
      .addCase(GradingThunks.getGradingFeedbackWithPerson.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRegisteredGradingExam = action.payload.data.registeredGrade;

        state.gradingFeedbackQuestions = action.payload.data.questions;
        const listQuestionLevel = action.payload.data.questions.map((item: IGradingFeedbackQuestion) => {
          return {
            value: item.question.levelId,
            label: getQuestionName(item.question.levelId as QuestionLevel),
          };
        });
        state.listQuestionLevel = listQuestionLevel;
        state.selectedQuestionLevel = listQuestionLevel[0].value;
        state.selectedQuestion = action.payload.data.questions[0];
      })
      .addCase(GradingThunks.getGradingFeedbackWithPerson.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(GradingThunks.gradeQuestionWithPerson.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(GradingThunks.gradeQuestionWithPerson.fulfilled, (state) => {
        state.isSubmiting = false;
      })
      .addCase(GradingThunks.gradeQuestionWithPerson.rejected, (state) => {
        state.isSubmiting = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const GradingActions = {
  ...GradingSlice.actions,
  ...GradingThunks,
};

export default GradingSlice.reducer;
