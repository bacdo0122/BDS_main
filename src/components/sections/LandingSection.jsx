import { Link } from 'react-router-dom';

import styles from "./landing.module.scss"

const LandingSection = () => {
    return (
        <section className={styles.landingSection}>
            <article>
                <article>
                    <h1>Wecome to Thái nguyên</h1>
                    <p>
                    Thái Nguyên, một tỉnh nằm ở vùng Đông Bắc Việt Nam, đang trở thành điểm nóng về bất động sản nhờ vào sự phát triển kinh tế và hạ tầng mạnh mẽ. Với vị trí chiến lược gần Hà Nội và các khu công nghiệp lớn như Samsung Thái Nguyên, khu vực này thu hút nhiều nhà đầu tư và người mua nhà. Thị trường bất động sản Thái Nguyên đa dạng với nhiều loại hình như căn hộ, nhà phố, biệt thự và đất nền, thường được xây dựng với cơ sở hạ tầng hiện đại và tiện ích đầy đủ. Giá bất động sản tại đây cũng khá hợp lý, phù hợp với nhiều đối tượng khách hàng từ người có thu nhập trung bình đến cao. Đặc biệt, các khu đô thị mới như Yên Bình, Phổ Yên đang phát triển mạnh mẽ, mang lại nhiều cơ hội đầu tư sinh lời cao.
                    </p>
                    <Link to="/all-sell">Khám phá</Link>
                </article>
            </article>
        </section>
    );
};

export default LandingSection;
