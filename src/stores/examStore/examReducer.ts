/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { examThunks } from "./examThunks";
import { toast } from "react-toastify";
import {
  IExam,
  IExamQuestion,
  IExamScore,
  IExamSkillStatus,
  IExamSubQuestion,
  IListeningSkillAudioStatus,
  IResultOfQuestion,
  ITargetQuestionOfSkill,
} from "../../types/exam/ExamTypes";
import { ILevel } from "@/types/level/LevelTypes";

export interface ExamState {
  currentExam?: IExam;
  selectedSkill?: IExamSkillStatus;
  currentSkill?: string;
  selectedLevel?: string;
  selectedQuestion?: IExamQuestion;
  resultOfQuestion?: IResultOfQuestion[];
  questionResult?: IResultOfQuestion;
  listLevelOfSkill?: ILevel[];
  listQuestionOfSkill?: IExamQuestion[];
  openModalSubmitSkill: boolean;
  targetQuestionOfSkill: ITargetQuestionOfSkill[];
  currentTargetQuestion?: ITargetQuestionOfSkill;
  listeningAudioStatus?: IListeningSkillAudioStatus[];
  listMyExam?: IExamScore[];
  currentExamScore?: IExamScore;
  isSubmitting: boolean;
  isLoading: boolean;
}

const initialState: ExamState = {
  currentExam: undefined,
  isSubmitting: false,
  isLoading: false,
  targetQuestionOfSkill: [],
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
    changeCurrentSkill: (state, action) => {
      state.currentSkill = action.payload;
    },
    changeSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    changeSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    changeListLevelOfSkill: (state, action) => {
      state.listLevelOfSkill = action.payload;
    },
    changeListQuestionOfSkill: (state, action) => {
      state.listQuestionOfSkill = action.payload;
    },
    changeOpenModalSubmitSkill: (state, action) => {
      state.openModalSubmitSkill = action.payload;
    },
    changeTargetQuestionOfSkill: (state, action) => {
      state.targetQuestionOfSkill = action.payload;
    },
    changeCurrentTargetQuestion: (state, action) => {
      state.currentTargetQuestion = action.payload;
    },
    changeListeningAudioStatus: (state, action) => {
      state.listeningAudioStatus = action.payload;
    },
    changeQuestionResult: (state, action) => {
      state.questionResult = action.payload;
    },
    changeListMyExam: (state, action) => {
      state.listMyExam = action.payload;
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
        state.currentExam = action.payload.data?.exam as IExam;
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
        state.currentExam = action.payload.data?.exam;
        const listQuestionOfSkillFromResponse: IExamQuestion[] = [];
        const listLevelOfSkillFromResponse: ILevel[] = [];
        const targetQuestion: ITargetQuestionOfSkill[] = [];
        const listeningAudioStatus: IListeningSkillAudioStatus[] = [];

        let index = 0;
        action.payload.data?.questions?.map((q) => {
          const listSubQuestions: IExamSubQuestion[] = [];
          q.question.subQuestions?.map((subQ) => {
            listSubQuestions.push({ ...subQ, selectedAnswerId: undefined });
          });
          q.question.subQuestions = listSubQuestions;
          listQuestionOfSkillFromResponse.push(q.question);
          listLevelOfSkillFromResponse.push(q.question.level as ILevel);

          if (q.question.skill?.id === "listening") {
            listeningAudioStatus.push({
              questionId: q.questionId,
              isPlaying: false,
              audioSrc: q.question.attachedFile ?? "",
              currentTime: 0,
            });
          }
          if (q.question.subQuestions?.length === 0) {
            index++;
            targetQuestion.push({
              index,
              skillId: action.payload.data?.skill.skillId ?? "",
              levelId: q.question.levelId,
              questionId: q.question.id,
              isDone: false,
            });
          } else {
            q.question.subQuestions?.forEach((subQ) => {
              index++;
              targetQuestion.push({
                index,
                skillId: action.payload.data?.skill.skillId ?? "",
                levelId: q.question.levelId,
                questionId: subQ.id,
                isDone: false,
              });
            });
          }
        });
        state.currentTargetQuestion = targetQuestion?.length > 0 ? targetQuestion[0] : undefined;
        state.targetQuestionOfSkill = targetQuestion;
        state.listLevelOfSkill = listLevelOfSkillFromResponse;
        state.listQuestionOfSkill = listQuestionOfSkillFromResponse;
        state.selectedLevel = listLevelOfSkillFromResponse[0].id;
        state.selectedQuestion = listQuestionOfSkillFromResponse[0];
        state.listeningAudioStatus = listeningAudioStatus;
      })
      .addCase(examThunks.continueExam.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(examThunks.getResultOfExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.getResultOfExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedSkill = action.payload.data?.skill;
        state.currentExam = action.payload.data?.exam;
        const listQuestionOfSkillFromResponse: IExamQuestion[] = [];
        const listLevelOfSkillFromResponse: ILevel[] = [];
        const targetQuestion: ITargetQuestionOfSkill[] = [];
        const listeningAudioStatus: IListeningSkillAudioStatus[] = [];
        const listResultOfQuestion: IResultOfQuestion[] = [];
        let index = 0;
        action.payload.data?.questions?.map((q) => {
          const listSubQuestions: IExamSubQuestion[] = [];
          q.question.subQuestions?.map((subQ) => {
            listSubQuestions.push({ ...subQ, selectedAnswerId: undefined });
          });
          q.question.subQuestions = listSubQuestions;
          listQuestionOfSkillFromResponse.push(q.question);
          listLevelOfSkillFromResponse.push(q.question.level as ILevel);
          listResultOfQuestion.push({
            questionId: q.question.id,
            skillId: q.question.skill?.id ?? "",
            levelId: q.question.levelId,
            results: q.results,
          });
          if (q.question.skill?.id === "listening") {
            listeningAudioStatus.push({
              questionId: q.questionId,
              isPlaying: false,
              audioSrc: q.question.attachedFile ?? "",
              currentTime: 0,
            });
          }
          if (q.question.subQuestions?.length === 0) {
            index++;
            targetQuestion.push({
              index,
              skillId: action.payload.data?.skill.skillId ?? "",
              levelId: q.question.levelId,
              questionId: q.question.id,
              isDone: false,
            });
          } else {
            q.question.subQuestions?.forEach((subQ) => {
              const isCorrect = q.results?.find((r) => r.question === subQ.id)?.answer === subQ.correctAnswer;
              index++;
              targetQuestion.push({
                index,
                skillId: action.payload.data?.skill.skillId ?? "",
                levelId: q.question.levelId,
                questionId: subQ.id,
                isDone: isCorrect,
              });
            });
          }
        });
        state.currentTargetQuestion = targetQuestion?.length > 0 ? targetQuestion[0] : undefined;
        state.targetQuestionOfSkill = targetQuestion;
        state.listLevelOfSkill = listLevelOfSkillFromResponse;
        state.listQuestionOfSkill = listQuestionOfSkillFromResponse;
        state.selectedLevel = listLevelOfSkillFromResponse[0].id;
        state.selectedQuestion = listQuestionOfSkillFromResponse[0];
        state.listeningAudioStatus = listeningAudioStatus;
        state.resultOfQuestion = listResultOfQuestion;
      })
      .addCase(examThunks.getResultOfExam.rejected, (state) => {
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
    builder
      .addCase(examThunks.getCurrentSpeakingQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.getCurrentSpeakingQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data !== null) {
          state.selectedQuestion = state.listQuestionOfSkill?.find((q) => q.id === action.payload.data);
          state.selectedLevel = state.selectedQuestion?.levelId;
        }
      })
      .addCase(examThunks.getCurrentSpeakingQuestion.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(examThunks.submitSpeakingSkill.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(examThunks.submitSpeakingSkill.fulfilled, (state) => {
        state.isSubmitting = false;
        state.selectedLevel =
          state.listLevelOfSkill?.[state.listLevelOfSkill?.findIndex((l) => l.id === state.selectedLevel) + 1]?.id;
        state.selectedQuestion = state.listQuestionOfSkill?.find((q) => q.levelId === state.selectedLevel);
      })
      .addCase(examThunks.submitSpeakingSkill.rejected, (_, action: PayloadAction<any>) => {
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(examThunks.getExamScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.getExamScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentExamScore = action.payload.data as IExamScore;
      })
      .addCase(examThunks.getExamScore.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(examThunks.getMyExams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.getMyExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listMyExam = action.payload.data as IExamScore[];
      })
      .addCase(examThunks.getMyExams.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const ExamActions = {
  ...ExamSlice.actions,
  ...examThunks,
};

export default ExamSlice.reducer;
