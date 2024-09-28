'use client'
import { Box } from '@mui/material'
import React from 'react'
import AddPizza from '@/components/dashboard/add-pizza/AddPizza'
import Dashboard from '@/components/dashboard/Dashboard'
import store from '@/redux/store/store'
import { Provider } from 'react-redux'
import { Notification } from '@/notification/Notification' 
const page = () => {
  return (
    <Box>
        <Provider store={store}>
    <Dashboard   DynamicComponent={AddPizza}/>
      <Notification  />
        </Provider>
    </Box>
    )
}

export default page 