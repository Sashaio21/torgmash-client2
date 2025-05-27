import '../styles/global.css'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserMe, logout } from '../redux/slices/userSlices';
import { Link, useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
    color: "#76cb95",
});

function Header() {
    const navigate = useNavigate();
    const dispatchAuthMe = useDispatch();
    const { user } = useSelector((state) => state.user);

    // Вычисляем isLoggedIn на основе redux и localStorage **на каждом рендере**
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const isLoggedIn = Boolean((user && user.user) || token || role);

    const deleteToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        dispatchAuthMe(logout());
        // Здесь не нужно менять локальный isLoggedIn, он пересчитается при рендере

        navigate('/auth');
    };

    const goToLogin = () => {
        navigate('/auth');
    };

    return (
        <header>
            <div className='row container' style={{justifyContent: "space-between", alignItems: "center", height:"100%"}}>
                <Link to={'/'} className='row' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src='logo.jpg' className='image' alt="Some text" width={"30px"} />
                    <p>На главную</p>
                </Link>

                {isLoggedIn ? (
                    <div className='row' style={{alignSelf:"center", gap: "10px"}}>
                        <div className='nameEmployee' style={{alignSelf:"center", gap: "10px"}}>
                            {user && user.user ? user.user.numberPassport : 'Отдел кадров'}
                        </div>
                        <CustomButton onClick={deleteToken}>Выйти</CustomButton>
                    </div>
                ) : (
                    <div className='row' style={{alignSelf:"center", gap: "10px"}}>
                        <CustomButton onClick={goToLogin}>Войти</CustomButton>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
