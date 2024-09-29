"use client";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Typography, MenuItem, Select, IconButton } from "@mui/material";
import { GetUserOrders } from "@/app/api/user/GetUserRoles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import { GetUserRoles } from "@/app/api/user/GetUserRoles";

// Status component to handle status logic and display
const StatusSwitch = ({ currentStatus, onChangeStatus }) => {
  if (currentStatus === "Delivered") {
    return <CheckCircleIcon style={{ color: "green" }} />;
  }

  return (
    <Select
      value={currentStatus}
      onChange={(e) => onChangeStatus(e.target.value)}
      style={{
        backgroundColor: currentStatus === "Preparing" ? "yellow" : "green",
        color: "white",
        fontWeight: "bold",
        borderRadius: 4,
      }}
    >
      <MenuItem value="Preparing" style={{ color: "black" }}>
        Preparing
      </MenuItem>
      <MenuItem value="Ready" style={{ color: "black" }}>
        Ready
      </MenuItem>
    </Select>
  );
};

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [roleListes, setUserRolesList] = useState([]);



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
  


  const columns = useMemo(
    () => [
    //   {
    //     accessorKey: "name",
    //     header: "Name",
    //     size: 150,
    //   },
    //   {
    //     accessorKey: "topping",
    //     header: "Toppings",
    //     size: 150,
    //   },
    //   {
    //     accessorKey: "quantity",
    //     header: "Quantity",
    //     size: 150,
    //   },
    //   {
    //     accessorKey: "customerNo",
    //     header: "Customer No",
    //     size: 150,
    //   },
    //   {
    //     accessorKey: "createdAt",
    //     header: "Created at",
    //     size: 150,
    //   },
    {
        accessorKey: "name", // access the role name
        header: "Role Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ row, cell }) => {
          const [currentStatus, setCurrentStatus] = useState(row.original.status);

          const handleStatusChange = (newStatus) => {
            setCurrentStatus(newStatus);
            // Optionally handle server updates for the status here
            // e.g., updateStatus(row.original.id, newStatus);
          };

          return (
            <StatusSwitch currentStatus={currentStatus} onChangeStatus={handleStatusChange} />
          );
        },
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={() => handleDelete(row.original.owner_id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  /// Fetch user orders from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await GetUserOrders();
        console.log("Fetched orders", result.userRoles);
        setOrders(result.userRoles); // Save the fetched user orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: roleListes, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      {/* Container for Button and Table */}
      <Box position="absolute" top={29} left={25}>
        <Typography>
          Package
        </Typography>
      </Box>

      {/* Table */}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OrderTable;
