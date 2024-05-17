import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "../Button";

// const handleEdit = (id) => {
//   console.log(`Edit trainee with id: ${id}`);
// };

// const handleInfo = (id) => {
//   console.log(`Info for trainee with id: ${id}`);
// };

export default function Table(props) {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [Trainee, setTrainee] = useState(null);

  const handleClickOpen = (trainee) => {
    setTrainee(trainee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTrainee(null);
  };
  
  const renderActions = (params) => {
    return (
      <>
        <EditOutlinedIcon
          style={{ cursor: 'pointer', marginRight: 8 }}
          // onClick={() => handleEdit(params.row._id)}
        />
        <InfoOutlinedIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handleClickOpen(params.row)}
        />
      </>
    );
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
      <div
        style={{ height: 600, width: "90%", display: "flex" }}
      >
        <DataGrid
          rows={data}
          getRowId={(r) => r._id}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Trainee Information</DialogTitle>
        <DialogContent>
          {Trainee && (
            <DialogContentText>
              <div><strong>Name:</strong> {Trainee.name}</div>
              <div><strong>Email:</strong> {Trainee.email}</div>
              <div><strong>Gender:</strong> {Trainee.gender}</div>
              <div><strong>School:</strong> {Trainee.school}</div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
