"use client";
import { useEffect, useMemo, useState } from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import { Box, Button } from "@mui/material";
import AddRoleModal from "./AddRoleModal";
// import { GetUserRoles } from "@/app/api/user/GetUserRoles";
import StatusSwitch from "../add-user/StatusSwitch";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { fetchRolesRequest, deleteRoleRequest } from "@/redux/slices/roleSlice";
import { useDispatch, useSelector } from "react-redux";

const RoleTable = () => {
  const [openAddRole, setOpenAddRole] = useState(false);
  const dispatch   =  useDispatch()

const handleDelete   =  (id)   =>  {
  console.log("see the id :", id)
  dispatch(deleteRoleRequest(id))
}

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", // access the role name
        header: "Role Name",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        size: 150,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue()); // Get the date from the cell value
          return date.toLocaleDateString(); // Format the date (you can customize the format)
        },
      },
      {
        accessorKey: 'actions',
        header: 'Action',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusSwitch />
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

 const roleListes =  useSelector((state) => state.roles.roles)
 console.log("see all roles:", roleListes)
 useEffect(() => {
dispatch(fetchRolesRequest())
}, [openAddRole]); // Assuming `newRole` is a dependency that triggers re-fetching


  const table = useMaterialReactTable({
    columns,
    data: roleListes, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  const handlOpenAddRole = () => {
    setOpenAddRole(true);
  };
  const handlCloseAddRole = () => {
    setOpenAddRole(false);
  };

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      {/* Container for Button and Table */}
      <Box position="absolute" top={29} left={25}>
        <Button
          variant="contained"
          color="warning"
          sx={{ zIndex: "1000" }}
          onClick={handlOpenAddRole}
        >
          Add Role
        </Button>
      </Box>
      {openAddRole && (
        <AddRoleModal open={openAddRole} onClose={handlCloseAddRole} />
      )}
      {/* Table */}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default RoleTable;
