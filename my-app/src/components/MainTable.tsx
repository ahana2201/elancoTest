import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, Typography } from '@mui/material';


type mainData = {
    ServiceName: string;
    ResourceGroup: string;
    Location: string;
    ConsumedQuantity: number;
    Cost: number;
    UnitOfMeasure: string;
    InstanceId: string;
    Date: string;
  };

  
  const MainTable = () => {
    const columns = useMemo<MRT_ColumnDef<mainData>[]>(
        () => [
            {
                accessorKey: 'ServiceName', 
                header: 'Service Name',
                size: 150,
              },
              {
                accessorKey: 'ResourceGroup',
                header: 'Resource Group',
                size: 150,
              },
              {
                accessorKey: 'Location',
                header: 'Location',
                size: 150,
              },
              {
                accessorKey: 'Date',
                header: 'Date',
                size: 150,
              },
              {
                accessorKey: 'ConsumedQuantity', 
                header: 'Consumed Quantity',
                size: 200
              },
              {
                accessorKey: 'Cost', 
                header: 'Cost',
                size: 200,
                Cell: ({ cell }) => (
                    <Box
                      component="span"
                      sx={(theme) => ({
                        backgroundColor:
                          cell.getValue<number>() > 20
                            ? theme.palette.error.dark
                            : cell.getValue<number>() >= 10 &&
                              cell.getValue<number>() < 20
                            ? theme.palette.warning.dark
                            : theme.palette.success.dark,
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '9ch',
                        p: '0.25rem',
                      })}
                    >
                      {cell.getValue<number>()}
                    </Box>
                  ),
              },
            ],
        [],
      );
    const [posts, setPosts] = useState([]);
    const client = axios.create({
     baseURL: "https://engineering-task.elancoapps.com/api/" 
     });
 
   useEffect(() => {
     client.get('raw').then((response) => {
       console.log(response.data)
       setPosts(response.data);
     });
   }, []);
   
  
  
  return <MaterialReactTable columns={columns} data={posts}
  renderDetailPanel={({ row }) => (
    <Box
      sx={{
        display: 'grid',
        margin: 'auto',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
      }}
    >
      <Typography>Unit of Measure: {row.original.UnitOfMeasure}</Typography>
      <Typography>Instance Id: {row.original.InstanceId}</Typography>
    </Box>
  )}
  /> ;
   
}
export default MainTable;