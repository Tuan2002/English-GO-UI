import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { UserActions } from "@/stores/userStore/userReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModalCreateUser.module.scss";
import classNames from "classnames/bind";
import { Button, Form, Input, Select, FormProps } from "antd";
import { useRef, useState } from "react";
import { ICreateUserPayload } from "@/types/user/UserType";
import { EGroupRoles } from "@/constants/GroupRole";
import Uploadimage from "@/components/UploadImage";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
const cx = classNames.bind(style);

type FieldType = {
  username?: string;
  fullName?: string;
  groupRoleId?: string;
  avatar?: string;
};

const ModalCreateUser = () => {
  const { openModalCreateUser, isSubmitting } = useSelector((state: RootState) => state.userStore);
  const { groupRoles } = useSelector((state: RootState) => state.appStore);
  const [avatarFile, setAvatarFile] = useState<any | null>(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch(UserActions.closeModalCreateUser());
  };
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const initialValues = {
    username: "",
    fullName: "",
    groupRoleId: EGroupRoles.CONTESTANT,
    avatar: "",
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    dispatch(UserActions.changeSubmitting(true));
    let avatar = undefined;
    if (avatarFile) {
      const uploadImage = await uploadService.uploadAnImage(avatarFile, CloudPresets.AVATAR);
      if (uploadImage.data.public_id) {
        avatar = uploadImage.data.secure_url;
      }
    }
    const data: ICreateUserPayload = {
      username: values.username || "",
      fullName: values.fullName || "",
      groupRoleId: values.groupRoleId || "",
      avatar: avatar,
      password: "123123",
    };
    await dispatch<any>(
      UserActions.createNewUser({
        data,
        callback: () => {
          form.resetFields();
          setAvatarFile(null);
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
        open={openModalCreateUser}
        onCancel={onCancel}
        isLoading={isSubmitting}
      >
        <div className={cx("modal-content")}>
          <div className={cx("avatar")}>
            <Uploadimage onChangeImage={setAvatarFile} type='avatar' />
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
              name='username'
              label='Username'
              rules={[
                { required: true, message: "Vui lòng nhập tài khoản của người dùng" },
                { type: "string", min: 6, message: "Tài khoản của người dùng không được dưới 6 kí tự" },
              ]}
            >
              <Input size='large' placeholder='Tài khoản của người dùng' />
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
export default ModalCreateUser;
