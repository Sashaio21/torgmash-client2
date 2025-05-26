import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Redirection() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // Клиентская проверка админа
        if (token === 'fake-admin-token' && role === 'admin') {
            navigate('/user/register');
            return;
        }

        // Если пользователь из redux-стейта и у него есть должность
        if (user && user.user && user.user.jobTitle) {
            switch (user.user.jobTitle.nameJobTitle) {
                case "Старший разработчик":
                    navigate('/developer');
                    break;
                case "Программист":
                    navigate('/programmer');
                    break;
                default:
                    navigate('/employee');
            }
        } else {
            // Если ничего не найдено — на страницу авторизации
            navigate('/auth');
        }
    }, []);

    return (
        <div>
            Переадресация...
        </div>
    );
}

export default Redirection;
