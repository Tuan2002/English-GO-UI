import { useSelector } from "react-redux";
import style from "../Carousel.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
import { useEffect, useRef } from "react";
import { BiCamera } from "react-icons/bi";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
const cx = classNames.bind(style);
const ContestantInfomation = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const { currentExam } = useSelector((state: RootState) => state.examStore);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const handleCancel = () => {
    // Xử lý khi click vào nút "Thoát khỏi phòng"
    navigate(ROUTE_PATH.EXAM);
  };
  const handleGetExam = async () => {
    navigate(ROUTE_PATH.EXAM_PARTICIPATE);
  };

  // Hàm mở camera
  const openCamera = async () => {
    try {
      // Yêu cầu quyền truy cập camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream; // Lưu stream để dùng khi unmount
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Gán stream vào video element
      }
    } catch (error) {
      console.error("Lỗi khi mở camera:", error);
    }
  };
  useEffect(() => {
    openCamera(); // Mở camera khi component được mount
    return () => {
      // Cleanup khi component unmount
      if (streamRef.current) {
        // Dừng tất cả các track của stream (tắt camera)
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  return (
    <div className={cx("carousel-item-wrapper")}>
      <div className={cx("carousel-item-header")}>
        <span className={cx("number")}>3</span>
        <span className={cx("title")}>Thông tin thí sinh</span>
      </div>
      <div className={cx("carousel-content", "scrollbar")}>
        <div className={cx("contestant-info-box", "content-box")}>
          <div className=''>
            <div className={cx("camera")}>
              <video ref={videoRef} autoPlay className={cx("camera-screen")} />
              <span className={cx("camera-icon")}>
                <BiCamera />
              </span>
            </div>
            <div className={cx("content-item")}>
              <h5 className={cx("title")}>
                <span className='secondary-color'>Họ và tên:</span> {currentUser?.fullName}
              </h5>
              <h5 className={cx("title")}>
                <span className='secondary-color'>Email:</span> {currentUser?.email}
              </h5>
              <h5 className={cx("title")}>
                <span className='secondary-color'>Tên tài khoản:</span> {currentUser?.username}
              </h5>
              <h5 className={cx("title")}>
                <span className='secondary-color'>Loại tài khoản:</span> Miễn phí
              </h5>
              <h5 className={cx("title")}>
                <span className='secondary-color'>Mã lượt thi:</span> {currentExam?.examCode ?? "EXAMPRO"}
              </h5>
            </div>
          </div>
          <div className='mt-10'>
            <Button onClick={handleGetExam} type='primary' className='full-width'>
              Nhận đề
            </Button>
            <Button onClick={handleCancel} danger type='primary' className='full-width mt-10'>
              Thoát khỏi phòng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContestantInfomation;
