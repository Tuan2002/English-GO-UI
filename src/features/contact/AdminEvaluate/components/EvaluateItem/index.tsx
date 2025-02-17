import { AppDispatch, RootState } from "@/stores";
import { EvaluateActions } from "@/stores/evaluateStore/evaluateReducer";
import { IEvaluate } from "@/types/evaluate/EvaluateTypes";
import { Drawer, Switch } from "antd";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { BiCheck, BiShow, BiSolidStar, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import style from "./EvaluateItem.module.scss";
const cx = classNames.bind(style);

interface EvaluateItemProps {
  evaluate: IEvaluate;
}
const EvaluateItem = ({ evaluate }: EvaluateItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { currentEvaluate, isSubmiting } = useSelector((state: RootState) => state.evaluateStore);
  const handleShowDetail = () => {
    dispatch(EvaluateActions.changeCurrentEvaluate(evaluate));
  };
  const handleCloseDetail = () => {
    dispatch(EvaluateActions.changeCurrentEvaluate(undefined));
  };
  const handleToogleShowAtHome = () => {
    dispatch(EvaluateActions.toogleShowEvaluate(evaluate.id));
    dispatch(EvaluateActions.changeCurrentEvaluate(undefined));
  };
  useEffect(() => {
    if (currentEvaluate?.id === evaluate.id) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentEvaluate?.id, evaluate.id]);

  return (
    <div className={cx("feedback-item")}>
      <div className={cx("feedback-item-box")}>
        <div className={cx("avatar-box")}>
          <img className={cx("avatar")} src='/avatar-ntq.png' />
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
        <span onClick={handleShowDetail} className={cx("btn-show")}>
          <BiShow />
        </span>
        <span
          className={cx("btn-check", {
            active: evaluate.isShow,
          })}
        >
          <BiCheck />
        </span>
        <Drawer
          placement='top'
          closable={false}
          onClose={() => setOpen(false)}
          open={open}
          width={"100%"}
          height={"100%"}
          getContainer={false}
          style={{ padding: 0 }}
        >
          <div className={cx("drawer-content")}>
            <span onClick={handleCloseDetail} className={cx("btn-show")}>
              <BiX />
            </span>
            <div className={cx("drawer-content-header")}>
              <div className={cx("avatar-box")}>
                <img className={cx("avatar")} src='/avatar-ntq.png' />
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

              <div className={cx("show-at-home")}>
                <label htmlFor='switch-show-in-home'>Hiển thị ở trang chủ</label>
                <Switch
                  onClick={handleToogleShowAtHome}
                  loading={isSubmiting}
                  checked={evaluate.isShow}
                  id='switch-show-in-home'
                  size='small'
                />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default EvaluateItem;
