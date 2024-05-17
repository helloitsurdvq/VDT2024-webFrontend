/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CircularProgress } from "@mui/material";

import Table from "../../components/Table";
import Button from "../../components/Button";

import api from "../../services/cloudAPI";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainees = await api.getAllTrainees();
        setData(trainees.data);
      } catch (error) {
        setError("Failed to fetch trainees");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const renderTable = () => {
    if (loading) {
      return (
        <p className="flex items-center justify-center">
          <CircularProgress />
        </p>
      );
    }
    if (error) {
      return <p className="flex items-center justify-center">{error}</p>;
    }
    return <Table data={data} setData={setData} />; 
  };

  return (
    <>
      <div className="flex items-center justify-center py-5 mb-5">
        <div style={{ width: "90%", display: "flex" }}>
          <h1 className="flex-1 text-2xl font-medium">
            Welcome to VDT Cloud Trainee Manager!
          </h1>
          <div className="flex space-x-4">
            <Button
              label="Add"
              startIcon={<AddIcon />}
              // onClick={handleAddClick}
            />
          </div>
        </div>
      </div>
      {renderTable()}
    </>
  );
}