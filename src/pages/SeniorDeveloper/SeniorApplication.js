import '../../styles/global.css'
import ApplicationPageDeveloper from './ApplicationPageDeveloper';
import { TabPanel } from '../../utilites/componentsUtilites';
import { Tab, Tabs } from '@mui/material';
import AddTask from './AddTask'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllApplication } from '../../redux/slices/employeeSlices';
import { fetchUserMe } from '../../redux/slices/userSlices';
import { useSearchParams } from 'react-router-dom';
import NewFunctionPage from './NewFunctionPage';
import UpdatePage from './UpdatePage';
import EmployeeInfo from '../../components/EmployeeInfo';

function SeniorApplication() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const [visibleTabs, setVisibleTabs] = useState(null)
    const applications = useSelector(state=>state.applications)
    const user = useSelector(state=>state.user)
    const {idApplication} = useParams()
        
    const [searchParams] = useSearchParams();
    const senior = searchParams.get('senior');
    const newFunction = searchParams.get('newFunction');


    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const test = ()=>{
        console.log(newFunction)
    }

    useEffect(() => {
        dispatch(fetchAllApplication()); 
        dispatch(fetchUserMe()); 
    }, [dispatch]); 

    const foundApplication = applications?.applications?.applications?.find(app => app._id === idApplication);
    const foundUser = user?.user?.user?._id

    useEffect(() => {
        if (foundApplication && foundUser) {
            console.log("cccccccccccccccccc",foundApplication.responsible)
            console.log("dddddddddddddddd",user.user.user._id)
            // console.log("senior", foundApplication.responsible);
            if (foundApplication.responsible == user.user.user._id)
            {
                console.log("ddfddddddddddddddddddd")
                setVisibleTabs(true)
            }
        } else {
            console.log("Данные ещё загружаются...");
        }
    }, [foundApplication, foundUser]); // useEffect срабатывает, когда foundApplication обновляется

    return (
        <div> 
            {visibleTabs || !newFunction ? 
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Заявка" />
                <Tab label="Задачи" />
                {!newFunction ? <Tab label="Обновление" /> :<></>}
            </Tabs> :
            <>
            </> 
            }
            <TabPanel value={activeTab} index={0}>
                {!newFunction ? <NewFunctionPage/>
                :<ApplicationPageDeveloper/>
                }
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <AddTask idApplication={idApplication}/>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <UpdatePage/>
            </TabPanel>
            <h4 style={{marginTop:"25px"}}>Отпраивл заявку</h4>
            {foundApplication && foundApplication.applicant ? (
            <EmployeeInfo idEmployee={foundApplication.applicant} />
            ) : (
            <div>Загрузка данных сотрудника...</div> // или пусто
            )}



        </div>
    );
};

export default SeniorApplication;
