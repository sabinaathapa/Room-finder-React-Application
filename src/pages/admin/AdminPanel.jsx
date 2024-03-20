import React from 'react';
import AdminSidebar from './Sidebar';
import AdminContent from './AdminContent';
import { Container, Row, Col } from 'react-bootstrap';

function AdminPage() {
    const [activeTab, setActiveTab] = React.useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
        <Container className='fluid'>
            <Row >
                <Col className='col-2'>
                    <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                </Col>
                <Col className='col-8'>
                    <AdminContent activeTab={activeTab} />
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default AdminPage;