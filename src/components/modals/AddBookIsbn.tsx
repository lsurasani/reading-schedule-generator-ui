import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const AddBookIsbn = (props: any) => {
  const { isOpen, handleClose, createBook } = props;
  const errorDefault = {
    isbn: "",
    startDate: "",
    endDate: "",
  };

  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState(errorDefault);
  const [startDate, setSelectedStartDate] = useState<Date | null>(null);
  const [endDate, setSelectedEndDate] = useState<Date | null>(null);

  const clearState = () => {
    setIsbn("");
    setError(errorDefault);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  const handleChange = (
    changeFn: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    changeFn(event.target.value);
  };

  const validateInputs = () => {
    const noEndDateError = !endDate
      ? "End date is required if supplying a start date"
      : "";
    const endDateError =
      startDate && endDate && startDate.getTime() > endDate.getTime()
        ? "End date must be after start date"
        : "";

    const isbnError = isbn.length === 13 ? "" : "ISBN must be 13 letters";

    const newErrors = {
      isbn: isbnError,
      startDate:
        endDate && !startDate
          ? "Start date is required if supplying an end date"
          : "",
      endDate: startDate ? noEndDateError || endDateError : "",
    };
    setError(newErrors);

    if (JSON.stringify(newErrors) === JSON.stringify(errorDefault)) {
      submitInputs();
    }
  };

  const submitInputs = () => {
    const userBookInputs = {
      input: {
        isbn,
        startDate,
        endDate,
      },
    };

    createBook({ variables: userBookInputs });
    clearState();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="add-book-dialog">Add Book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add a book to your list using its ISBN-13 number.
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              error={!!error.isbn}
              helperText={error.isbn}
              margin="dense"
              id="isbn"
              label="ISBN-13"
              value={isbn}
              onChange={(e) => handleChange(setIsbn, e)}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              error={!!error.startDate}
              helperText={error.startDate}
              disableToolbar
              clearable
              format="MM/dd/yyyy"
              margin="normal"
              id="start-date"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              error={!!error.endDate}
              helperText={error.endDate}
              disableToolbar
              clearable
              format="MM/dd/yyyy"
              margin="normal"
              id="end-date"
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              minDate={startDate ? startDate : null}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={validateInputs} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookIsbn;
