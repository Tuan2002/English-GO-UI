/* eslint-disable @typescript-eslint/no-explicit-any */
import Uploadimage from "@/components/UploadImage";
import { CloudPresets } from "@/constants/CloudPreset";
import GenderStatus from "@/constants/GenderStatus";
import uploadService from "@/services/uploadService";
import { AppDispatch, RootState } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import { IUpdateProfilePayload } from "@/types/user/UserType";
import { Button, Col, DatePicker, Form, FormProps, Input, Row, Select } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./UpdateProfile.module.scss";

const cx = classNames.bind(style);

type FieldType = {
  username?: string;
  email?: string;
  fullName?: string;
  birthday?: string;
  gender?: GenderStatus;
  phoneNumber?: string;
  avatar?: string;
};

interface IUpdateProfileProps {
  isDisabled?: boolean;
}

const UpdateProfile = forwardRef(({ isDisabled = true }: IUpdateProfileProps, ref) => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const [avatarFile, setAvatarFile] = useState<any | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const initialValues = {
    username: "",
    email: "",
    fullName: "",
    birthday: dayjs(),
    gender: GenderStatus.MALE,
    phoneNumber: "",
    avatar: "",
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    values.birthday = dayjs(values.birthday).format("DD/MM/YYYY");
    dispatch(authAction.changeIsSubmitting(true));
    let avatar = currentUser?.avatar;
    if (avatarFile) {
      const uploadImage = await uploadService.uploadAnImage(avatarFile, CloudPresets.IMAGE);
      if (uploadImage.data.public_id) {
        avatar = uploadImage.data.secure_url;
      }
      if (currentUser?.avatar) {
        await uploadService.deleteAnImage(currentUser?.avatar ?? "");
      }
    }
    const data: IUpdateProfilePayload = {
      id: currentUser?.id ?? "",
      fullName: values.fullName ?? "",
      email: values.email ?? "",
      birthday: values.birthday ?? "",
      phoneNumber: values.phoneNumber ?? "",
      gender: values.gender ?? GenderStatus.MALE,
      avatar,
    };
    dispatch(authAction.firstUpdateProfile(data));
  };

  const onOke = () => {
    if (saveBtnRef.current) {
      saveBtnRef.current.click();
    }
  };

  useImperativeHandle(ref, () => ({
    onOke,
  }));

  useEffect(() => {
    if (currentUser?.id) {
      form.setFieldsValue({
        username: currentUser.username,
        email: currentUser.email,
        fullName: currentUser.fullName,
        birthday: dayjs(currentUser.birthday ?? dayjs(), "DD-MM-YYYY"),
        gender: currentUser.gender,
        phoneNumber: currentUser.phoneNumber,
      });
    }
  }, [currentUser?.id]);

  return (
    <div className={cx("update-profile-wrapper")}>
      <div className={cx("avatar")}>
        <Uploadimage onChangeImage={setAvatarFile} defaultImage={currentUser?.avatar} type='avatar' />
      </div>
      <div className={cx("form")}>
        <Form
          form={form}
          name='saveUserForm'
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
          initialValues={initialValues}
          disabled={isDisabled}
        >
          <Form.Item<FieldType> name='username' label='Tên tài khoản'>
            <Input disabled size='large' placeholder='Nhập tên tài khoản của bạn' />
          </Form.Item>

          <Form.Item<FieldType>
            name='fullName'
            label='Họ và tên'
            rules={[{ required: true, message: "Vui lòng nhập họ tên đầy đủ của người dùng" }]}
          >
            <Input size='large' placeholder='Họ và tên người dùng' />
          </Form.Item>

          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12}>
              <Form.Item<FieldType>
                name='email'
                label='Email'
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn!" },
                  {
                    type: "email",
                    message: "Email không đúng định dạng!",
                  },
                ]}
              >
                <Input size='large' placeholder='Nhập email của bạn' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item<FieldType>
                name='phoneNumber'
                label='Điện thoại'
                rules={[
                  {
                    pattern: /^[0-9]{10,11}$/, // Kiểm tra số điện thoại có 10 hoặc 11 chữ số
                    message: "Số điện thoại không đúng định dạng!",
                  },
                ]}
              >
                <Input size='large' placeholder='Số điện thoại liên hệ của bạn' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12}>
              <Form.Item<FieldType>
                name='birthday'
                label='Ngày sinh'
                rules={[{ required: true, message: "Nhập ngày sinh của bạn!" }]}
              >
                <DatePicker
                  variant='filled'
                  className='full-width'
                  clearIcon={false}
                  size='large'
                  defaultValue={dayjs(dayjs(), "DD/MM/YYYY")}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item<FieldType> name='gender' label='Giới tính'>
                <Select
                  defaultValue={GenderStatus.MALE}
                  options={[
                    { value: GenderStatus.MALE, label: "Nam" },
                    { value: GenderStatus.FEMALE, label: "Nữ" },
                    { value: GenderStatus.OTHER, label: "Khác" },
                  ]}
                  size='large'
                  variant='filled'
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item hidden>
            <Button ref={saveBtnRef} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default UpdateProfile;
