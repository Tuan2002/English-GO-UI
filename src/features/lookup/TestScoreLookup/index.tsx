import classNames from "classnames/bind";
import style from "./TestScoreLookup.module.scss";
const cx = classNames.bind(style);
const TestScoreLookup = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const { examSessions, signature, loading, isSubmitted, checkpoints } = useSelector((state: RootState) => state.checkpointStore);
  // const [examSessionSelected, setExamSessionSelected] = useState<string | null>(null);
  // const [msv, setMsv] = useState<string | null>(null);

  // const handleExamSessionChange = (value: string) => {
  //   setExamSessionSelected(value);
  //   setMsv(null);
  //   dispatch(CheckPointActions.changeIsSubmitted(false));
  //   dispatch(CheckPointActions.changeCheckpoints([]));
  // };
  // const handleMsvChange = (value: string) => {
  //   setMsv(value);
  // };
  // const handleLookup = () => {
  //   if (!examSessionSelected || !msv) {
  //     toast.warning("Vui lòng chọn kì thi và nhập mã sinh viên để tra cứu điểm!");
  //     return;
  //   }
  //   if (!signature || signature?.trim() === "") {
  //     toast.warning("Hệ thống đang bảo trì, vui lòng quay lại sau!");
  //     return;
  //   }
  //   const dataRequest: IExamTrackingRequest = {
  //     examSessionId: examSessionSelected,
  //     languageId: "2",
  //     locationId: "1",
  //     studentCode: msv,
  //     signature: signature,
  //   };
  //   dispatch(CheckPointActions.getExamResults(dataRequest));
  // };

  // useEffect(() => {
  //   const getExamSessions = async () => {
  //     dispatch(CheckPointActions.getExamSessions());
  //   };
  //   dispatch(CheckPointActions.changeIsSubmitted(false));
  //   getExamSessions();
  // }, [dispatch]);
  return (
    <div className={cx("test-score-lookup-wrapper")}>
      <iframe src='https://dgnlnn.vinhuni.edu.vn/tra-cuu-ket-qua.aspx' className={cx("iframe")}></iframe>

      {/* <HeaderBox
        title='Tra cứu điểm thi'
        isUpperCase={true}
        description={
          <div className={cx("description-box")}>
            <span>Tra cứu điểm thi tiếng Anh B1 - Đại học Vinh</span>
            <br />
            <span>Vui lòng chọn đúng kì thi và nhập đúng mã sinh viên để tra cứu điểm!</span>
          </div>
        }
        maxWidth='100%'
      />
      <div className={cx("test-score-lookup-form")}>
        <div className={cx("kt-box")}>
          <Select
            className='full-width'
            showSearch
            value={examSessionSelected}
            onChange={handleExamSessionChange}
            placeholder='Chọn kì thi bạn đã tham gia'
            // filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={examSessions?.map((item) => ({
              value: item.value,
              label: item.text,
            }))}
          />
        </div>
        <div className={cx("msv-box")}>
          <Input
            className='full-width'
            value={msv ?? ""}
            onChange={(e) => handleMsvChange(e.target.value)}
            type='text'
            placeholder='Nhập mã sinh viên'
          />
          <Button loading={loading} onClick={handleLookup} className={cx("btn-lookup")} type='primary'>
            Tra cứu
          </Button>
        </div>
      </div>
      {isSubmitted && (
        <div className={cx("test-score-lookup-result")}>
          <div className={cx("result-header")}>Kết quả tra cứu</div>
          <div className={cx("result-body")}>
            {checkpoints && checkpoints.length > 0 ? (
              checkpoints?.map((item, index) => (
                <div key={index} className={cx("result-item")}>
                  <div className={cx("item")}>
                    <span className={cx("title")}>Mã sinh viên</span>
                    <span className={cx("result")}>: {item.studentCode}</span>
                  </div>
                  <div className={cx("item")}>
                    <span className={cx("title")}>Họ và tên</span>
                    <span className={cx("result")}>: {item.fullName}</span>
                  </div>
                  <div className={cx("item")}>
                    <span className={cx("title")}>Ngày sinh</span>
                    <span className={cx("result")}>: {item.dateOfBirth}</span>
                  </div>
                  <div className={cx("table-score")}>
                    <div className={cx("table-header")}>Điểm số</div>
                    <div className={cx("table-body")}>
                      <div className={cx("table-item")}>
                        <span className={cx("title")}>Nghe</span>
                        <span className={cx("result")}>{item.listeningScore}</span>
                      </div>
                      <div className={cx("table-item")}>
                        <span className={cx("title")}>Đọc</span>
                        <span className={cx("result")}>{item.readingScore}</span>
                      </div>
                      <div className={cx("table-item")}>
                        <span className={cx("title")}>Nói</span>
                        <span className={cx("result")}>{item.writingScore}</span>
                      </div>
                      <div className={cx("table-item")}>
                        <span className={cx("title")}>Viết</span>
                        <span className={cx("result")}>{item.speakingScore}</span>
                      </div>
                    </div>
                    <div className={cx("table-footer")}>Tổng điểm: {item.totalScore}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("empty-result")}>
                <img className={cx("empty-image")} src='/empty-image.png' alt='empty-result' />
                <span className={cx("empty-text")}>Không có kết quả nào được tìm thấy!</span>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TestScoreLookup;
