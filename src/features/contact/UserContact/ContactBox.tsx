import HeaderBox from "@/components/HeaderBox";
import { Button, Col, Form, Input, Row } from "antd";
import style from "./UserContact.module.scss";
import classNames from "classnames/bind";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { FeedbackActions } from "@/stores/feedbackStore/feedbackReducer";
import { ISendFeedbackData } from "@/types/feedback/FeedbackTypes";
import { IAppResposeBase } from "@/types/AppType";
const cx = classNames.bind(style);

type FieldType = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  feedback?: string;
};

const ContactBox = () => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { isSubmiting } = useSelector((state: RootState) => state.feedbackStore);
  const onFinish = (values: FieldType) => {
    dispatch(FeedbackActions.sendFeedback(values as ISendFeedbackData)).then((res) => {
      const payload = res.payload as IAppResposeBase<null>;
      if (payload.success) {
        form.resetFields();
      } else {
        console.log("Error", payload.message);
      }
    });
  };
  return (
    <div className={cx("contact-box")}>
      <HeaderBox title='Liên hệ với chúng tôi' isUpperCase={true} maxWidth='100%' />
      <Row>
        <Col xs={24} lg={12}>
          <div className={cx("contact-info-box")}>
            <div className={cx("contact-info")}>
              <div className={cx("contact-img-left")}></div>
              <div className={cx("contact-img-right")}></div>
              <div className={cx("contact-info-header")}>Thông tin liên hệ</div>
              <div className={cx("contact-list")}>
                <div className={cx("contact-item")}>
                  <div className={cx("contact-item-avatar")}>
                    <img className={cx("avatar")} src='/avatar-ntq.png' />
                  </div>
                  <div className={cx("contact-item-info")}>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Họ và tên:</span>
                      <span className={cx("contact-info-sub-title")}>Nguyễn Tạ Quyền</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Email:</span>
                      <span className={cx("contact-info-sub-title")}>ta2k3quyen@gmail.com</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Điện thoại:</span>
                      <span className={cx("contact-info-sub-title")}>0867168267</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Vị trí:</span>
                      <span className={cx("contact-info-sub-title")}>Chịu trách nhiệm sản xuất</span>
                    </div>
                  </div>
                </div>
                <div className={cx("contact-item")}>
                  <div className={cx("contact-item-avatar")}>
                    <img className={cx("avatar")} src='/avatar-ntq.png' />
                  </div>
                  <div className={cx("contact-item-info")}>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Họ và tên:</span>
                      <span className={cx("contact-info-sub-title")}>Nguyễn Thị Minh Tâm</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Email:</span>
                      <span className={cx("contact-info-sub-title")}>ta2k3quyen@gmail.com</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Điện thoại:</span>
                      <span className={cx("contact-info-sub-title")}>0867168267</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Vị trí:</span>
                      <span className={cx("contact-info-sub-title")}>Hỗ trợ thực hiện</span>
                    </div>
                  </div>
                </div>
                <div className={cx("contact-item")}>
                  <div className={cx("contact-item-avatar")}>
                    <img className={cx("avatar")} src='/avatar-ntq.png' />
                  </div>
                  <div className={cx("contact-item-info")}>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Họ và tên:</span>
                      <span className={cx("contact-info-sub-title")}>Nguyễn Tạ Quyền</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Email:</span>
                      <span className={cx("contact-info-sub-title")}>ta2k3quyen@gmail.com</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Điện thoại:</span>
                      <span className={cx("contact-info-sub-title")}>0867168267</span>
                    </div>
                    <div className={cx("contact-info-item")}>
                      <span className={cx("contact-info-title")}>Vị trí:</span>
                      <span className={cx("contact-info-sub-title")}>Chịu trách nhiệm sản xuất</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div className={cx("contact-info-box")}>
            <div className={cx("contact-form")}>
              <div className={cx("contact-img-left")}></div>
              <div className={cx("contact-img-right")}></div>
              <div className={cx("contact-form-bg-1")}>
                <div className={cx("contact-img-center")}></div>
                <div className={cx("contact-info-header")}>Liên hệ </div>
              </div>
              <div className={cx("contact-form-box")}>
                <Form form={form} name='saveUserForm' layout='vertical' onFinish={onFinish} autoComplete='off'>
                  <Form.Item<FieldType>
                    name='fullName'
                    label='Họ và tên'
                    rules={[{ required: true, message: "Vui lòng điền họ và tên của bạn!" }]}
                  >
                    <Input size='large' placeholder='Điền họ và tên của bạn...' />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name='email'
                    label='Email'
                    rules={[{ required: true, message: "Vui lòng điền email của bạn!" }]}
                  >
                    <Input size='large' placeholder='Điền email của bạn...' />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name='phoneNumber'
                    label='Số điện thoại'
                    rules={[{ required: true, message: "Vui lòng điền số điện thoại của bạn!" }]}
                  >
                    <Input size='large' placeholder='Điền số điện thoại liên hệ của bạn...' />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name='feedback'
                    label='Thông tin phản hồi'
                    rules={[{ required: true, message: "Vui lòng điền thông tin phản hồi của bạn!" }]}
                  >
                    <Input.TextArea size='large' placeholder='Nhập nội dung bạn muốn phản hồi...' />
                  </Form.Item>
                  <Form.Item>
                    <Button loading={isSubmiting} size='large' className='full-width' type='primary' htmlType='submit'>
                      Gửi phản hồi
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ContactBox;
