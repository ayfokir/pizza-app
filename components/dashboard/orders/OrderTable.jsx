"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Typography, MenuItem, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersRequest,
  updateOrderStatus,
} from "@/redux/slices/orderSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ToopingDetail from "./ToopingDetail";
import { Menu, FormControlLabel, Radio } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import the arrow icon
import CustomStatusSwitch from "./CustomStatusSwitch";
import { updateOrderRequest } from "@/redux/slices/orderSlice";
import { useAuth } from "@/context/AuthContext";
// import { useAuth } from "@/context/AuthContext";
const OrderTable = () => {
  const [open, setOpen] = useState(false);
  const [toppingsList, setToppingsList] = useState([]);
  const [name, setName] = useState({});
  const [quantity, setQuantity] = useState();
  const handleOpen = (orders) => {
    if (orders?.pizzas && orders?.pizzas?.length > 0) {
      setToppingsList(orders?.pizzas[0]?.toppings);
      setName(orders?.pizzas[0]?.pizza?.name);
    }
    setQuantity(orders.quantity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 const {ability}  = useAuth()
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders);
  const {restaurantId} =  useAuth()
  console.log("see all orders:", orders)
  // Fetch orders on component mount
  useEffect(() => {
    if(restaurantId) {
      dispatch(fetchOrdersRequest(restaurantId));
    }
  }, [restaurantId]);

  // Function to update the order status in the database
  const handleStatusChange = (orderId, newStatus) => {
    // console.log("see handleStatus:", orderId);
    // console.log("see handleStatus:", newStatus);
    dispatch(updateOrderRequest({ orderId, newStatus }));
  };
  



  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "pizzas[0].pizza.name",
        header: "Pizza Name",
        size: 150,
        Cell: ({ row }) => (
          <Typography>
            {row.original?.pizzas[0]?.pizza?.name || "N/A"}
          </Typography>
        ),
      },
      {
        accessorKey: "pizzas[0].toppings",
        header: "Toppings",
        size: 150,
        Cell: ({ row }) => (
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => handleOpen(row.original)}
          >
            <VisibilityIcon
              sx={{ fontSize: 16, marginRight: "5px", color: "#FF9921" }}
            />
            <Typography sx={{ color: "#FF9921" }}>Toppings</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        size: 150,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          return date.toLocaleDateString();
        },
      },
    ];
  
    // Conditionally add "Customer No" column for non-Kitchen Man roles
    if (ability.can("read", "customerPhone")) {
      baseColumns.push({
        accessorKey: "customer.phoneNumber",
        header: "Customer No",
        size: 150,
      });
    }
  
    // Conditionally add the "Status" column
    if (ability.can("update", "order")) {
      baseColumns.push({
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ row }) => (
          <CustomStatusSwitch
            currentStatus={row.original.status}
            onChangeStatus={(newStatus) => {
              handleStatusChange(row.original.id, newStatus); // Update status in DB
            }}
          />
        ),
      });
    }
  
    return baseColumns;
  }, [ability]);
  

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      <Box position="absolute" top={29} left={25} sx={{ zIndex: "1000" }}>
        <Typography>Orders</Typography>
      </Box>

      {/* Check if there are any orders */}
      {!orders || orders?.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6" color="textSecondary" sx={{marginBottom: "90px"}}>No orders available</Typography>
        </Box>
      ) : (
        <MaterialReactTable columns={columns} data={orders} />
      )}

      {open && (
        <ToopingDetail
          open={open}
          onClose={handleClose}
          orderDetails={{
            toppings: toppingsList,
            name: name,
            quantity: quantity,
          }}
        />
      )}
    </Box>
  );
};

export default OrderTable;
