import { BiBadgeCheck } from "react-icons/bi";
import style from "../HomePage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const Achievement = () => {
  return (
    <div className={cx("container-level")}>
      <h1>Ai cần thi chứng chỉ ngoại ngữ tiếng Anh VSTEP?</h1>
      <div className={cx("levels")}>
        <div className={cx("level")}>
          <h2>Bậc 2</h2>
          <ul>
            <li>
              <BiBadgeCheck />
              Giáo viên Mầm non
            </li>
            <li>
              <BiBadgeCheck />
              Giáo viên Tiểu học
            </li>
            <li>
              <BiBadgeCheck />
              Giáo viên THCS
            </li>
            <li>
              <BiBadgeCheck />
              Thi tuyển công chức, viên chức
            </li>
          </ul>
        </div>
        <div className={cx("level")}>
          <h2>Bậc 3</h2>
          <ul>
            <li>
              <BiBadgeCheck />
              Đầu vào, đầu ra Thạc sỹ, Nghiên cứu sinh
            </li>
            <li>
              <BiBadgeCheck />
              Đầu vào, đầu ra Sinh viên các trường ĐH, CĐ
            </li>
            <li>
              <BiBadgeCheck />
              Thi tuyển công chức, viên chức
            </li>
          </ul>
        </div>
        <div className={cx("level")}>
          <h2>Bậc 4</h2>
          <ul>
            <li>
              <BiBadgeCheck />
              Giáo viên tiếng Anh Tiểu học
            </li>
            <li>
              <BiBadgeCheck />
              Giáo viên tiếng Anh THCS
            </li>
            <li>
              <BiBadgeCheck />
              Đầu vào, đầu ra Thạc sỹ, Nghiên cứu sinh
            </li>
            <li>
              <BiBadgeCheck />
              Thi tuyển chuyên viên cao cấp
            </li>
          </ul>
        </div>
        <div className={cx("level")}>
          <h2>Bậc 5</h2>
          <ul>
            <li>
              <BiBadgeCheck />
              Giáo viên tiếng Anh THPT
            </li>
            <li>
              <BiBadgeCheck />
              Giảng viên tiếng Anh các trường ĐH, CĐ
            </li>
            <li>
              <BiBadgeCheck />
              Cán bộ chấm thi VSTEP
            </li>
          </ul>
        </div>
      </div>
      <p className={cx("note")}>*Và nhiều đối tượng khác theo yêu cầu của các đơn vị, tổ chức.</p>
    </div>
  );
};
export default Achievement;
