'use client'
import { Box } from '@mui/material'
import React from 'react'
import AddAdmin from '@/components/dashboard/register/AddAdmin'
import store from '@/redux/store/store'
import { Provider } from 'react-redux'
import { Notification } from '@/notification/Notification' 
const page = () => {
  return (
    <Box>
      <Provider store={store}>
        <AddAdmin />
        <Notification />
      </Provider>
    </Box>


  )
}

export default page