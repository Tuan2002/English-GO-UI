import Container from "@/components/Container";
import HeaderBox from "@/components/HeaderBox";
import { AppDispatch, RootState } from "@/stores";
import { EvaluateActions } from "@/stores/evaluateStore/evaluateReducer";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { BiSolidStar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import style from "./UserContact.module.scss";
const cx = classNames.bind(style);
const FeedbackBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const { evaluates } = useSelector((state: RootState) => state.evaluateStore);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  useEffect(() => {
    dispatch(EvaluateActions.getAllEvaluates({ page: 1, limit: 10, isShow: true }));
  }, [dispatch]);
  return (
    <div className={cx("feedback-box")}>
      <Container>
        <HeaderBox
          title='Phản hồi từ người dùng'
          description={
            <span>
              Trong quá trình hoạt động, chúng tôi luôn có những đánh giá tích cực từ người dùng để không ngừng hoàn thiện sản
              phẩm.
            </span>
          }
          isUpperCase={true}
          maxWidth='500px'
        />
        <div className={cx("feedback-slider")}>
          <Slider {...settings}>
            {evaluates?.map((evaluate, index) => (
              <div key={index} className={cx("feedback-item")}>
                <div className={cx("feedback-item-box")}>
                  <div className={cx("avatar-box")}>
                    <img className={cx("avatar")} src={evaluate.user?.avatar ?? "avatar-ntq.png"} />
                  </div>
                  <div className={cx("info-box")}>
                    <div className={cx("name")}>{evaluate.user.fullName}</div>
                    <div className={cx("star")}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={cx("star-icon", {
                            "star-active": index < evaluate.starNumber,
                          })}
                        >
                          <BiSolidStar />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={cx("content-box")}>
                    <p>{evaluate.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};
export default FeedbackBox;
