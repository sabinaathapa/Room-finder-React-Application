import React, { useState, useEffect } from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { getAccessToken } from '../../../components/authUtils';
import UserInsightTable from './UserInsightTable';

const UserInsightPage = () => {
    const [activeTab, setActiveTab] = useState('tenant');
    const [users, setUsers] = useState([]);

    const accessToken = getAccessToken();

    //Fetch the documents details
    const fetchResult = async(type) =>{
        try{
            const response = await axios.get(
                "http://localhost:8000/api/v1/myapp/admin/get-all-users?type="+type,
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "multipart/form-data",
                    },
                });

                console.log("User Response:", response.data); // Log the response data

                setUsers(await response.data);

        }catch(error){
            console.log("Error fethcing User requests: ", error);
        }
    }

    useEffect(() => {
        fetchResult("tenant"); // Call the API when the component mounts
      }, []); // The empty dependency array ensures this effect runs once after the initial render


    const handleTabClick = (status) => {
        console.log("Event Triggered with status: " + status);
        setActiveTab(status);
        fetchResult(status);
    };

    return (
        <Container className='my-5'>
            <Row className='my-2'>
                <h3>User Details</h3>
            </Row>

            <Row>
                <Tabs
                    activeKey={activeTab}
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    onSelect={(eventKey) => handleTabClick(eventKey)}
                >
                    <Tab eventKey="tenant" title="Tenant" className='my-3'>
                        Below are the document actions that needs your actions:
                        {
                            (users.length !== 0)
                            ? <UserInsightTable users={users}/>
                            : <h5 className="text-center my-5">No Pending Requests</h5>
                        }
                    </Tab>
                    <Tab eventKey="owner" title="Owner" className='my-3'>
                        Below are the documents that have been approved:
                        {
                            (users.length !== 0)
                            ? <UserInsightTable users={users}/>
                            : <h5 className="text-center my-5">No Accepted Requests</h5>
                        }
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    );
};

export default UserInsightPage;