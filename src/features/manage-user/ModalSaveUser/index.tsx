import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { UserActions } from "@/stores/userStore/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { BiCamera } from "react-icons/bi";
import style from "./ModalSaveUser.module.scss";
import classNames from "classnames/bind";
import { Avatar, Button, Form, Input, Select, FormProps } from "antd";
import React, { useRef } from "react";
import { ICreateUserPayload } from "@/types/user/UserType";
const cx = classNames.bind(style);

type FieldType = {
  email?: string;
  fullName?: string;
  groupRoleId?: string;
  avatar?: string;
};

const ModalSaveUser = () => {
  const { openModalSaveUser, isSubmitting } = useSelector((state: RootState) => state.userStore);
  const { groupRoles } = useSelector((state: RootState) => state.appStore);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch(UserActions.closeModalSaveUser());
  };
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const initialValues = {
    email: "",
    fullName: "",
    groupRoleId: "4",
    avatar: "",
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    const data: ICreateUserPayload = {
      email: values.email || "",
      fullName: values.fullName || "",
      groupRoleId: values.groupRoleId || "",
      avatar: values.avatar,
      password: "123123",
    };
    await dispatch<any>(
      UserActions.createNewUser({
        data,
        callback: () => {
          form.resetFields();
        },
      })
    );
  };

  const onOke = () => {
    if (saveBtnRef.current) {
      saveBtnRef.current.click();
    }
  };

  return (
    <div>
      <ModalCustom
        onOK={onOke}
        width={500}
        modalTitle='Thêm mới người dùng'
        scrollBody
        open={openModalSaveUser}
        onCancel={onCancel}
        isLoading={isSubmitting}
      >
        <div className={cx("modal-content")}>
          <div className={cx("avatar")}>
            <div className={cx("avatar-box")}>
              <Avatar size={100} src='/src/assets/user.svg' />
              <label className={cx("camera-icon")} htmlFor='chooseAvatar'>
                <BiCamera />
              </label>
            </div>
          </div>
          <Form
            form={form}
            name='saveUserForm'
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
            initialValues={initialValues}
          >
            <Form.Item<FieldType> name='avatar' hidden>
              <Input type='file' id='chooseAvatar' />
            </Form.Item>
            <Form.Item<FieldType>
              name='email'
              label='Email'
              rules={[
                { required: true, message: "Vui lòng nhập email của người dùng" },
                { type: "string", min: 6, message: "Email của người dùng không được dưới 6 kí tự" },
              ]}
            >
              <Input size='large' placeholder='Email của người dùng' />
            </Form.Item>
            <Form.Item<FieldType>
              name='fullName'
              label='Họ và tên'
              rules={[{ required: true, message: "Vui lòng nhập họ tên đầy đủ của người dùng" }]}
            >
              <Input size='large' placeholder='Họ và tên người dùng' />
            </Form.Item>
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
            <Form.Item hidden>
              <Button ref={saveBtnRef} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ModalCustom>
    </div>
  );
};
export default ModalSaveUser;
