import '../styles/global.css';
import ApplicationComponent from './ApplicationComponent.js';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllApplication } from '../redux/slices/employeeSlices.js';

function ListApplications({ variant }) {
  const dispatch = useDispatch();
  const { applications, status, error } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchAllApplication());
  }, [dispatch]);

  return (
    <div
      className="list-applications"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {applications?.applications?.length > 0 ? (
        applications.applications.map((obj) => (
          <Link
            key={obj._id}
            to={`/application/page/${obj._id}?senior=true`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ApplicationComponent
              title={obj.title}
              description={obj.description}
              urgency={obj.urgency}
              status={obj.status}
              id={obj.responsible}
            />
          </Link>
        ))
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>
          Заявок пока нет
        </p>
      )}
    </div>
  );
}

export default ListApplications;
