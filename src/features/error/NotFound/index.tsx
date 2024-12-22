import classNames from "classnames/bind";
import style from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
const NotFound = () => {
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className={cx("container-star", "container")}>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-1")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
        <div className={cx("star-2")}></div>
      </div>
      <div className={cx("container", "container-bird")}>
        <div className={cx("bird", "bird-anim")}>
          <div className={cx("bird-container")}>
            <div className={cx("wing", "wing-left")}>
              <div className={cx("wing-left-top")}></div>
            </div>
            <div className={cx("wing", "wing-right")}>
              <div className={cx("wing-right-top")}></div>
            </div>
          </div>
        </div>
        <div className={cx("bird", "bird-anim")}>
          <div className={cx("bird-container")}>
            <div className={cx("wing", "wing-left")}>
              <div className={cx("wing-left-top")}></div>
            </div>
            <div className={cx("wing", "wing-right")}>
              <div className={cx("wing-right-top")}></div>
            </div>
          </div>
        </div>
        <div className={cx("bird", "bird-anim")}>
          <div className={cx("bird-container")}>
            <div className={cx("wing", "wing-left")}>
              <div className={cx("wing-left-top")}></div>
            </div>
            <div className={cx("wing", "wing-right")}>
              <div className={cx("wing-right-top")}></div>
            </div>
          </div>
        </div>
        <div className={cx("bird", "bird-anim")}>
          <div className={cx("bird-container")}>
            <div className={cx("wing", "wing-left")}>
              <div className={cx("wing-left-top")}></div>
            </div>
            <div className={cx("wing", "wing-right")}>
              <div className={cx("wing-right-top")}></div>
            </div>
          </div>
        </div>
        <div className={cx("bird", "bird-anim")}>
          <div className={cx("bird-container")}>
            <div className={cx("wing", "wing-left")}>
              <div className={cx("wing-left-top")}></div>
            </div>
            <div className={cx("wing", "wing-right")}>
              <div className={cx("wing-right-top")}></div>
            </div>
          </div>
        </div>
        <div className={cx("bird", "bird-anim")}>
          <div className={cx("bird-container")}>
            <div className={cx("wing", "wing-left")}>
              <div className={cx("wing-left-top")}></div>
            </div>
            <div className={cx("wing", "wing-right")}>
              <div className={cx("wing-right-top")}></div>
            </div>
          </div>
        </div>
        <div className={cx("container-title")}>
          <div className={cx("title")}>
            <div className={cx("number")}>4</div>
            <div className={cx("moon")}>
              <div className={cx("face")}>
                <div className={cx("mouth")}></div>
                <div className={cx("eyes")}>
                  <div className={cx("eye-left")}></div>
                  <div className={cx("eye-right")}></div>
                </div>
              </div>
            </div>
            <div className={cx("number")}>4</div>
          </div>
          <div className={cx("subtitle")}>Oops. Looks like you took a wrong turn.</div>
          <button onClick={handleBackPage} className={cx("back-btn")}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
