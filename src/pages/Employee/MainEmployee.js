import '../../styles/global.css';
import { Button, Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TabPanel } from '../../utilites/componentsUtilites.js';
import ListApplications from '../../components/ListApplications.js';
import ListUpdates from '../../components/ListUpdates.js';

function MainEmployee() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: '40px auto', padding: 3 }}>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Link to="/send/application" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Отправить заявку
          </Button>
        </Link>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 3 }}
        >
          <Tab label="Мои заявки" />
          <Tab label="Обновления" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <ListApplications />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ListUpdates />
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default MainEmployee;
