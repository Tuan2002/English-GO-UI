export enum GradeTargets {
  "GRAMMAR" = "grammar",
  "COHERENCE" = "coherence",
  "VOCABULARY" = "vocabulary",
  "SENTENCE_COMPLEXITY" = "sentence_complexity",
  "TASK_ACHIEVEMENT" = "task_achievement",
  "PRONUNCIATION" = "pronunciation",
}

export const GradeTargetLabels = {
  [GradeTargets.GRAMMAR]: "Về ngữ pháp",
  [GradeTargets.COHERENCE]: "Về tính mạch lạc, trôi chảy",
  [GradeTargets.VOCABULARY]: "Về từ vựng trong bài",
  [GradeTargets.SENTENCE_COMPLEXITY]: "Về mức độ phức tạp trong câu",
  [GradeTargets.TASK_ACHIEVEMENT]: "Về mức độ hoàn thành yêu cầu của đề tài",
  [GradeTargets.PRONUNCIATION]: "Về phát âm",
};
