export type QuestionLevel = "writing-part-1" | "writing-part-2" | "speaking-part-1" | "speaking-part-2" | "speaking-part-3";
const getQuestionName = (level: QuestionLevel): string => {
  switch (level) {
    case "writing-part-1":
      return "Bài viết số 1: Viết thư";
    case "writing-part-2":
      return "Bài viết số 2: Viết bài luận";
    case "speaking-part-1":
      return "Phần 1: Giới thiệu bản thân";
    case "speaking-part-2":
      return "Phần 2: Nói về một chủ đề";
    case "speaking-part-3":
      return "Phần 3: Thảo luận về một chủ đề";
    default:
      return "Không xác định";
  }
};
export default getQuestionName;
