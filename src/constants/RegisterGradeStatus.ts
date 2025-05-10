export enum ERegisterGradeStatus {
  REGISTERED = "REGISTERED",
  GRADING = "GRADING",
  GRADED = "GRADED",
}
export const RegisterGradeStatus = {
  [ERegisterGradeStatus.REGISTERED]: "Đang chờ chấm",
  [ERegisterGradeStatus.GRADING]: "Đang chấm",
  [ERegisterGradeStatus.GRADED]: "Đã chấm",
};

export const RegisterGradeStatusColors = {
  [ERegisterGradeStatus.REGISTERED]: "#970783",
  [ERegisterGradeStatus.GRADING]: "blue",
  [ERegisterGradeStatus.GRADED]: "green",
};

export const RegisterGradeStatusBgColors = {
  [ERegisterGradeStatus.REGISTERED]: "#e9c4cd",
  [ERegisterGradeStatus.GRADING]: "#e7e9c4",
  [ERegisterGradeStatus.GRADED]: "#bdf0bb",
};
