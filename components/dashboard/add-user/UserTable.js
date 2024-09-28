'use client';
import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import { Box, Button } from '@mui/material';
import AddRoleModal from '../add-role/AddRoleModal';
import AddUser from './AddUser';
//example data type
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

const UserTable = () => {
  //should be memoized or stable
  const [openAddUser, setOpenAddUser] = useState(false);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  const handlopenAddUser  =  ()  => {
    setOpenAddUser(true)
  }
  const handlCloseAddUser  =  ()  => {
    setOpenAddUser(false)
  }

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      {/* Container for Button and Table */}
      <Box position="absolute" top={29} left={25}>
        <Button variant="contained" color="warning" sx={{zIndex:"1000"}}  onClick={handlopenAddUser}>
          Add User
        </Button>

      </Box>
 { openAddUser&& < AddUser  open ={openAddUser} onClose = {handlCloseAddUser} />}
      {/* Table */}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default UserTable;
