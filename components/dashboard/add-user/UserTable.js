"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddRoleModal from "../add-role/AddRoleModal";
import AddUser from "./AddUser";
import { GetUsers } from "@/app/api/user/GetUsers";
import StatusSwitch from "./StatusSwitch";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserRequest, fetchUsersRequest } from "@/redux/slices/userSlice";
import { useAuth } from "@/context/AuthContext";
import { SuccessMessage, FailureMessage } from "@/redux/slices/notificationSlice";
const UserTable = () => {
  //should be memoized or stable
  const [openAddUser, setOpenAddUser] = useState(false);
  // const [users, setUsers]   = useState([])
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus  = useSelector((state) => state.users)
  // console.log("see all users:", users);
  // console.log("see all userStatus:", userStatus);


  useEffect(() => {
    if (userStatus.status === "succeeded") {
      dispatch(SuccessMessage({ message: userStatus.message }));
    } else if (userStatus.status === 'failed') {
      dispatch(FailureMessage({ error: userStatus.error }));
    }
  }, [userStatus.status, userStatus.message, userStatus.error]);


  
  const { restaurantId, id } = useAuth();
  
  useEffect(() => {
    if (restaurantId) {
      // Dispatch the action once restaurantId is available
      dispatch(fetchUsersRequest(restaurantId));
    }
  }, [restaurantId, dispatch, openAddUser]);

  const handleDelete = (id) => {
    console.log("see the id of the user:", id)
    dispatch(deleteUserRequest(id));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: " Name",
        size: 150,
      },
      {
        accessorKey: "phoneNumber", //normal accessorKey
        header: "Phone No",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Action",
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StatusSwitch userId={row.original.id} status = {row.original.status} />
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <DeleteIcon sx={{ color: "" }} />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );
 
  
  // Always call the useMaterialReactTable hook
  const table = useMaterialReactTable({
    columns,
    data: users || [], // Fallback to an empty array if users is not available
  });

  const handlopenAddUser = () => {
    setOpenAddUser(true);
  };
  const handlCloseAddUser = () => {
    setOpenAddUser(false);
  };

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      <Box position="absolute" top={29} left={25}>
        <Button variant="contained" color="warning" sx={{ zIndex: "1000" }} onClick={handlopenAddUser}>
          Add User
        </Button>
      </Box>

      {openAddUser && <AddUser open={openAddUser} onClose={handlCloseAddUser} />}

      {/* Check if users array is empty or undefined */}
      {(!users || users.length === 0) ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <Typography variant="h6" color="textSecondary">
            No users found. Please add users to display the table.
          </Typography>
        </Box>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </Box>
  );
};

export default UserTable;
