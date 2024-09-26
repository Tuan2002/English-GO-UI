import { Avatar, Button, Col, Form, Input, Row, Select } from "antd";
import { BiCamera, BiRightArrowAlt } from "react-icons/bi";
import style from "./CompanyInfomationForm.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useEffect, useState } from "react";
import { ISelectOption } from "@/types/AppType";
import { ICompany, IRegisterCompany } from "@/types/company/CompanyType";
import TextEditor from "@/components/TextEditor";
import Uploadimage from "@/components/UploadImage";
const cx = classNames.bind(style);

interface ICompanyInfomationFormProps {
  company?: ICompany;
  disabledForm?: boolean;
}

const CompanyInfomationForm = ({ company, disabledForm = false }: ICompanyInfomationFormProps) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { provinces, memberCounts } = useSelector((state: RootState) => state.generalStore);
  const { isSubmitting } = useSelector((state: RootState) => state.companyStore);
  const [provinceOptions, setProvinceOptions] = useState<ISelectOption[]>([]);
  const [memberCountOptions, setMemberCountOptions] = useState<ISelectOption[]>([]);
  const [companyIntroduce, setCompanyIntroduce] = useState<string>("");

  const handleChangeCompanyIntroduce = (value: string) => {
    setCompanyIntroduce(value);
  };
  const handleResetField = () => {
    if (!company) return;
    form.setFieldsValue({
      companyName: company.companyName,
      taxCode: company.taxCode,
      companyWebsite: company.companyWebsite,
      companyEmail: company.companyEmail,
      phoneNumber: company.phoneNumber,
      provinceId: company.province.id,
      companyAddress: company.companyAddress,
      companyDescription: company.companyDescription,
      memberCountId: company.memberCount.id,
    });
    handleChangeCompanyIntroduce(company.companyIntroduce || "");
  };

  useEffect(() => {
    handleResetField();
  }, [company]);

  useEffect(() => {}, [memberCountOptions]);
  const onFinish = async (values: any) => {
    const dataRegister: IRegisterCompany = {
      id: company?.id,
      companyName: values.companyName,
      companyBanner: "",
      companyLogo: "",
      taxCode: values.taxCode,
      companyWebsite: values.companyWebsite,
      companyEmail: values.companyEmail,
      phoneNumber: values.phoneNumber,
      provinceId: values.provinceId,
      companyAddress: values.companyAddress,
      companyIntroduce: companyIntroduce,
      memberCountId: values.memberCountId,
      companyDescription: values.companyDescription,
    };
    console.log(dataRegister);
  };

  useEffect(() => {
    if (!provinces || provinces.length === 0) return;
    const options = provinces.map((item) => ({
      value: item.id,
      label: item.provinceName,
    }));
    setProvinceOptions(options);
    form.setFieldsValue({
      provinceId: options[0].value,
    });
  }, [provinces]);
  useEffect(() => {
    if (!memberCounts || memberCounts.length === 0) return;
    const options = memberCounts.map((item) => ({
      value: item.id,
      label: item.displayName,
    }));
    setMemberCountOptions(options);
    form.setFieldsValue({
      memberCountId: options[0].value,
    });
  }, [memberCounts]);
  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("form")}>
        <div className={cx("header")}>
          <div className={cx("banner")}>
            <Uploadimage type='cover' />
          </div>
          <div className={cx("avatar")}>
            <Uploadimage type='avatar' />
          </div>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} disabled={disabledForm}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                label={<span className='font-weight-500'>Tên công ty</span>}
                name='companyName'
                rules={[{ required: true, message: "Tên công ty không được để trống" }]}
              >
                <Input variant='filled' size='large' type='text' className={cx("input")} placeholder='Nhập tên công ty của bạn' />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label={<span className='font-weight-500'>Mã số thuế</span>} name='taxCode'>
                <Input
                  variant='filled'
                  size='large'
                  type='text'
                  className={cx("input")}
                  placeholder='Nhập mã số thuế của công ty'
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={16}>
              <Form.Item label={<span className='font-weight-500'>Website</span>} name='companyWebsite'>
                <Input
                  variant='filled'
                  size='large'
                  type='text'
                  className={cx("input")}
                  placeholder='Nhập địa chỉ website công ty'
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                rules={[{ required: true, message: "Chọn số lượng nhân viên" }]}
                label={<span className='font-weight-500'>Số lượng nhân viên</span>}
                name='memberCountId'
              >
                <Select
                  size='large'
                  variant='filled'
                  className='full-width'
                  placeholder='Số lượng nhân viên'
                  // onChange={handleChange}
                  options={memberCountOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                rules={[{ required: true, message: "Email của công ty không được để trống" }]}
                label={<span className='font-weight-500'>Email</span>}
                name='companyEmail'
              >
                <Input variant='filled' size='large' type='email' className={cx("input")} placeholder='Nhập email của công ty' />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label={<span className='font-weight-500'>Số điện thoại</span>} name='phoneNumber'>
                <Input
                  variant='filled'
                  size='large'
                  type='text'
                  className={cx("input")}
                  placeholder='Nhập số điện thoại liên hệ của công ty'
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                rules={[{ required: true, message: "Tỉnh thành làm việc không được để trống" }]}
                label={<span className='font-weight-500'>Tỉnh thành làm việc</span>}
                name='provinceId'
              >
                <Select
                  size='large'
                  variant='filled'
                  className='full-width'
                  placeholder='Tỉnh thành làm việc'
                  // onChange={handleChange}
                  options={provinceOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={16}>
              <Form.Item
                rules={[{ required: true, message: "Địa chỉ chi tiết không được để trống" }]}
                label={<span className='font-weight-500'>Địa chỉ chi tiết</span>}
                name='companyAddress'
              >
                <Input
                  variant='filled'
                  size='large'
                  type='text'
                  className={cx("input")}
                  placeholder='Nhập số điện thoại liên hệ của công ty'
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Mô tả công ty không được để trống" }]}
                label={<span className='font-weight-500'>Mô tả ngắn về công ty</span>}
                name='companyDescription'
              >
                <TextArea
                  variant='filled'
                  aria-multiline
                  size='large'
                  className={cx("input")}
                  placeholder='Nhập thông tin mô tả về công ty'
                  maxLength={1000}
                  rows={5}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <div>
                <span className='font-weight-500'>Giới thiệu công ty</span>
                <TextEditor disabled={disabledForm} value={companyIntroduce} onChange={handleChangeCompanyIntroduce} />
              </div>
            </Col>
            <Button className='ml-10 d-none' loading={isSubmitting} type='primary' size='large' htmlType='submit'>
              Lưu cập nhật
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default CompanyInfomationForm;
