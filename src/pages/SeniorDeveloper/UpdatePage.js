import { useState,useEffect } from 'react';
import axios from '../../axios.js';
import '../../styles/global.css'
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserMe } from '../../redux/slices/userSlices.js';
import { useNavigate } from 'react-router-dom';
import {Card, Button} from '@mui/material'
import { setStatus } from '../../utilites/globalUtilites.js';
import { useSelector } from 'react-redux';
import { setApplicant } from '../../utilites/globalUtilites.js';
import ComponentResponsible from '../../components/ComponentResponsible.js';
import { useForm } from "react-hook-form";
import { Input, Select, MenuItem } from "@mui/material";

function UpdatePage() {
    const dispatch = useDispatch()
    const {idApplication} = useParams()
    const location = useLocation();
    const { senior } = location.state || {};
    const user = useSelector(state => state.user)
    const [active, setActive] = useState(false)
    const [oneApplication, setOneApplication] = useState(false)
    const [update, setUpdate] = useState([])
    const visibleUpdate = false

    useEffect(()=>{
        axios.post("/senior/developer/get/one/update", {
            "developer": true,
            "application": idApplication
        })
        .then((data)=>{
            console.log("retretre",data.data.allProgrammer)
            setUpdate(data.data.allProgrammer)
        })
    },[])


    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatchApplications = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        // dispatchApplications(fetchSendApplication(data))
        axios.post("/senior/developer/add/update", {...data, application: idApplication} )
        console.log("Форма отправлена:", {...data, application: idApplication});
        axios.post("/senior/developer/get/one/update", {
            "developer": true,
            "application": idApplication
        })
        .then((data)=>{
            console.log("retretre",data.data.allProgrammer)
            setUpdate(data.data.allProgrammer)
        })
        // navigate('/')
    };

    // useEffect(()=>{
    //     axios.get(`/employee/application/one/${idApplication}`)
    //     .then((data)=>{
    //         console.log(data.data.oneApplication[0])
    //         setOneApplication(data.data.oneApplication[0])
    //         if (data.data.oneApplication[0].status == "Не просмотрено") {
    //             setActive(true)
    //         }
          
    //     })
    //     console.log("senior", senior)
    // },[])


    return (
        <div>
            {update.length !== 0 ?
                <div 
            className="col"
            style={{gap: "20px"}}>
                <div 
                    className="row"
                    style={{justifyContent: "space-between"}}
                >
                
                    <h2>{update[0].title}</h2>
                </div>
                <p>{update[0].description}</p>
        </div>:         
        <div>
            <h2 style={{marginBottom: "20px"}}>Отправка заявки</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div 
                className='col'
                style={{
                    gap: "20px"
                }}
            >
                <Input
                    placeholder='Заголовок обновления'
                    {...register("title", { required: "Заголовок обязателен" })}
                />
                {errors.title && <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>{errors.title.message}</p>}
                 <textarea
                    placeholder="Описание обновления"
                    rows={5} // 5 строк
                    {...register("description", { required: "Описание обязательно" })}
                />
                {errors.description && <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>{errors.description.message}</p>}

                <div 
                    className='row'
                    style={{gap: "20px"}}
                >
                    <Button >Отмена</Button>
                    <Button type="onsubmit">Отправить</Button>
                </div>
            </div>
            
            </form>
        </div>
        }

        </div>
        
    );
};

export default UpdatePage;
