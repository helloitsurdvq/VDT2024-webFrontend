/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../Button";
import api from "../../services/cloudAPI";

// const handleEdit = (id) => {
//   console.log(`Edit trainee with id: ${id}`);
// };

// const handleInfo = (id) => {
//   console.log(`Info for trainee with id: ${id}`);
// };

export default function Table(props) {
  const { data, setData } = props;
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [Trainee, setTrainee] = useState(null);

  const handleClickOpen = (data) => {
    if (data.message) {
      setTrainee(data); 
    } else {
      setTrainee(data); 
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTrainee(null);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
    // setTrainee(null);
  };

  const renderActions = (params) => {
    const handleDelete = () => {
      setOpenDel(true);
      setTrainee(params.row);
    };

    return (
      <>
        <InfoOutlinedIcon
          style={{ cursor: "pointer", marginRight: 8 }}
          onClick={() => handleClickOpen(params.row)}
        />
        <EditOutlinedIcon
          style={{ cursor: "pointer", marginRight: 8 }}
          // onClick={() => handleEdit(params.row._id)}
        />
        <DeleteOutlineIcon
          style={{ cursor: "pointer", marginRight: 8 }}
          onClick={handleDelete}
        />
      </>
    );
  };

  const handleDeleteTrainee = async (id) => {
    // Call your API to delete trainee with id
    const response = await api.removeTrainee(id);

    if (response.error) {
      console.error("Error deleting trainee:", response.error);
    } else {
      setOpenDel(false);
      const updatedData = data.filter((trainee) => trainee._id !== id);
      setData(updatedData); 
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 150,
    },
    {
      field: "school",
      headerName: "School",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      renderCell: renderActions,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div style={{ height: 600, width: "90%", display: "flex" }}>
        <DataGrid
          rows={data}
          getRowId={(r) => r._id}
          columns={columns}
          autoPageSize
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Trainee Information</DialogTitle>
        <DialogContent>
          {Trainee && (
            <DialogContentText>
              <div>
                <strong>Name:</strong> {Trainee.name}
              </div>
              <div>
                <strong>Email:</strong> {Trainee.email}
              </div>
              <div>
                <strong>Gender:</strong> {Trainee.gender}
              </div>
              <div>
                <strong>School:</strong> {Trainee.school}
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDel} onClose={handleCloseDel}>
        {Trainee && (
          <>
            {Trainee.message ? (
              <DialogTitle>Success!</DialogTitle>
            ) : (
              <DialogTitle>Delete Trainee Confirmation</DialogTitle>
            )}
            <DialogContent>
              <DialogContentText>
                {Trainee.message
                  ? Trainee.message
                  : `Are you sure you want to delete trainee: ${Trainee.name}? This action cannot be undone.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDel} color="primary">
                Cancel
              </Button>
              {Trainee.message ? null : (
                <Button
                  onClick={() => handleDeleteTrainee(Trainee._id)}
                  color="error"
                >
                  Delete
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}