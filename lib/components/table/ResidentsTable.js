"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { StyledTableCell, StyledTableRow } from "../../styles/tableStyles";
import EmptyComponent from "../emptyComponent";
import StyledIconButton from "../styledIconButton";
import TableLoader from "../tableLoader";
import { Button, Sheet, Table } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import TasksDrawer from "../taskDrawer";
import ReisdentModal from "../modal/ResidentModal";
function ClientTable({
  clients = [],
  onAdd = () => {},
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false,
}) {
  const [residentsData, setResidentsData] = useState([]);
  const [open, setOpen] = useState(false);

  onAdd = () => {
    setOpen(true);
  };

  const getResidentData = async () => {
    let tempResidentsData = await axios.get(
      "http://localhost:5001/getresidents"
    );
    setResidentsData(tempResidentsData.data);
  };
  useEffect(() => {
    getResidentData();
  }, []);

  onAdd = () => {
    setOpen(true);
  };

  return (
    <div className="border border-solid border-grey-500">
      <Table borderAxis="both" size="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email ID</th>
            <th>Society</th>
            <th>Unit No.</th>

            <th style={{ width: "5%" }}>
              <div className="flex flex-row justify-center px-2">
                <Button
                  size="sm"
                  variant="soft"
                  color="neutral"
                  onClick={onAdd}
                >
                  <AddIcon />
                </Button>
              </div>
            </th>
          </tr>
          {residentsData.map((resident) => (
            <tr>
              <td>{resident.name}</td>
              <td>{resident.phone}</td>
              <td>{resident.email}</td>
              <td>{resident.society}</td>
              <td>{resident.unit}</td>
            </tr>
          ))}
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.description}</td>
              <td>
                <div className="flex flex-row justify-end">
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={onEdit(index)}
                    sx={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="soft"
                    color="danger"
                    onClick={onDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReisdentModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      {!residentsData.length ? <EmptyComponent /> : null}
    </div>
  );

  // return (
  //   <TableContainer
  //     sx={{
  //       borderRadius: "5px",
  //       backgroundColor: "white",
  //       borderBottom: "1px solid #ccc",
  //       borderLeft: "1px solid #ccc",
  //       borderRight: "1px solid #ccc",
  //       marginTop: "20px",
  //     }}
  //   >
  //     <Table sx={{ minWidth: 700 }} size="small">
  //       <TableHead
  //       // className="background-color-light"
  //       >
  //         <TableRow>
  //           <StyledTableCell sx={{ fontWeight: "bold" }}>
  //             Client Name
  //           </StyledTableCell>
  //           <StyledTableCell sx={{ fontWeight: "bold" }}>
  //             Client Description
  //           </StyledTableCell>

  //           <StyledTableCell>
  //             <div style={{ display: "flex", justifyContent: "flex-end" }}>
  //               <StyledIconButton icon={<AddIcon />} onClick={onAdd} />
  //             </div>
  //           </StyledTableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {clients.map((client, index) => (
  //           <StyledTableRow key={client.id} sx={{ height: "35px" }}>
  //             <StyledTableCell scope="row">{client.name}</StyledTableCell>
  //             <StyledTableCell scope="row">
  //               {client.description}
  //             </StyledTableCell>

  //             <StyledTableCell>
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   justifyContent: "flex-end",
  //                 }}
  //               >
  //                 <EditIcon
  //                   sx={{
  //                     marginRight: "10px",
  //                     marginLeft: "10px",
  //                     color: "blue",
  //                     cursor: "pointer",
  //                     height: "18px",
  //                   }}
  //                   onClick={onEdit(index)}
  //                 />

  //                 <DeleteIcon
  //                   sx={{
  //                     color: "red",
  //                     cursor: "pointer",
  //                     height: "18px",
  //                   }}
  //                   onClick={onDelete(index)}
  //                 />
  //               </div>
  //             </StyledTableCell>
  //           </StyledTableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //     {isLoading ? (
  //       <TableLoader />
  //     ) : !clients.length ? (
  //       <EmptyComponent />
  //     ) : null}
  //   </TableContainer>
  // );
}

export default ClientTable;
