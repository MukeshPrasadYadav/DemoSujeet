import React from 'react'
import Dashboard from '@/components/OtherComponent/Dashboard'
import { useAuth } from '@/Providers/AuthProvide'
import DashboardUser from '@/components/OtherComponent/DashboardUser';

const Home = () => {
    
    const {isLoading,role}=useAuth();
    if(isLoading) return <>Loading...</>
  
    if(role==='admin') return <Dashboard/>
    return (
        <DashboardUser/>
    )
   
}

export default Home