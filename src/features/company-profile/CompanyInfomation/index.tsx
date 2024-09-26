import { ICompany } from "@/types/company/CompanyType";
import style from "./CompanyInfomation.module.scss";
import classNames from "classnames/bind";
import { Avatar, Col, Row } from "antd";
import {
  BiCodeAlt,
  BiCopy,
  BiCurrentLocation,
  BiGlobe,
  BiLocationPlus,
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiMailSend,
  BiPhone,
  BiSolidUserDetail,
  BiUserVoice,
} from "react-icons/bi";
import HTMLDisplay from "@/components/HtmlDisplay";
import { toast } from "react-toastify";
const cx = classNames.bind(style);

interface ICompanyInfomationProps {
  company?: ICompany;
}
const CompanyInfomation = ({ company }: ICompanyInfomationProps) => {
  const handleCopyShareLink = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Đã sao chép đường dẫn");
      })
      .catch(() => {
        toast.error("Lỗi khi sao chép đường dẫn");
      });
  };
  return (
    <div className={cx("company-infomation-wrapper")}>
      <div className={cx("header")}>
        <div
          className={cx("banner")}
          style={{
            backgroundImage: `url('https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/cong-ty-tnhh-lg-cns-viet-nam-abd4aac9f1a620d950e6125156cbcb50-642fb41dead51.jpg')`,
          }}
        ></div>
        <div className={cx("general-infomation")}>
          <Row gutter={[16, 16]} align={"middle"}>
            <Col span={6} xs={24} md={4} lg={6}>
              <div className={cx("logo")}>
                <Avatar
                  className={cx("avatar")}
                  size={120}
                  src='https://static.topcv.vn/company_logos/ngan-hang-thuong-mai-co-phan-ky-thuong-viet-nam-632bbf5a763f7.jpg'
                  alt='logo'
                />
              </div>
            </Col>
            <Col span={18} xs={24} md={20} lg={18}>
              <div className={cx("infomation")}>
                <h4 className={cx("company-name")}>{company?.companyName ?? "Tên công ty chưa được cập nhật"}</h4>
                <div className={cx("other-info")}>
                  <div className={cx("info-item")}>
                    <span className={cx("icon")}>
                      <BiGlobe />
                    </span>
                    <span>{company?.companyWebsite ?? "Website chưa cập nhật"}</span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("icon")}>
                      <BiSolidUserDetail />
                    </span>
                    <span>{company?.memberCount.displayName ?? "Số lượng nhân viên chưa cập nhật"}</span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("icon")}>
                      <BiMailSend />
                    </span>
                    <span>{company?.companyEmail ?? "Email công ty chưa cập nhật"}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={cx("body")}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={17}>
            <div className={cx("leftbox")}>
              {company?.companyDescription && (
                <div className={cx("card-info")}>
                  <div className={cx("card-header")}>Mô tả công ty</div>
                  <div className={cx("card-body")}>
                    <p>{company?.companyDescription}</p>
                  </div>
                </div>
              )}
              <div className={cx("card-info")}>
                <div className={cx("card-header")}>Thông tin chi tiết về công ty</div>
                <div className={cx("card-body")}>
                  <HTMLDisplay htmlContent={company?.companyIntroduce ?? ""} />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={7}>
            <div className={cx("rightbox")}>
              <div className={cx("card-info")}>
                <div className={cx("card-header")}>Thông tin chi tiết về công ty</div>
                <div className={cx("card-body")}>
                  <div className={cx("detail-info")}>
                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiCodeAlt />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Mã số thuế:</span>
                        <span>{company?.taxCode ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>
                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiMailSend />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Email:</span>
                        <span>{company?.companyEmail ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>

                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiPhone />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Điện thoại:</span>
                        <span>{company?.phoneNumber ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>
                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiUserVoice />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Số lượng nhân viên:</span>
                        <span>{company?.memberCount.displayName ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>
                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiGlobe />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Website:</span>
                        <span>{company?.companyWebsite ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>
                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiCurrentLocation />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Địa chỉ:</span>
                        <span>{company?.companyAddress ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>
                    <div className={cx("item")}>
                      <span className={cx("icon")}>
                        <BiLocationPlus />
                      </span>
                      <div className={cx("label")}>
                        <span className={cx("name")}>Tỉnh thành làm việc:</span>
                        <span>{company?.province.provinceName ?? "Chưa cập nhật"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("card-info")}>
                <div className={cx("card-header")}>Chia sẻ công ty với bạn bè</div>
                <div className={cx("card-body")}>
                  <div className={cx("share-company")}>
                    <div className={cx("item")}>
                      <span className={cx("title")}>Chia sẻ bằng đường dẫn</span>
                      <div className={cx("content")}>
                        <div className={cx("link")}>
                          <input className={cx("input")} value='https://topcv.vn/cong-ty/cong-ty-trach-nhiem-han' readOnly />
                          <span
                            className={cx("btn-copy")}
                            onClick={() => {
                              handleCopyShareLink("https://topcv.vn/cong-ty/cong-ty-trach-nhiem-han");
                            }}
                          >
                            <BiCopy />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("item")}>
                      <span className={cx("title")}>Chia sẻ qua mạng xã hội</span>
                      <div className={cx("content")}>
                        <div className={cx("social")}>
                          <span className={cx("social-item", "facebook")}>
                            <BiLogoFacebook />
                          </span>
                          <span className={cx("social-item", "twitter")}>
                            <BiLogoTwitter />
                          </span>
                          <span className={cx("social-item", "linkedin")}>
                            <BiLogoLinkedin />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CompanyInfomation;
