import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/api/items/`);
        const data = await response.json();
        setItems(data.items || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "857px" }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        style={{ marginBottom: "20px" }}
      >
        Item List
      </Typography>

      {/* Show loader if loading */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Item ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Available for Checkout</TableCell>
                <TableCell align="center">Queue</TableCell>
                <TableCell align="center">Notification Status</TableCell>
                <TableCell align="center">Pickup Deadline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.item_id}>
                  <TableCell align="center">{item.item_id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.available_for_checkout ? 
                    
                    <span style={{color:"green"}}>Yes</span> : 
                    
                    
                    <span style={{color:"red"}}>No</span> }
                  </TableCell>
                  <TableCell align="center">
                    {item.reservation_queue.length > 0 ? (
                      item.reservation_queue.map((queue, index) => (
                        <div key={index}>
                          {`Customer ${queue.customer_id} (Position: ${queue.queue_position})`}
                        </div>
                      ))
                    ) : (
                      <span>None</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.reservation_queue.length > 0
                      ? item.reservation_queue[0].notification_status
                      : "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    {
                      item.reservation_queue.length > 0 &&
                      item.reservation_queue[0].notification_deadline
                        ? new Date(item.reservation_queue[0].notification_deadline).toLocaleDateString('en-US')
                        : "N/A"
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ItemList;
