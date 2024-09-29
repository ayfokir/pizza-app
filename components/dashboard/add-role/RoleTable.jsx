"use client";
import { useEffect, useMemo, useState } from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import { Box, Button } from "@mui/material";
import AddRoleModal from "./AddRoleModal";
import { GetUserRoles } from "@/app/api/user/GetUserRoles";
import StatusSwitch from "../add-user/StatusSwitch";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';


// //example data type
// const data = [
//   {
//     name: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     address: "261 Erdman Ford",
//     city: "East Daphne",
//     state: "Kentucky",
//   },
//   {
//     name: {
//       firstName: "Jane",
//       lastName: "Doe",
//     },
//     address: "769 Dominic Grove",
//     city: "Columbus",
//     state: "Ohio",
//   },
//   {
//     name: {
//       firstName: "Joe",
//       lastName: "Doe",
//     },
//     address: "566 Brakus Inlet",
//     city: "South Linda",
//     state: "West Virginia",
//   },
//   {
//     name: {
//       firstName: "Kevin",
//       lastName: "Vandy",
//     },
//     address: "722 Emie Stream",
//     city: "Lincoln",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
// ];

const RoleTable = () => {
  //should be memoized or stable
  const [openAddRole, setOpenAddRole] = useState(false);
  const [roleListes, setUserRolesList] = useState([]);

  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "name.firstName", //access nested data with dot notation
  //       header: "First Name",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "name.lastName",
  //       header: "Last Name",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "address", //normal accessorKey
  //       header: "Address",
  //       size: 200,
  //     },
  //     {
  //       accessorKey: "city",
  //       header: "City",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "state",
  //       header: "State",
  //       size: 150,
  //     },
  //   ],
  //   []
  // );


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
            <IconButton onClick={() => handleDelete(row.original.owner_id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );
  


 /// Fetch user roles from the server
 useEffect(() => {
  const fetchUserRoles = async () => {
    try {
      const result = await GetUserRoles(); // Call GetUserRoles instead of GetToppings
      console.log("Fetched user roles:", result.userRoles);
      setUserRolesList(result.userRoles); // Save the fetched user roles
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };
  fetchUserRoles();
}, []); // Assuming `newRole` is a dependency that triggers re-fetching


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
