"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Typography,
  MenuItem,
  IconButton,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";

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
import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";
const OrderTable = () => {



  const [open, setOpen] = useState(false);
  const [toppingsList, setToppingsList] = useState([]);
  const [name, setName] = useState({});
  const [quantity, setQuantity] = useState();

  const [tempFilterCriteria, setTempFilterCriteria] = useState({
    status: "",
    createdAt: "",
    pizzaName: "",
  });
  const [filterCriteria, setFilterCriteria] = useState(tempFilterCriteria); // This will store the active filter criteria

  const handleFilterChange = (filterName, value) => {
    setTempFilterCriteria((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  const applyFilters = () => {
    // console.log("see all criteria:", filterCriteria);
    setFilterCriteria(tempFilterCriteria); // Update the active filters only when "Apply" is clicked
  };

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
  const { ability } = useAuth();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders);
  const { restaurantId } = useAuth();
  // console.log("see all orders:", orders);
  // Fetch orders on component mount
  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchOrdersRequest({ restaurantId, filterCriteria }));
    }
  }, [restaurantId, filterCriteria]);

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
        enableEditing: true, // makes this column editable
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
    if (ability?.can("read", "customerPhone")) {
      baseColumns.push({
        accessorKey: "customer.phoneNumber",
        header: "Customer No",
        size: 150,
      });
    }

    // Conditionally add the "Status" column
    if (ability?.can("update", "order")) {
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

  const handleExport = () => {
    console.log("orders", orders);
    console.log("export here");

    // Flatten and format data
    const flattenedOrders = orders.map((order) => {
      return {
        orderId: order.id,
        status: order.status,
        createdAt: new Date(order.createdAt).toLocaleString("en-GB", {
          timeZone: "UTC",
        }), // Format date to 'DD/MM/YYYY HH:mm:ss'
        updatedAt: new Date(order.updatedAt).toLocaleString("en-GB", {
          timeZone: "UTC",
        }), // Format date
        quantity: order.quantity,

        // Customer details
        customerId: order.customer.id,
        customerEmail: order.customer.email,
        customerPhoneNumber: order.customer.phoneNumber,

        // Restaurant details
        restaurantId: order.restaurant.id,
        restaurantName: order.restaurant.name,
        restaurantLocation: order.restaurant.location,

        // Pizza details
        pizzaName: order.pizzas.map((p) => p.pizza.name).join(", "),
        pizzaPrice: order.pizzas.map((p) => p.pizza.price).join(", "),
        toppings: order.pizzas
          .map((p) => p.toppings.map((t) => t.name).join(", "))
          .join("; "),
      };
    });

    // Convert to CSV
    const csv = Papa.unparse(flattenedOrders);

    // Create and download CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box height={"100vh"} padding={"12px"} position="relative">
      <Box display={"flex"} justifyContent={"center"} paddingBottom={0.5}>
        <Typography
          sx={{ zIndex: "1000" }}
          position="absolute"
          top={18}
          left={25}
        >
          Orders
        </Typography>
        {/* Filters Section */}
        <Box display="flex" gap={2} marginBottom={1}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={tempFilterCriteria.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              displayEmpty
              sx={{ height: "40px" }} // Adjust height if needed
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Ready">Ready</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Created Date"
            value={tempFilterCriteria.createdAt}
            onChange={(e) => handleFilterChange("createdAt", e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small" // Use small size
            sx={{ "& .MuiInputBase-root": { height: "40px" } }} // Adjust height
          />

          <TextField
            label="Pizza Name"
            value={tempFilterCriteria.pizzaName}
            onChange={(e) => handleFilterChange("pizzaName", e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small" // Use small size
            sx={{ "& .MuiInputBase-root": { height: "40px" } }} // Adjust height
          />

          <Button variant="contained" onClick={applyFilters} size="small">
            Apply Filters
          </Button>
        </Box>

        <Box
          position={"absolute"}
          sx={{ zIndex: "1000", cursor: "pointer" }}
          top={14}
          right={225}
          onClick={handleExport}
        >
          <Image src={"/icons/Action Icon.png"} width={30} height={30} />
        </Box>
      </Box>

      {/* Check if there are any orders */}
      {!orders || orders?.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ marginBottom: "90px" }}
          >
            No orders available
          </Typography>
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
