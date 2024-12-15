import CardScroll from "@/components/CardScroll";
import UpdateProfile from "@/components/UpdateProfile";
import { RootState } from "@/stores";
import { Button, Skeleton } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const LoadProfileSkelton = () => {
  return (
    <div className='text-center'>
      <Skeleton.Avatar active size={100} shape='circle' style={{ margin: "10px auto" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
      <Skeleton.Input active block size='large' style={{ height: "40px", margin: "5px 0" }} />
    </div>
  );
};

const MyProfile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const updateProfileRef = useRef<{ onOke: () => void } | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.authStore);

  const handleUpdateProfile = () => {
    setIsUpdate(true);
  };
  const handleCancel = () => {
    setIsUpdate(false);
  };
  const handleSaveUpdate = () => {
    if (updateProfileRef.current) {
      updateProfileRef.current.onOke();
    }
    setIsUpdate(false);
  };
  return (
    <CardScroll
      cardHeader={
        <div className='d-flex justify-content-between align-items-center full-width'>
          <span>Thông tin cá nhân</span>
          <div>
            {!isUpdate ? (
              <Button onClick={handleUpdateProfile} type='primary'>
                Cập nhật
              </Button>
            ) : (
              <>
                <Button danger onClick={handleCancel} type='primary'>
                  Huỷ bỏ
                </Button>
                <Button className='ml-10' onClick={handleSaveUpdate} type='primary'>
                  Lưu lại
                </Button>
              </>
            )}
          </div>
        </div>
      }
    >
      {currentUser?.id ? <UpdateProfile ref={updateProfileRef} isDisabled={!isUpdate} /> : <LoadProfileSkelton />}
    </CardScroll>
  );
};
export default MyProfile;
