import React, { useState, useEffect } from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { getAccessToken } from '../../../components/authUtils';
import DocumentRequest from './DocumentRequest';

const VerifyDocumentPage = () => {
    const [activeTab, setActiveTab] = useState('PENDING');
    const [documents, setDocuments] = useState([]);

    const accessToken = getAccessToken();

    //Fetch the documents details
    const fetchResult = async(status) =>{
        try{
            const response = await axios.get(
                "http://localhost:8000/api/v1/myapp/admin/get-document-with-user?status="+status,
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Document Response:", response.data); // Log the response data

                setDocuments(await response.data);

        }catch(error){
            console.log("Error fethcing document requests: ", error);
        }
    }

    useEffect(() => {
        fetchResult("PENDING"); // Call the API when the component mounts
      }, []); // The empty dependency array ensures this effect runs once after the initial render


    const handleTabClick = (status) => {
        console.log("Event Triggered with status: " + status);
        setActiveTab(status);
        fetchResult(status);
    };

    return (
        <Container className='my-5'>
            <Row className='my-2'>
                <h3>Documents Submitted</h3>
            </Row>

            <Row>
                <Tabs
                    activeKey={activeTab}
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    onSelect={(eventKey) => handleTabClick(eventKey)}
                >
                    <Tab eventKey="PENDING" title="Pending" className='my-3'>
                        Below are the document actions that needs your actions:
                        {
                            (documents.length !== 0)
                            ? <DocumentRequest documents={documents}/>
                            : <h5 className="text-center my-5">No Pending Requests</h5>
                        }
                    </Tab>
                    <Tab eventKey="APPROVED" title="Accepted" className='my-3'>
                        Below are the documents that have been approved:
                        {
                            (documents.length !== 0)
                            ? <DocumentRequest documents={documents}/>
                            : <h5 className="text-center my-5">No Accepted Requests</h5>
                        }
                    </Tab>
                    <Tab eventKey="REJECTED" title="Rejected" className='my-3'>
                        Below are the documents that have been rejected:
                        {
                            (documents.length !== 0)
                            ? <DocumentRequest documents={documents}/>
                            : <h5 className="text-center my-5">No Rejected Requests</h5>
                        }
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    );
};

export default VerifyDocumentPage;