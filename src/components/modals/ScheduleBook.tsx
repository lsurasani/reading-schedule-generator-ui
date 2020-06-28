import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DatePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const ScheduleBook = (props: any) => {
  const {
    isOpen,
    handleClose,
    scheduleBook,
    title,
    author,
    userBookId,
  } = props;
  console.log(props);
  const errorDefault = {
    startDate: "",
    endDate: "",
  };

  const [error, setError] = useState(errorDefault);
  const [startDate, setSelectedStartDate] = useState<Date | null>(null);
  const [endDate, setSelectedEndDate] = useState<Date | null>(null);

  const clearState = () => {
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

  const validateInputs = () => {
    const noEndDateError = !endDate
      ? "End date is required if supplying a start date"
      : "";
    const endDateError =
      startDate && endDate && startDate.getTime() > endDate.getTime()
        ? "End date must be after start date"
        : "";

    const newErrors = {
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
        id: userBookId,
        startDate,
        endDate,
      },
    };

    scheduleBook({ variables: userBookInputs });
    clearState();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="add-book-dialog">Schedule Book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {title} by {author}
        </DialogContentText>
        <Grid container spacing={1}>
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

export default ScheduleBook;
