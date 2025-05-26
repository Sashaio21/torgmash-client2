import '../styles/global.css';
import { Card, Button, Typography, Box } from '@mui/material';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import parseISO from 'date-fns/parseISO';

function OneTask({ title, desription, status, deadline }) {
    const date = typeof deadline === "string" ? parseISO(deadline) : new Date(deadline);
    const formattedDeadline = isNaN(date.getTime()) 
        ? "Некорректная дата" 
        : format(date, "dd.MM.yyyy", { locale: ru });

    const getStatusColor = () => {
        switch (status) {
            case "Активно": return "#4caf50";      // зелёный
            case "Выполнено": return "#2196f3";    // синий
            case "Просрочено": return "#f44336";   // красный
            default: return "#9e9e9e";             // серый
        }
    };

    return (
        <Card 
            className="oneApplications"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                marginBottom: 2,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: '#fafafa',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{desription}</Typography>
                <Button variant="outlined" color="error" size="small">Удалить</Button>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: getStatusColor(),
                        marginBottom: 1
                    }}
                >
                    {status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Дедлайн: {formattedDeadline}
                </Typography>
            </Box>
        </Card>
    );
}

export default OneTask;