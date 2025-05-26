import '../../styles/global.css';
import ListTasksProgrammer from '../../components/ListTasksProgrammer';
import GanttChart from '../../components/GanttChart';
import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import { TabPanel } from '../../utilites/componentsUtilites';
import axios from '../../axios';

function MainProgrammer() {
  const [activeTab, setActiveTab] = useState(0);
  const [listTasksForSenior, setListTasksForSenior] = useState([]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    axios
      .get('/senior/programmer/all/task')
      .then((data) => {
        setListTasksForSenior(data.data.allTasks);
      })
      .catch((err) => console.error('Ошибка загрузки задач:', err));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: 4,
        bgcolor: '#fff',
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
        Панель программиста
      </Typography>

      <Paper
        elevation={1}
        sx={{
          borderRadius: 2,
          mb: 4,
          bgcolor: '#f1f5f9',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          sx={{
            '& .MuiTab-root': {
              minWidth: 140,
              fontWeight: 500,
              fontSize: 16,
            },
          }}
        >
          <Tab label="Мои задачи" />
          <Tab label="Диаграмма Ганта" />
        </Tabs>
      </Paper>

      <TabPanel value={activeTab} index={0}>
        <ListTasksProgrammer />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {listTasksForSenior.length > 0 ? (
          <GanttChart tasks={listTasksForSenior} />
        ) : (
          <Typography color="text.secondary">Загрузка задач или задач нет</Typography>
        )}
      </TabPanel>
    </Box>
  );
}

export default MainProgrammer;
