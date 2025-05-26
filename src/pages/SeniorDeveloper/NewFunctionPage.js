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

function NewFunctionPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {idApplication} = useParams()
    const location = useLocation();
    const { senior } = location.state || {};
    const user = useSelector(state => state.user)
    const [active, setActive] = useState(false)
    const [oneApplication, setOneApplication] = useState(false)



    useEffect(()=>{
        axios.get(`/senior/developer/get/function/${idApplication}`)
        .then((data)=>{
            console.log(data)
            setOneApplication(data.data.oneFunction[0])

          
        })
        console.log("senior", senior)
    },[])


    return (
        <div 
        className="col"
        style={{gap: "20px"}}>

            <div 
                className="row"
                style={{justifyContent: "space-between"}}
            >

                <h2>{oneApplication.title}</h2>
                <div>{oneApplication.status}</div>
            </div>
            <p>{oneApplication.description}</p>

        </div>
    );
};

export default NewFunctionPage;
