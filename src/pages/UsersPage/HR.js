import "../../styles/global.css"
import { Tabs, Tab, Button } from "@mui/material";
import axios from '../../axios'
import { useState, useEffect } from 'react'
import { TabPanel } from "../../utilites/componentsUtilites";
import Register from "./Register";
import AddDepartment from "./AddDepartament";
import AddJobTitle from "./AddJobTitle";


function HR(){
    const [activeTab, setActiveTab] = useState(0);
    const [listDepartament, setListDepartament] = useState(false);
    const [listJobTitle, setJobTitle] = useState(0);
    
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    

    const [listTasksForSenior, setListTasksForSenior] = useState([])

    useEffect(()=>{
        axios.get('/personnel/all/departaments'
        )
        .then((data)=>{
            console.log("fssdf",data.data.departments)
        })
    },[])

    return (
        <div> 
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Регистрация сотрудника" />
                <Tab label="Добавить отдел" />
                <Tab label="Добавить должность" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <Register/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <AddDepartment/>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <AddJobTitle/>
            </TabPanel>
        </div>
    )
}

export default HR