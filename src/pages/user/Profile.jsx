import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { fetchUserDetails } from '../../api/homeApi';
import ListingUser from '../../components/user/listing_user';

export default function UserProfile()  {
    const [userDetails, setUserDetails] = useState({});
    const { user } = useContext(UserContext);
    const getUserDetail = () => {
        if(user.accessToken){
        fetchUserDetails(user.accessToken)
        .then((data) => {
            setUserDetails(data);
        });
       }
    };

    useEffect(getUserDetail, [user]);
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thông tin cá nhân và danh sách các tin rao đã đăng</h2>
      <div style={styles.infoContainer}>
        <p><strong>Tên:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Số điện thoại:</strong> {userDetails.phone_number}</p>
        <p><strong>Ảnh:</strong> <img src={userDetails.avatar}></img></p>
      </div>

      {/* lising */}
      <ListingUser userDetails={userDetails}/>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '20px auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  infoContainer: {
    lineHeight: '1.6',
  },
};
