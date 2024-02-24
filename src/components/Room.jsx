import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "./authUtils";
import OwnerRoom from "./OwnerRoom";
import TenantRoom from "./TenantRoom";

const RoomComponent = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const acccessToken = getAccessToken();
                const response = await axios.get('http://localhost:8000/api/v1/accounts/get-user-role/', {
                    headers: {
                        Authorization: `Bearer ${acccessToken}`,
                    },
                });
                setUserRole(response.data.role);
            } catch (error) {
                console.log('Error fetching user role', error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <React.Fragment>
            {userRole === 'Owner' && <OwnerRoom/>}
            {userRole === 'Tenant' && <TenantRoom/>}
        </React.Fragment>
    );
};

export default RoomComponent;
