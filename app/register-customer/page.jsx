"use client";

import React from "react";
import RegisterCustomer from "@/components/register-customer/RegisterCustomer";
import { Box } from "@mui/material";
// import store from "@/redux/store/store";
// import { Provider } from "react-redux";
// import { Notification } from "@/notification/Notification";
const page = () => {
  return (
    <Box>
      <Box>
        {/* <Provider store={store}> */}
          {/* <Notification /> */}
          <RegisterCustomer />
        {/* </Provider> */}
      </Box>
    </Box>
  );
};

export default page;
