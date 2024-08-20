import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { fetchUserDetails } from '../../api/homeApi';

export default function UserProfile()  {
    const [userDetails, setUserDetails] = useState({});
    const { user } = useContext(UserContext);
    const getUserDetail = () => {
        if(user.accessToken){
        fetchUserDetails(user.accessToken)
        .then((data) => {
            console.log("data:", data)
            setUserDetails(data);
        });
       }
    };

    useEffect(getUserDetail, [user]);
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Information</h2>
      <div style={styles.infoContainer}>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Image:</strong> <img src={userDetails.avatar}></img></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
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
