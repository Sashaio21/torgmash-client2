import { useState } from "react";
import { Button, Tabs, Tab, Box, Paper, Typography } from "@mui/material";
import ListApplicationsDeveloper from "./ListApplicationsDeveloper";
import { TabPanel } from "../../utilites/componentsUtilites";
import { Link } from "react-router-dom";
import ListNewFunction from "./ListNewFunction";
import GanttChartByProgrammers from "../../components/GanttChartByProgrammers";


function MainDeveloper() {

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        my: 5,
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Заголовок и кнопка */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Старший разработчик
        </Typography>
        <Link to="/application/create" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Добавить функцию
          </Button>
        </Link>
      </Box>

      {/* Вкладки */}
      <Paper elevation={1} sx={{ borderRadius: 2, mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          indicatorColor="primary"
          textColor="primary"
          sx={{
            "& .MuiTab-root": { fontWeight: 600, px: 2 },
          }}
        >
          <Tab label="Активные" />
          <Tab label="Не просмотренные" />
          <Tab label="Все заявки" />
          <Tab label="Новые функции" />
        </Tabs>
      </Paper>

      {/* Панели вкладок */}
      <TabPanel value={activeTab} index={0}>
        <ListApplicationsDeveloper variant={0} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <ListApplicationsDeveloper variant={1} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <ListApplicationsDeveloper variant={2} />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <ListNewFunction />
      </TabPanel>
    </Box>
  );
}

export default MainDeveloper;
