/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import questionThunks from "./questionThunks";
import { ActionModal } from "@/types/AppType";
import { toast } from "react-toastify";
import { IQuestion, IQuestionDetail, ISubQuestion, ISubQuestionAnswer } from "@/types/question/QuestionTypes";
import { v4 as uuidv4 } from "uuid";

export interface QuestionState {
  loading: boolean;
  openModalSaveQuestion: boolean;
  openModalShowQuestionDetail: boolean;
  listQuestions: IQuestion[];
  selectedQuestion?: IQuestionDetail;
  actionModal: ActionModal;
  isSubmitting: boolean;
}

const initialState: QuestionState = {
  loading: false,
  openModalSaveQuestion: false,
  openModalShowQuestionDetail: false,
  selectedQuestion: undefined,
  listQuestions: [],
  isSubmitting: false,
  actionModal: "create",
};

export const QuestionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    changeOpenModalSaveQuestion: (state, action) => {
      state.openModalSaveQuestion = action.payload;
    },
    changeActionModal: (state, action) => {
      state.actionModal = action.payload;
    },
    changeIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    changeSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    changeOpenModalShowQuestionDetail: (state, action) => {
      state.openModalShowQuestionDetail = action.payload;
    },
    initSelectedQuestion: (state, action) => {
      const { categoryId, skillId, levelId, subQuestionNumber } = action.payload;
      const questionId = uuidv4();
      const subQuestions: ISubQuestion[] = [];
      for (let i = 0; i < subQuestionNumber; i++) {
        const subQuestionId = uuidv4();
        const answers: ISubQuestionAnswer[] = [];
        for (let j = 0; j < 4; j++) {
          const answer: ISubQuestionAnswer = {
            id: uuidv4(),
            answerContent: "",
            isCorrect: false,
            subQuestionId,
            order: j,
          };
          answers.push(answer);
        }
        subQuestions.push({
          id: subQuestionId,
          content: "",
          answers: answers,
          correctAnswer: undefined,
          questionId,
          order: i,
        });
      }
      const newQuestion: IQuestionDetail = {
        id: questionId,
        categoryId,
        skillId,
        levelId,
        questionContent: "",
        description: "",
        questionNote: "",
        attachedFile: skillId === "listening" ? "abc" : undefined,
        isDeleted: false,
        isActive: true,
        subQuestions,
      };
      state.selectedQuestion = newQuestion;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(questionThunks.getAllQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(questionThunks.getAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
      })
      .addCase(questionThunks.getAllQuestions.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(questionThunks.getQuestionByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(questionThunks.getQuestionByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.listQuestions = action.payload.data ?? [];
      })
      .addCase(questionThunks.getQuestionByCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.createNewQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.createNewQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveQuestion = false;
        state.actionModal = "create";
        state.listQuestions.unshift(action.payload.data as IQuestion);
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.createNewQuestion.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { message: string }).message);
      });
    builder
      .addCase(questionThunks.updateQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.updateQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveQuestion = false;
        state.actionModal = "create";
        state.listQuestions = state.listQuestions.map((question) => {
          if (question.id === action.payload.data?.id) {
            return action.payload.data;
          }
          return question;
        });
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.updateQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.deleteQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.deleteQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listQuestions = state.listQuestions.filter((question) => question.id !== action.payload.data?.id);
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.deleteQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.deleteQuestionPermanently.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.deleteQuestionPermanently.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listQuestions = state.listQuestions.filter((question) => question.id !== action.payload.data?.id);
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.deleteQuestionPermanently.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.restoreQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.restoreQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listQuestions = state.listQuestions.filter((question) => question.id !== action.payload.data?.id);
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.restoreQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.activeQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.activeQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listQuestions = state.listQuestions.map((question) => {
          if (question.id === action.payload.data?.id) {
            const data = action.payload.data as IQuestion;
            data.isActive = true;
            return data;
          }
          return question;
        });
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.activeQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.inactiveQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.inactiveQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listQuestions = state.listQuestions.map((question) => {
          if (question.id === action.payload.data?.id) {
            const data = action.payload.data as IQuestion;
            data.isActive = false;
            return data;
          }
          return question;
        });
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.inactiveQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(questionThunks.getQuestionDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(questionThunks.getQuestionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuestion = action.payload.data ?? undefined;
      })
      .addCase(questionThunks.getQuestionDetail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

// Action creators are generated for each case reducer function
export const QuestionActions = {
  ...QuestionSlice.actions,
  ...questionThunks,
};

export default QuestionSlice.reducer;
