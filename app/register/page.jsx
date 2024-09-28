'use client'
import React from 'react'
import Register from '@/components/dashboard/register/Register'
import { Box } from '@mui/material'
import store from '@/redux/store/store'
import { Provider } from 'react-redux'
import { Notification } from '@/notification/Notification' 
const page = () => {
  return (
    <Box>
      <Provider store={store}>
        <Notification />
        <Register />
      </Provider>
    </Box>
  )
}

export default page