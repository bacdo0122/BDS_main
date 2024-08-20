import { Link } from 'react-router-dom';
import { HiMiniMapPin } from "react-icons/hi2";
import HomeImage from '../../image/HomeImage';

import './HomeCard.scss';

const HomeCard = ({ homeId, photoUrl, city, neighborhood, title, description, price, isDetailImage = true }) => {
    return (
        <article className="property-card">
            <article className="property-image-container">
            <Link to={`/home-details/${homeId}`}>
                {isDetailImage ? <HomeImage src={photoUrl} /> : <img src={photoUrl} alt="Home" />}
            </Link>
            </article>

            <section className='grid-card-container'>
                <article className="property-price-container">
                    <h5 className="property-price">{price} VND</h5>
                </article>

                <article className="property-info">
                <Link to={`/home-details/${homeId}`}>
                    <h3 className="property-info-title">{title}</h3>
                </Link>
                </article>

                <article className="property-address">
                    <HiMiniMapPin color='#8d8741'/>
                    <div className="property-address-field">
                        {city}, {neighborhood}
                    </div>
                </article>

                <article className="description-card">
                    <p>{description}</p>
                </article>

                {/* <article className="property-card-footer">
                    <Link to={`/home-details/${homeId}`}>View Details</Link>
                </article> */}
            </section>
        </article>
    );
};

export default HomeCard;
