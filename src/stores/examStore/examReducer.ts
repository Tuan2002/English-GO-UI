/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { examThunks } from "./examThunks";
import { toast } from "react-toastify";
import { IExam, IExamQuestion, IExamSkillStatus, IExamSubQuestion } from "../../types/exam/ExamTypes";
import { ILevel } from "@/types/level/LevelTypes";

export interface ExamState {
  currentExam?: IExam;
  selectedSkill?: IExamSkillStatus;
  selectedLevel?: string;
  selectedQuestion?: IExamQuestion;
  listLevelOfSkill?: ILevel[];
  listQuestionOfSkill?: IExamQuestion[];
  openModalSubmitSkill: boolean;
  isSubmitting: boolean;
  isLoading: boolean;
}

const initialState: ExamState = {
  currentExam: undefined,
  isSubmitting: false,
  isLoading: false,
  openModalSubmitSkill: false,
};

export const ExamSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    changeIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    changeSelectedSkill: (state, action) => {
      state.selectedSkill = action.payload;
    },
    changeSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    changeSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    changeListQuestionOfSkill: (state, action) => {
      state.listQuestionOfSkill = action.payload;
    },
    changeOpenModalSubmitSkill: (state, action) => {
      state.openModalSubmitSkill = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(examThunks.participateExam.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(examThunks.participateExam.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(examThunks.participateExam.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(examThunks.getCurrentExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.getCurrentExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentExam = action.payload.data as IExam;
      })
      .addCase(examThunks.getCurrentExam.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(examThunks.continueExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.continueExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedSkill = action.payload.data?.skill;
        const listQuestionOfSkillFromResponse: IExamQuestion[] = [];
        const listLevelOfSkillFromResponse: ILevel[] = [];
        action.payload.data?.questions?.map((q) => {
          const listSubQuestions: IExamSubQuestion[] = [];
          q.question.subQuestions?.map((subQ) => {
            listSubQuestions.push({ ...subQ, selectedAnswerId: undefined });
          });
          q.question.subQuestions = listSubQuestions;
          listQuestionOfSkillFromResponse.push(q.question);
          listLevelOfSkillFromResponse.push(q.question.level as ILevel);
        });
        console.log(listQuestionOfSkillFromResponse);
        state.listLevelOfSkill = listLevelOfSkillFromResponse;
        state.listQuestionOfSkill = listQuestionOfSkillFromResponse;
        state.selectedLevel = listLevelOfSkillFromResponse[0].id;
        state.selectedQuestion = listQuestionOfSkillFromResponse[0];
      })
      .addCase(examThunks.continueExam.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(examThunks.submitSkill.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(examThunks.submitSkill.fulfilled, (state) => {
        state.isSubmitting = false;
        state.openModalSubmitSkill = false;
        toast.success(`Đã nạp kĩ năng ${state.selectedSkill?.skill.name}`);
      })
      .addCase(examThunks.submitSkill.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const ExamActions = {
  ...ExamSlice.actions,
  ...examThunks,
};

export default ExamSlice.reducer;
