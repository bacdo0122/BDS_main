import React from 'react';
import './ContactCard.scss'; // Đường dẫn tới file CSS
import zaloImage from "../../../assets/images/zalo.png";
const ContactCard = ({info}) => {
  return (
    <div className="contact-card">
      <h3>Liên hệ người đăng</h3>
      <div className="profile-image">
        <img
          src={info && info.avatar} // Đường dẫn tới hình ảnh avatar
          alt={info &&  info.name}
        />
      </div>
      <h4>{info && info.name}</h4>
      <h4>{info &&  info.email}</h4>
      <p id="a">Đã sẵn sàng tư vấn cho bạn</p>
      <div className="contact-numbers">
        <a href="tel:0936782752" className="contact-button">
          <i className="fa fa-phone"></i> {info.phone_number}
        </a>
      </div>
      <div className="zalo-button">
        <a href="https://zalo.me/" className="contact-button zalo">
          <img src={zaloImage} alt="Zalo Logo" />
          Chat qua Zalo
        </a>
      </div>
    </div>
  );
};

export default ContactCard;