import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '@/redux/slices/notificationSlice';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = () => {
  const { error, message } = useSelector((state) => state.notification);
  const dispatch = useDispatch(); // Get dispatch function from Redux

  useEffect(() => {
    let timeoutId; // Define timeout ID to clear notification later

    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 'success1',
        className: 'toast-position'
      });

      // Delay the clear notification action until the toast is completely shown
      timeoutId = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000); // Wait for 3 seconds (or match the `autoClose` value)
    } else if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 'error1',
        className: 'toast-position'
      });

      // Delay the clear notification action
      timeoutId = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [message, error, dispatch]);

  return (
    <div className='toast-position'>
      <ToastContainer />
    </div>
  );
};
