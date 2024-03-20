import React from 'react';
import styled from 'styled-components';
import DashboardPage from './tabs/Dashboard';
import VerifyDocumentPage from './tabs/VerifyDocumentsPage';
import UserInsightPage from './tabs/UserInsightPage';


const ContentContainer = styled.div`
  margin-left: 0px; /* Match the width of the sidebar */
//   padding: 1rem;
  height: 100vh;
  width: 70vw;
  overflow-y: auto; /* Allow vertical scrolling */
`;

// const ContentContainer = styled.div`
//   height: 100vh;
//   width: calc(100vw - 250px); /* Adjust width based on sidebar width */
//   overflow-y: auto; /* Allow vertical scrolling */
//   padding: 1rem 2rem; /* Add some padding */
// `;

function AdminContent({ activeTab }) {
  return (
    <ContentContainer className="content">
      {activeTab === 'dashboard' && <DashboardPage/>}
      {activeTab === 'verifydocument' && <VerifyDocumentPage/>}
      {activeTab === 'usersinsight' && <UserInsightPage/>}
      {activeTab === 'roominsight' && <div>Content for Room Insight</div>}
      {activeTab === 'logout' && <div>Logout</div>}
    </ContentContainer>
  );
}

export default AdminContent;