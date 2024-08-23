import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, lazy } from "react";
import { toast } from "react-toastify";

import facebookLogo from "../../assets/images/facebook_logo.png";
import xLogo from "../../assets/images/x_logo.webp";

// import VisitationsTable from '../..//common/VisitationsTable';
import { UserContext } from "../../context/UserProvider";
import HomeSuggestions from "../../components/sections/HomeSuggestions";
import MapView from "../../components/map/MapView";
import { fetchHomeDetails, fetchUserDetails } from "../../api/homeApi";

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
        title: 'haha',
        description: '11',
        image: 
        'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://media.batdongsan.vn/posts/116895_66c3edd2ba199.jpg'

    });
    const [sameTypeProperty, setSameTypeProperty] = useState(
        [
        {
            id: 1,
            region: {
                id: 1
            },
            title: 'haha1',
            description: '11444',
            image: 
            'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://media.batdongsan.vn/posts/116895_66c3edd2ba199.jpg'
    
        },
        {
            id: 2,
            region: {
                id: 1
            },
            title: 'haha2',
            description: '11333',
            image: 
            'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://media.batdongsan.vn/posts/116895_66c3edd2ba199.jpg'
    
        },
        {
            id: 3,
            region: {
                id: 1
            },
            title: 'haha12',
            description: '11222',
            image: 
            'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww;https://media.batdongsan.vn/posts/116895_66c3edd2ba199.jpg'
    
        }
]
)
    const [userDetails, setUserDetails] = useState({});
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const getHomeDetails = () => {
        fetchHomeDetails(homeId)
            .then((resp) => resp.json())
            .then((json) => {
                // console.log(json)
                setHomeDetails(json);
            });
    };

    const getUserDetail = () => {
        if(user.accessToken){
        fetchUserDetails(user.accessToken)
        .then((data) => {
            setUserDetails(data);
        });
       }
    };

    useEffect(getUserDetail, [user]);
    
    useEffect(getHomeDetails, [homeId]);


    const handleChatClick = () => {
        if (!user.token) {
            toast.error("You must be logged in to use chat!", {
                autoClose: 3000,
                pauseOnHover: false,
            });
            return;
        }
        if (user.id === homeDetails.owner_id) {
            toast.error("This home is added from you!", {
                autoClose: 3000,
                pauseOnHover: false,
            });
            return;
        }
        navigate(`/chat/${homeDetails.owner_id}`);
    };

    const handleRequestView = () => {
        navigate(`/meeting/${homeDetails.owner_id}/${homeDetails.id}`);
    };
    console.log("homeDetails:", homeDetails )
    return (
        <section className={styles.homeDetails}>
            <section className={styles.topSection}>
                <article className={styles.imagesContainer}>
                    <article className="property-image-container">
                        <HomeImage src={homeDetails.image ?? homeDetails.image} />
                    </article>
                </article>

                <ContactCard info={userDetails && userDetails}/>

                {/* <div className="home-details-image-container">
                    <img
                        src={homeDetails.photo_url}
                        alt="Home"
                        onError={(e) => {
                            e.target.onError = null;
                            e.target.src = exampleHomePhoto;
                        }}
                    />
                </div>
                <div className="home-details-text">
                    <h2>{homeDetails.title}</h2>
                    <p>Location: {homeDetails.city}</p>
                    <p>Neighborhood: {homeDetails.neighborhood}</p>
                    <p>Address: {homeDetails.address}</p>
                    <p>Price: {homeDetails.price}</p>
                    <p>Year: {homeDetails.year}</p>
                    <p>Information: {homeDetails.description}</p>
                    <p className="views-counter">Views: {homeDetails.home_views}</p>
                    <p>
                        Owner: {homeDetails.owner_names}{' '}
                        {user.id && user.id !== homeDetails.owner_id && (
                            <Link
                                to={`/chat?interlocutorId=${homeDetails.owner_id}&names=${homeDetails.owner_names}`}
                            >
                                <button>Start chat</button>
                            </Link>
                        )}
                        {user.id && user.id !== homeDetails.owner_id && (
                            <Link to={`/create-meeting?createWithId=${homeDetails.owner_id}`}>
                                <button>Request meeting</button>
                            </Link>
                        )}
                    </p>
                    {visitations.length > 0 && (
                        <VisitationsTable visitations={visitations} />
                    )}
                    {user.id === homeDetails.owner_id && (
                        <>
                            <Link to={`/edit-home?homeId=${homeId}`}>
                                <button>Edit</button>
                            </Link>
                            <Link to={`/create-visitation?homeId=${homeId}`}>
                                <button>Create Visitation</button>
                            </Link>
                        </>
                    )}
                </div> */}
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
        <Chip label="Cho thuê" />
        <Chip label="Hà Nội" />
        <Chip label="Đông Anh" />
        <Chip label="Kho, nhà xưởng, đất tại xã Nguyên Khê" />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Cho Thuê Kho Xưởng 400m² Tại Nguyên Khê, Đường Lô Góc, Vị Trí Đắc Địa, Đa Dạng Ngành Nghề
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Xã Nguyên Khê, Đông Anh, Hà Nội
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Mức giá
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            40 triệu/tháng
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Diện tích
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            1.400 m²
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

            <HomeSuggestions homeId={homeId} />
        </section>
    );
}
