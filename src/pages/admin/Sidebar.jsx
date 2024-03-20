import React from 'react';
import styled from 'styled-components';


const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #343a40;
  color: #fff;
  height: 100vh;
  padding: 1rem; /* Add some padding */
  position: fixed;
  left: 0;
  top: 0;
  width: 250px; /* Adjust the width as needed */
  margin-right:0;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.active {
    background-color: #495057;
  }

  &:hover {
    background-color: #495057;
  }
`;

function AdminSidebar({ activeTab, onTabChange }) {
    const tabs = ['Dashboard', 'Verify Document', 'Users Insight', 'Room Insight', 'Logout'];

  return (
    <SidebarContainer>
    <img src="src\assets\images\Hamro_Room_Logo_White.png"></img>
    {tabs.map((tab, index) => (
      <SidebarItem
        key={index}
        className={`sidebar-item ${activeTab === tab.toLowerCase().replace(' ', '') ? 'active' : ''}`}
        onClick={() => onTabChange(tab.toLowerCase().replace(' ', ''))}
      >
        {tab}
      </SidebarItem>
    ))}
  </SidebarContainer>
  );
}

export default AdminSidebar;