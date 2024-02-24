import React, { useState } from "react";
import axios from "axios";
import {getAccessToken} from './authUtils';

const ProfilePicture = ()=>{
    const [profilePicture, setProfilePicture] = useState('')

    const handleProfilePictureChange =(e)=>{
        setProfilePicture(e.target.files[0]);
    }

    const handleUpload = async()=>{
        const acccessToken = getAccessToken();

        try{
            if (!profilePicture) {
                alert('Please select a profile picture');
                return;
              }
            const formData = new FormData();
            formData.append('profile_picture', profilePicture);
            const response = await axios.post('http://localhost:8000/api/v1/myapp/upload-profile-picture/',formData,{
                headers:{
                    Authorization : `Bearer ${acccessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile Picture uploaded successfully.');
        }catch(error){
            console.log('Unsuccessful Upload', error);
        }
    };
    return(
        <React.Fragment>
            <input type="file" onChange={handleProfilePictureChange}/><br/>
            <button onClick={handleUpload}>Upoad Profile Picture</button>
        </React.Fragment>
    )
};
export default ProfilePicture;