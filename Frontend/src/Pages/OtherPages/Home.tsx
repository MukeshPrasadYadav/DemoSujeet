import React, { useEffect } from 'react'
import Dashboard from '@/components/OtherComponent/Dashboard'
import { useAuth } from '@/Providers/AuthProvide'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { isLoading, role ,user} = useAuth();

  useEffect(() => {
    console.log(user)
    if (!isLoading) {
      if (user.role==='user') {
        navigate(-1);
      }
    }
  }, [isLoading, role, navigate]);

  if (isLoading) return <>Loading...</>;

  return <Dashboard />;
}

export default Home;
