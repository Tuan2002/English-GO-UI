import CardCustom from "@/components/Card";
import TextEditor from "@/components/TextEditor";
import Uploadimage from "@/components/UploadImage";
import { CloudPresets } from "@/constants/CloudPreset";
import ROUTE_PATH from "@/routes/routePath";
import uploadService from "@/services/uploadService";
import { AppDispatch, RootState } from "@/stores";
import { ExaminerIntroductionActions } from "@/stores/examinerIntroduciton/examinerReducer";
import { IAppResposeBase } from "@/types/AppType";
import { IExaminerIntroduction } from "@/types/examinerIntroduction/ExaminerIntroductionTypes";
import { Button, Form, Input } from "antd";
import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./UpdateExaminerIntroduction.module.scss";
const cx = classNames.bind(style);
type FieldType = {
  avatar?: string;
  banner?: string;
  description?: string;
  workPlace?: string;
  workAddress?: string;
  introduction?: string;
};
const UpdateExaminerIntroduction = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm();
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const [bannerFile, setBannerFile] = useState<Blob | null>(null);
  const { myExaminerIntroduction } = useSelector((state: RootState) => state.examinerIntroductionStore);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const initialValues = useMemo(() => {
    return {
      description: myExaminerIntroduction?.description,
      workPlace: myExaminerIntroduction?.workPlace,
      workAddress: myExaminerIntroduction?.workAddress,
      introduction: myExaminerIntroduction?.introduction,
    };
  }, [myExaminerIntroduction]);
  const onFinish = async (values: FieldType) => {
    dispatch(ExaminerIntroductionActions.changeIsSubmitting(true));
    let oldBanner = myExaminerIntroduction?.banner;
    if (bannerFile) {
      const uploadImage = await uploadService.uploadAnImage(bannerFile as File, CloudPresets.IMAGE);
      if (uploadImage.data.public_id) {
        oldBanner = uploadImage.data.secure_url;
      }
    }
    const dataUpdate: IExaminerIntroduction = {
      ...myExaminerIntroduction,
      id: myExaminerIntroduction?.id ?? "",
      userId: currentUser?.id ?? "",
      description: values.description,
      workPlace: values.workPlace,
      workAddress: values.workAddress,
      introduction: values.introduction,
      banner: oldBanner,
    };
    dispatch(ExaminerIntroductionActions.updateMyIntroduction(dataUpdate)).then((res) => {
      if ((res.payload as IAppResposeBase<unknown>).success) {
        navigate(ROUTE_PATH.EXAMINER_INTRODUCTION);
      }
    });
  };
  const handleSaveUpdate = () => {
    saveBtnRef.current?.click();
  };
  useEffect(() => {
    form.setFieldsValue({
      description: myExaminerIntroduction?.description,
      workPlace: myExaminerIntroduction?.workPlace,
      workAddress: myExaminerIntroduction?.workAddress,
      introduction: myExaminerIntroduction?.introduction,
    });
  }, [myExaminerIntroduction?.id]);
  return (
    <CardCustom
      title='Cập nhật thông tin giới thiệu'
      showBackButton
      cardHeader={
        <div className='d-flex justify-content-between align-items-center'>
          <span>Thông tin giới thiệu</span>
          <Button type='primary' onClick={handleSaveUpdate}>
            Lưu lại
          </Button>
        </div>
      }
      fullHeight
    >
      <div className={cx("update-examiner-introduction")}>
        <div className={cx("update-examiner-introduction-box")}>
          <div className={cx("header-box")}>
            <div className={cx("avatar")}>
              <Uploadimage disabled defaultImage={currentUser?.avatar} type='avatar' />
            </div>
            <Uploadimage onChangeImage={setBannerFile} defaultImage={myExaminerIntroduction?.banner} type='cover' />
          </div>
          <div className={cx("form-box")}>
            <Form
              form={form}
              name='saveUserForm'
              layout='vertical'
              onFinish={onFinish}
              autoComplete='off'
              initialValues={initialValues}
            >
              <Form.Item<FieldType> name='description' label='Mô tả ngắn về bản thân'>
                <Input size='large' placeholder='Nhập mô tả về bản thân bạn (khoảng 50 đến 100 từ)' />
              </Form.Item>

              <Form.Item<FieldType> name='workPlace' label='Đơn vị công tác'>
                <Input size='large' placeholder='Nhập tên đơn vị công tác của bạn' />
              </Form.Item>

              <Form.Item<FieldType> name='workAddress' label='Địa chỉ'>
                <Input size='large' placeholder='Nhập địa chỉ nơi bạn đang làm việc' />
              </Form.Item>

              <Form.Item<FieldType> name='introduction' label='Giới thiệu về bản thân'>
                <TextEditor
                  showToolbar={true}
                  height={350}
                  value={""}
                  onChange={() => {}}
                  placeholder='Nhập thông tin giới thiệu của bạn (Hãy giới thiệu chi tiết để tạo sức hút với các thí sinh)'
                />
              </Form.Item>

              <Form.Item hidden>
                <Button ref={saveBtnRef} type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </CardCustom>
  );
};
export default UpdateExaminerIntroduction;
