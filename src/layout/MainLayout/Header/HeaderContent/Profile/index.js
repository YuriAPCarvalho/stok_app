import React from 'react';
import { IconButton, Box } from '@mui/material';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ marginLeft: 'auto' }}>
      <IconButton size="large" color="secondary" onClick={handleLogout}>
        <LogoutOutlined />
      </IconButton>
    </Box>
  );
};

export default Profile;
