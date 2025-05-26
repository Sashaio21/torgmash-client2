import React, { useEffect, useState } from 'react';
import axios from '../axios';

function EmployeeInfo({ idEmployee }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idEmployee) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/employee/${idEmployee}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке данных сотрудника');
        setLoading(false);
      });
  }, [idEmployee]);

  if (loading) return <div style={{ marginTop: 24 }}>Загрузка данных сотрудника...</div>;
  if (error) return <div style={{ marginTop: 24, color: 'red' }}>{error}</div>;
  if (!employee) return <div style={{ marginTop: 24 }}>Данные сотрудника не найдены</div>;

  return (
    <div
      className="employee-info"
      style={{
        maxWidth: 320,
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
      }}
    >
      <h7
        style={{
          marginBottom: 12,
          fontWeight: 700,
          borderBottom: '1px solid #eee',

        }}
      >
        {employee.name}
      </h7>

      <p style={{ margin: '8px 0' }}>
        <strong>Контакты:</strong>{' '}
        <a href={`tel:${employee.contacts}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
          {employee.contacts}
        </a>
      </p>

      <p style={{ margin: '8px 0' }}>
        <strong>Должность:</strong> {employee.jobTitle?.nameJobTitle || 'Не указано'}
      </p>

      <p style={{ margin: '8px 0' }}>
        <strong>Отдел:</strong> {employee.department?.nameDepartment || 'Не указано'}
      </p>
    </div>
  );
}

export default EmployeeInfo;
