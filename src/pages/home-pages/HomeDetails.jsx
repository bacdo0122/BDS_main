import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, lazy, useCallback } from "react";
import { toast } from "react-toastify";

import facebookLogo from "../../assets/images/facebook_logo.png";
import xLogo from "../../assets/images/x_logo.webp";

// import VisitationsTable from '../..//common/VisitationsTable';
import { UserContext } from "../../context/UserProvider";
import HomeSuggestions from "../../components/sections/HomeSuggestions";
import MapView from "../../components/map/MapView";
import { fetchHomeDetails, fetchHomeDetailsSuggestion, fetchUserDetails } from "../../api/homeApi";

import styles from "./home-details.module.scss";
import HomeImage from "../../components/image/HomeImage";
import ContactCard from "../../components/cards/home-cards/ContactCard";
import HomeCard from "../../components/cards/home-cards/HomeCard";
import { Box, Chip, Grid, Typography } from "@mui/material";

export default function HomeDetails() {
    const { homeId } = useParams();
    const [homeDetails, setHomeDetails] = useState({
        id: 1,
        region: {
            id: 1
        },
        title: '',
        description: '11',
        image: 
        'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://media.batdongsan.vn/posts/116895_66c3edd2ba199.jpg'

    });
    const [sameTypeProperty, setSameTypeProperty] = useState([])
    const [userDetails, setUserDetails] = useState({});

    const getHomeDetails = () => {
        fetchHomeDetails(homeId)
            .then((resp) => resp.json())
            .then((json) => {
                setHomeDetails(json);
                setUserDetails(json.user)
            });
    };

    const getHomeSuggestion = () => {
        if(homeDetails.type && homeDetails.type?.id){
            fetchHomeDetailsSuggestion(homeDetails.type.id)
            .then((resp) => resp.json())
            .then((json) => {
                setSameTypeProperty(json.data);
            });

        }
    }

    
    useEffect(getHomeDetails, [homeId]);

    useEffect(getHomeSuggestion, [homeDetails]);

    return (
        <section className={styles.homeDetails}>
            <section className={styles.topSection}>
                <article className={styles.imagesContainer}>
                    <article className="property-image-container">
                        <HomeImage src={homeDetails.image ?? homeDetails.image} page="details" />
                    </article>
                </article>

                <ContactCard info={userDetails && userDetails}/>
            </section>

            <section className={styles.middleSection}>
                <article className={styles.homeInfo}>
                <Box 
      sx={{
        border: '1px solid #e0e0e0',
        padding: 2,
        maxWidth: 600,
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
        <Chip label={homeDetails.type && homeDetails.type.name === 'sell' ? 'Bán' : 'Cho thuê'} />
        <Chip label="Thái Nguyên" />
        <Chip label={homeDetails.region ? homeDetails.region.ward?.name : ''} />
        <Chip label={homeDetails.title} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
       {homeDetails.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
      {homeDetails.address}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Mức giá
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {homeDetails.price}  {homeDetails.type && homeDetails.type?.name === 'sell' ? "tỷ" : "triệu/tháng"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Diện tích
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {homeDetails.area} m²
          </Typography>
        </Grid>
      </Grid>
    </Box>

                    <article>
                        <h2>Description</h2>
                        <hr />
                        <p>{homeDetails && homeDetails.description}</p>
                    </article>
                </article>
                <article className={styles.share}>
                    <h2>Bất động sản dành cho bạn </h2>
                    <hr />
                    <section className="homes-list-container">
                    {sameTypeProperty.map((home) => (
                        <HomeCard
                            key={home.id}
                            homeId={home.id}
                            photoUrl={home.image && home.image.length > 0 ? home.image.split(';')[0] : "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"}
                            city={home.city}
                            neighborhood={home.neighborhood}
                            title={home.title}
                            description={home.description}
                            price={home.price}
                            isDetailImage={false}
                            {...home}
                        />
                    ))}
                    </section>
                </article>
            </section>

            {/* <HomeSuggestions homeId={homeId} /> */}
        </section>
    );
}
