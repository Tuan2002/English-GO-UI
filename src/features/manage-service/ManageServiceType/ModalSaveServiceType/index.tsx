import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { IAppResposeBase } from "@/types/AppType";
import { ICreatePlanType, IPlanAttribute } from "@/types/plan/PlanTypes";
import { Button, Drawer, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddAttribute from "./AddAttribute";
import AttributeItem from "./AttributeItem";
import style from "./ModalSaveServiceType.module.scss";
const cx = classNames.bind(style);
type FieldType = {
  id?: string;
  name: string;
  displayName: string;
  description: string;
};

const initialValues = {
  id: null,
  name: "",
  displayName: "",
  description: "",
};
const initialAttributeData: IPlanAttribute = {
  id: "",
  name: "",
  displayName: "",
  dataType: "string",
  note: "",
  isDefault: false,
};
const ModalSaveServiceType = () => {
  const { openModalSaveServiceType, isSubmitting, actionModal, listGeneralPlanAttributes } = useSelector(
    (state: RootState) => state.planStore
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [listAttributes, setListAttributes] = useState<IPlanAttribute[]>([]);
  const [attributeData, setAttributeData] = useState<IPlanAttribute | null>(initialAttributeData);
  const [saveAttributeAction, setSaveAttributeAction] = useState<"create" | "update">("create");
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch(PlanActions.changeOpenModalSaveServiceType(false));
  };
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const onOke = () => {
    if (saveBtnRef.current) {
      saveBtnRef.current.click();
    }
  };
  const onFinish = (values: FieldType) => {
    if (listAttributes.length === 0) {
      toast.error("Vui lòng thêm thông tin bổ sung");
      return;
    }
    const data: ICreatePlanType = {
      name: values.name,
      displayName: values.displayName,
      description: values.description,
      planAttributes: listAttributes,
    };
    dispatch(PlanActions.createNewPlanType(data)).then((res) => {
      if ((res.payload as IAppResposeBase<null>).success) {
        form.resetFields();
        setListAttributes([]);
      }
    });
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleSaveAttribute = (attribute: IPlanAttribute) => {
    const check = listAttributes.find((item) => item.name === attribute.name);
    if (saveAttributeAction === "create") {
      if (check) {
        toast.error("Thuộc tính đã tồn tại");
        return;
      } else {
        if (!attribute.id) {
          attribute.id = Math.random().toString();
        }
        setListAttributes([...listAttributes, attribute]);
        setAttributeData(attribute);
        setOpenDrawer(false);
      }
    } else {
      if (check && check.id !== attribute.id) {
        toast.error("Thuộc tính đã tồn tại");
        return;
      }
      const newList = listAttributes.map((item) => {
        if (item.id === attribute.id) {
          return attribute;
        }
        return item;
      });
      setListAttributes(newList);
      setAttributeData(attribute);
      setOpenDrawer(false);
    }
  };
  const handleUpdate = (id: string) => {
    const checkInGeneral = listGeneralPlanAttributes.find((item) => item.id === id);
    if (checkInGeneral) {
      toast.error("Không thể sửa thuộc tính mặc định");
      return;
    }
    const attribute = listAttributes.find((item) => item.id === id);

    if (attribute) {
      setAttributeData(attribute);
      setOpenDrawer(true);
      setSaveAttributeAction("update");
    }
  };
  const handleAddAttribute = () => {
    setAttributeData(null);
    setOpenDrawer(true);
    setSaveAttributeAction("create");
  };
  const handleDeleteAttribute = (id: string) => {
    const checkInGeneral = listGeneralPlanAttributes.find((item) => item.id === id);
    if (checkInGeneral) {
      toast.error("Không thể xóa thuộc tính mặc định");
      return;
    }
    const newList = listAttributes.filter((item) => item.id !== id);
    setListAttributes(newList);
  };

  return (
    <ModalCustom
      onOK={onOke}
      width={500}
      modalTitle='Thêm loại dịch vụ'
      scrollBody
      open={openModalSaveServiceType}
      onCancel={onCancel}
      isLoading={isSubmitting}
      disableActions={openDrawer}
    >
      <div className={cx("modal-save-service-type-box")}>
        <div className={cx("modal-save-service-type")}>
          <Form
            initialValues={initialValues}
            form={form}
            name='saveUserForm'
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
          >
            <Input type='hidden' name='id' />
            <Form.Item<FieldType>
              name='name'
              label='Mã loại dịch vụ'
              rules={[{ required: true, message: "Vui lòng nhập mã của thuộc tính" }]}
            >
              <Input disabled={actionModal === "update"} size='large' placeholder='Mã loại dịch vụ' />
            </Form.Item>
            <Form.Item<FieldType>
              name='displayName'
              label='Tên hiển thị'
              rules={[{ required: true, message: "Vui lòng nhập tên hiển thị của thuộc tính" }]}
            >
              <Input size='large' placeholder='Tên hiển thị của thuộc tính' />
            </Form.Item>

            <Form.Item<FieldType>
              name='description'
              label='Thông tin mô tả'
              rules={[{ required: true, message: "Vui lòng nhập thêm thông tin mô tả" }]}
            >
              <TextArea aria-multiline size='large' placeholder='Nhập thông tin mô tả' />
            </Form.Item>
            <Form.Item hidden>
              <Button ref={saveBtnRef} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className={cx("service-attributes-box")}>
            <div className={cx("header-box")}>
              <span className={cx("title")}>Các thông tin bổ sung</span>
            </div>
            <div className={cx("list-attributes")}>
              {listGeneralPlanAttributes?.map((item, index) => (
                <AttributeItem
                  index={index + 1}
                  onEdit={handleUpdate}
                  onDelete={handleDeleteAttribute}
                  attribute={item}
                  key={item.id}
                />
              ))}
              {listAttributes?.map((item, index) => (
                <AttributeItem
                  index={listGeneralPlanAttributes.length + index + 1}
                  onEdit={handleUpdate}
                  onDelete={handleDeleteAttribute}
                  attribute={item}
                  key={index}
                />
              ))}
            </div>
            <div className='d-flex justify-content-center mt-10'>
              <span onClick={handleAddAttribute} className={cx("button")}>
                +
              </span>
            </div>
          </div>
        </div>
        <Drawer
          mask={false}
          placement='right'
          closable={false}
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          width={"100%"}
          getContainer={false}
        >
          <AddAttribute defaultValue={attributeData} handleSaveAttribute={handleSaveAttribute} onCancel={handleCloseDrawer} />
        </Drawer>
      </div>
    </ModalCustom>
  );
};
export default ModalSaveServiceType;
