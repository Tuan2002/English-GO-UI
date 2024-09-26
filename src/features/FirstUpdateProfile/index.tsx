import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./FirstUpdateProfile.module.scss";
import classNames from "classnames/bind";
import { Button, Col, DatePicker, Form, FormProps, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import Uploadimage from "@/components/UploadImage";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
import { IUpdateProfilePayload } from "@/types/user/UserType";
import GenderStatus from "@/constants/GenderStatus";
import { authThunks } from "@/stores/authStore/authThunks";
import { authAction } from "@/stores/authStore/authReducer";
const cx = classNames.bind(style);
type FieldType = {
  email?: string;
  fullName?: string;
  birthday?: string;
  gender?: GenderStatus;
  phoneNumber?: string;
  avatar?: string;
};
const FirstUpdateProfile = () => {
  const { currentUser, isOpenModalFirstUpdate, isSubmitting } = useSelector((state: RootState) => state.authStore);
  const [avatarFile, setAvatarFile] = useState<any | null>(null);
  const [bannerFile, setBannerFile] = useState<any | null>(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const initialValues = {
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
    // create a service to upload image and delete old image in cloudinary
    // save image to cloudinary and get url to save to database
    // if user used to upload image, delete old image in cloudinary before upload new image
    // if call api error, restore old image
    let avatar = currentUser?.avatar;
    let banner = currentUser?.banner;
    if (avatarFile) {
      const uploadImage = await uploadService.uploadAnImage(avatarFile, CloudPresets.AVATAR);
      if (uploadImage.data.public_id) {
        avatar = uploadImage.data.secure_url;
      }
      if (currentUser?.avatar) {
        await uploadService.deleteAnImage(currentUser?.avatar ?? "");
      }
    }
    if (bannerFile) {
      const uploadImage = await uploadService.uploadAnImage(bannerFile, CloudPresets.AVATAR);
      if (uploadImage.data.public_id) {
        banner = uploadImage.data.secure_url;
      }
      if (currentUser?.banner) {
        await uploadService.deleteAnImage(currentUser?.banner ?? "");
      }
    }
    const data: IUpdateProfilePayload = {
      id: currentUser?.id ?? "",
      fullName: values.fullName ?? "",
      birthday: values.birthday ?? "",
      phoneNumber: values.phoneNumber ?? "",
      gender: values.gender ?? GenderStatus.MALE,
      avatar,
      banner,
    };
    dispatch<any>(authThunks.firstUpdateProfile(data));
  };

  const onOke = () => {
    if (saveBtnRef.current) {
      saveBtnRef.current.click();
    }
  };
  useEffect(() => {
    if (currentUser?.id && !currentUser?.isUpdated) {
      form.setFieldsValue({
        email: currentUser.email,
        fullName: currentUser.fullName,
        birthday: dayjs(currentUser.birthday ?? dayjs(), "DD-MM-YYYY"),
        gender: currentUser.gender,
        phoneNumber: currentUser.phoneNumber,
      });
      dispatch(authAction.changeIsOpenModalFirstUpdate(true));
    }
  }, [currentUser?.id]);
  return (
    <ModalCustom
      confirmTitle='Cập nhật'
      maskClosable={false}
      showCloseButton={false}
      cancelTitle='Để sau'
      isLoading={isSubmitting}
      modalTitle='Cập nhật thông tin'
      width={500}
      scrollBody
      open={isOpenModalFirstUpdate}
      onOK={onOke}
      onCancel={() => dispatch(authAction.changeIsOpenModalFirstUpdate(false))}
    >
      <div className={cx("update-profile-wrapper")}>
        <div className={cx("header", "text-center")}>
          <h3 className={cx("title")}>Chào mừng bạn đến với JobViet</h3>
          <p className={cx("description")}>Vui lòng cập nhật thông tin cá nhân của bạn để sử dụng hệ thống!</p>
        </div>
        <div className={cx("banner-box")}>
          <Uploadimage onChangeImage={setBannerFile} type='cover' defaultImage={currentUser?.banner} />
          <div className={cx("avatar")}>
            <Uploadimage onChangeImage={setAvatarFile} defaultImage={currentUser?.avatar} type='avatar' />
          </div>
        </div>
        <div className={cx("form")}>
          <Form
            form={form}
            name='saveUserForm'
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
            initialValues={initialValues}
          >
            <Form.Item<FieldType> name='email' label='Email'>
              <Input disabled size='large' placeholder='Email của người dùng' />
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
            <Form.Item<FieldType> name='phoneNumber' label='Điện thoại'>
              <Input size='large' placeholder='Số điện thoại liên hệ của bạn' />
            </Form.Item>

            <Form.Item hidden>
              <Button ref={saveBtnRef} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ModalCustom>
  );
};
export default FirstUpdateProfile;
