import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as api from "../../services/api";
import { DateTime } from "luxon";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export const List = () => {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState("");
  const [resdata, setData] = useState({});

  useEffect(() => {
    api.Journals.all().then(({ data, totalItems }) => {
      console.log(data);
      setRows(data);
    });
  }, [setRows]);
  const handleOpenDialog = (id, status) => {
    setData({ id, status });
    setTitle("Are you sure you want to approve this journal?");
    setOpen("approve");
  };

  const handleOpenDeleteDialog = (id) => {
    setData({ id });
    setTitle("Are you sure you want to delete this journal?");
    setOpen("delete");
  };
  const handleCancel = () => {
    setTitle("");
    setOpen("");
    setData({});
  };
  const handleOk = () => {
    if (open === "approve") {
      handleApprove();
      setTitle("");
      setOpen("");
      setData({});
    } else {
      handleDelete();
      setTitle("");
      setOpen("");
      setData({});
    }
  };
  const handleApprove = () => {
    api.Journals.approve(resdata)
      .then(() => {
        setMsg("Journal Approved Successfully!");
      })
      .catch((error) => {
        setMsg(error);
      });
  };

  const handleDelete = () => {
    api.Journals.deleteJournal(resdata)
      .then((res) => {
        setMsg("Journal Deleted Successfully!");
        api.Journals.all().then(({ data, totalItems }) => {
          console.log(data);
          setRows(data);
        });
      })
      .catch((error) => {
        setMsg(error);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMsg("");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Reference</TableCell>
            <TableCell align="right">Account</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.reference}</TableCell>
              <TableCell align="right">{row.AccountId}</TableCell>
              <TableCell align="right">
                {DateTime.fromISO(row.date).toISODate()}
              </TableCell>
              <TableCell align="right">
                {row.currency} {row.amount}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleOpenDialog(row.id, "approved")}
                >
                  <CheckIcon titleAccess="Approve" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleOpenDeleteDialog(row.id)}
                >
                  <DeleteIcon titleAccess="Delete" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={msg}
        autoHideDuration={2000}
        onClose={handleClose}
        message={msg}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};
