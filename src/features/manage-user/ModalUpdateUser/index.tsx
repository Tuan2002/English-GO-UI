import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { UserActions } from "@/stores/userStore/userReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModalUpdateUser.module.scss";
import classNames from "classnames/bind";
import { Button, Form, Input, Select, FormProps, Row, Col, DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";
import { IUpdateUserPayload } from "@/types/user/UserType";
import { EGroupRoles } from "@/constants/GroupRole";
import Uploadimage from "@/components/UploadImage";
import dayjs from "dayjs";
import GenderStatus from "@/constants/GenderStatus";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
const cx = classNames.bind(style);

type FieldType = {
  email?: string;
  username?: string;
  fullName?: string;
  groupRoleId?: string;
  avatar?: string;
  birthday?: string;
  gender: GenderStatus;
  phoneNumber?: string;
};

const ModalUpdateUser = () => {
  const [avatarFile, setAvatarFile] = useState<any | null>(null);
  const { openModalUpdateUser, isSubmitting, selectedUser } = useSelector((state: RootState) => state.userStore);
  const { groupRoles } = useSelector((state: RootState) => state.appStore);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [birthday, setBirthday] = useState(dayjs(dayjs(), "DD/MM/YYYY"));

  const onCancel = () => {
    dispatch(UserActions.changeSelectedUser(undefined));
    dispatch(UserActions.changeSubmitting(false));
    dispatch(UserActions.closeModalUpdateUser());
  };
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const initialValues = {
    username: "",
    email: "",
    fullName: "",
    birthday: dayjs(dayjs(), "DD/MM/YYYY"),
    groupRoleId: EGroupRoles.CONTESTANT,
    avatar: "",
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    values.birthday = dayjs(values.birthday).format("DD/MM/YYYY");
    dispatch(UserActions.changeSubmitting(true));
    let avatar = selectedUser?.avatar;
    if (avatarFile) {
      const uploadImage = await uploadService.uploadAnImage(avatarFile, CloudPresets.IMAGE);
      if (uploadImage.data.public_id) {
        avatar = uploadImage.data.secure_url;
      }
    }
    const data: IUpdateUserPayload = {
      id: selectedUser?.id ?? "",
      fullName: values.fullName ?? "",
      email: values.email ?? "",
      birthday: dayjs(birthday).format("DD/MM/YYYY"),
      phoneNumber: values.phoneNumber ?? "",
      gender: values.gender ?? GenderStatus.MALE,
      groupRoleId: values.groupRoleId ?? "",
      avatar,
    };
    dispatch<any>(UserActions.updateUser({ data, id: selectedUser?.id ?? "" }));
  };

  const onOke = () => {
    if (saveBtnRef.current) {
      saveBtnRef.current.click();
    }
  };

  useEffect(() => {
    if (selectedUser?.id) {
      form.setFieldsValue({
        username: selectedUser.username,
        email: selectedUser.email,
        fullName: selectedUser.fullName,
        birthday: dayjs(dayjs(selectedUser.birthday), "DD/MM/YYYY"),
        gender: selectedUser.gender,
        phoneNumber: selectedUser.phoneNumber,
        groupRoleId: selectedUser.groupRoleId,
      });
      setBirthday(dayjs(selectedUser?.birthday ?? dayjs(), "DD/MM/YYYY"));
    }
  }, [selectedUser?.id]);

  return (
    <ModalCustom
      confirmTitle='Cập nhật'
      maskClosable={false}
      showCloseButton={false}
      cancelTitle='Để sau'
      isLoading={isSubmitting}
      modalTitle='Cập nhật thông tin người dùng'
      width={500}
      scrollBody
      open={openModalUpdateUser}
      onOK={onOke}
      onCancel={onCancel}
    >
      <div className={cx("update-profile-wrapper")}>
        <div className={cx("avatar")}>
          <Uploadimage onChangeImage={setAvatarFile} defaultImage={selectedUser?.avatar} type='avatar' />
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
            <Form.Item<FieldType> name='username' label='Tên tài khoản'>
              <Input disabled size='large' placeholder='Nhập tên tài khoản của bạn' />
            </Form.Item>
            <Form.Item<FieldType> name='email' label='Email'>
              <Input size='large' placeholder='Nhập email của bạn' />
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
                <Form.Item<FieldType> label='Ngày sinh' rules={[{ required: true, message: "Nhập ngày sinh của bạn!" }]}>
                  <DatePicker
                    variant='filled'
                    className='full-width'
                    clearIcon={false}
                    size='large'
                    defaultValue={dayjs(dayjs(), "DD/MM/YYYY")}
                    format={"DD/MM/YYYY"}
                    value={birthday}
                    onChange={(date) => setBirthday(date)}
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
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={12}>
                <Form.Item<FieldType> name='phoneNumber' label='Điện thoại'>
                  <Input size='large' placeholder='Số điện thoại liên hệ của bạn' />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item<FieldType>
                  name='groupRoleId'
                  label='Nhóm quyền người dùng'
                  rules={[{ required: true, message: "Vui lòng phân quyền sử dụng cho người dùng" }]}
                >
                  <Select size='large' placeholder='Chọn nhóm quyền cho người dùng'>
                    {groupRoles?.map((groupRole) => (
                      <Select.Option key={groupRole.id} value={groupRole.id}>
                        {groupRole.displayName}
                      </Select.Option>
                    ))}
                  </Select>
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
    </ModalCustom>
  );
};
export default ModalUpdateUser;
