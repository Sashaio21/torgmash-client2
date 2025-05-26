import '../../styles/global.css'
import ApplicationComponent from '../../components/ApplicationComponent.js';
import axios from '../../axios.js';
import ApplicationComponentDeveloper from './ApplicationComponentDeveloper.js';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { fetchAllApplication } from '../../redux/slices/employeeSlices.js';
import { setStatus } from '../../utilites/globalUtilites.js';
import { fetchUserMe } from '../../redux/slices/userSlices.js';


function ListNewFunction({variant}) {
    const [newFunctions, setNewFunction] = useState([])
    const dispatchApplications = useDispatch()
    const {user, statusUser, errorUser} = useSelector((state)=>state.user)


    useEffect(()=>{
        dispatchApplications(fetchUserMe())
        axios.get("/senior/developer/get/function")
        .then((data)=>{
            setNewFunction(data)
        })

        console.log("fdfd", newFunctions)
        console.log(user)
    },[])

    
    return(
        <div>
            {Array.isArray(newFunctions?.data?.allFunction) && newFunctions.data.allFunction.length > 0 && user ? (
                <div className='applications col'>
                    {newFunctions.data.allFunction.map((obj) => (
                        <Link 
                            key={obj._id}
                            to={{
                                pathname: `/application/page/senior/${obj._id}`,
                                state: { senior: true }
                            }}
                            onClick={() => setStatus(obj._id, obj.status, "Просмотрено")}
                        >
                            <ApplicationComponentDeveloper 
                                title={obj.title}
                                description={obj.description}
                                // urgency={obj.urgency}
                                status={obj.status}
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                <div>Пусто</div>
            )}
        </div>
    )
}

export default ListNewFunction