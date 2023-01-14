import React from 'react';
import AdminLayout from '../../hoc/AdminLayout';

function Dashboard(props) {
   
    return (
        <AdminLayout title="Dashboard">
            <div className='user_dashboard'>
                <div>
                    This is Your Dashboard
                </div>
            </div>
            
        </AdminLayout>
    );
}

export default Dashboard;