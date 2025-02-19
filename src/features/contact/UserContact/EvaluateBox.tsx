import Container from "@/components/Container";
import HeaderBox from "@/components/HeaderBox";
import { AppDispatch, RootState } from "@/stores";
import { EvaluateActions } from "@/stores/evaluateStore/evaluateReducer";
import { IAppResposeBase } from "@/types/AppType";
import { ISendIvaluateDTO } from "@/types/evaluate/EvaluateTypes";
import { Button, Input } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { BiSolidStar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import style from "./UserContact.module.scss";
const cx = classNames.bind(style);

const EvaluateBox = () => {
  const { isSubmiting } = useSelector((state: RootState) => state.evaluateStore);
  const dispatch: AppDispatch = useDispatch();
  const [selectedStar, setSelectedStar] = React.useState(1);
  const [hoverStar, setHoverStar] = React.useState(1);
  const [description, setDescription] = React.useState("");
  const handleSendEvaluation = () => {
    if (!selectedStar || selectedStar < 1) {
      toast.error("Vui lòng chọn số sao đánh giá");
      return;
    }
    if (!description) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }
    const sendData: ISendIvaluateDTO = {
      starNumber: selectedStar,
      description,
    };
    dispatch(EvaluateActions.sendEvaluate(sendData)).then((response) => {
      if ((response.payload as IAppResposeBase<unknown>)?.success) {
        setDescription("");
        setSelectedStar(1);
        setHoverStar(1);
      }
    });
  };
  return (
    <div className={cx("evaluate-box")}>
      <Container>
        <HeaderBox
          title='Đánh giá về chúng tôi'
          description={<span>Hãy để lại đánh giá của bạn về sản phẩm của chúng tôi nhé</span>}
          isUpperCase={true}
          maxWidth='500px'
        />
        <div className={cx("contact-info-box")}>
          <div className={cx("contact-form")}>
            <div className={cx("contact-img-left")}></div>
            <div className={cx("contact-img-right")}></div>
            <div className={cx("contact-form-bg-1")}>
              <div className={cx("contact-img-center")}></div>
            </div>
            <div className={cx("contact-form-box")}>
              <div className={cx("star-box")}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    onMouseOver={() => setHoverStar(index + 1)}
                    onMouseOut={() => setHoverStar(selectedStar)}
                    onClick={() => setSelectedStar(index + 1)}
                    key={index}
                    className={cx("star-icon", {
                      "star-active": index + 1 <= hoverStar,
                    })}
                  >
                    <BiSolidStar />
                  </span>
                ))}
              </div>
              <div className={cx("input-box")}>
                <Input.TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Hãy để lại trải nghiệm của bạn nhé!'
                  className={cx("input")}
                />
                <Button
                  onClick={handleSendEvaluation}
                  type='primary'
                  className={cx("button", "full-width")}
                  loading={isSubmiting}
                >
                  Đánh giá
                </Button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default EvaluateBox;
