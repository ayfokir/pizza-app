'use client';
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import AddRoleModal from '../add-role/AddRoleModal';
import AddUser from './AddUser';
import { GetUsers } from '@/app/api/user/GetUsers';
import StatusSwitch from './StatusSwitch';
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable = () => {
  //should be memoized or stable
  const [openAddUser, setOpenAddUser] = useState(false);
  const [users, setUsers]   = useState([])

  useEffect(()  =>  {
    const getUsers  =  async()  =>  {
let users =  await GetUsers()
console.log("see users:", users)
setUsers(users.users)
    }
    getUsers()
},[openAddUser])

const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: ' Name',
        size: 150,
      },
      {
        accessorKey: 'phoneNumber', //normal accessorKey
        header: 'Phone No',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: 'Action',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusSwitch />
            <IconButton onClick={() => handleDelete(row.original.owner_id)}>
              <DeleteIcon sx={{color: "red"}} />
            </IconButton>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: users, 
  });

  const handlopenAddUser  =  ()  => {
    setOpenAddUser(true)
  }
  const handlCloseAddUser  =  ()  => {
    setOpenAddUser(false)
  }

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      <Box position="absolute" top={29} left={25}>
        <Button variant="contained" color="warning" sx={{zIndex:"1000"}}  onClick={handlopenAddUser}>
          Add User
        </Button>
      </Box>
 { openAddUser&& < AddUser  open ={openAddUser} onClose = {handlCloseAddUser} />}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default UserTable;
