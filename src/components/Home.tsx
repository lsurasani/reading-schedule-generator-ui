import React, { useState, ChangeEvent } from "react";
import { useQuery } from "@apollo/react-hooks";
import ScheduledBooks from "./BooksTables/ScheduledBooks";
import UnscheduledBooks from "./BooksTables/UnscheduledBooks";
import {
  GET_CURRENT_BOOKS,
  GET_UPCOMING_BOOKS,
  GET_UNSCHEDULED_BOOKS,
} from "../shared/graphql/queries";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import {
  useCreateBookMutation,
  useEditBookMutation,
} from "../shared/hooks/graphql";
import { homeStyles } from "../styles/HomeStyles";

const Home = () => {
  const {
    loading: currentLoading,
    error: currentError,
    data: currentData,
  } = useQuery(GET_CURRENT_BOOKS);

  const {
    loading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
  } = useQuery(GET_UPCOMING_BOOKS);

  const {
    loading: unscheduledLoading,
    error: unscheduledError,
    data: unscheduledData,
  } = useQuery(GET_UNSCHEDULED_BOOKS);

  const [addBookIsOpen, setAddBookModal] = useState(false);
  const [scheduleBookIsOpen, setScheduleBookModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const addBookHandleOpen = () => {
    setAddBookModal(true);
  };

  const addBookHandleClose = () => {
    setAddBookModal(false);
  };

  const scheduleBookHandleOpen = () => {
    setScheduleBookModal(true);
  };

  const scheduleBookHandleClose = () => {
    setScheduleBookModal(false);
  };

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const createUserBook = useCreateBookMutation(addBookHandleClose);
  const editUserBook = useEditBookMutation(scheduleBookHandleClose);

  const classes = homeStyles();
  return (
    <Container>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
        <Tab label="Scheduled Books" />
        <Tab label="Unscheduled Books" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Grid
          container
          spacing={3}
          style={{ margin: 0, width: "100%" }}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <Container className={classes.root}>
              <p>Current Books</p>
              <ScheduledBooks
                loading={currentLoading}
                error={currentError}
                data={currentData ? currentData.getCurrentUserBooks : null}
                editBook={editUserBook}
                scheduleBookModalOptions={{
                  isOpen: scheduleBookIsOpen,
                  handleClose: scheduleBookHandleClose,
                  handleOpen: scheduleBookHandleOpen,
                }}
              />
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container className={classes.root}>
              <p>Upcoming Books</p>
              <ScheduledBooks
                loading={upcomingLoading}
                error={upcomingError}
                data={upcomingData ? upcomingData.getUpcomingUserBooks : null}
                editBook={editUserBook}
                scheduleBookModalOptions={{
                  isOpen: scheduleBookIsOpen,
                  handleClose: scheduleBookHandleClose,
                  handleOpen: scheduleBookHandleOpen,
                }}
              />
            </Container>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Grid
          container
          spacing={3}
          style={{ margin: 0, width: "100%" }}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <Container className={classes.root}>
              <p>Unscheduled Books</p>
              <UnscheduledBooks
                loading={unscheduledLoading}
                error={unscheduledError}
                data={
                  unscheduledData
                    ? unscheduledData.getUnscheduledUserBooks
                    : null
                }
                createBook={createUserBook}
                editBook={editUserBook}
                addBookModalOptions={{
                  isOpen: addBookIsOpen,
                  handleClose: addBookHandleClose,
                  handleOpen: addBookHandleOpen,
                }}
                scheduleBookModalOptions={{
                  isOpen: scheduleBookIsOpen,
                  handleClose: scheduleBookHandleClose,
                  handleOpen: scheduleBookHandleOpen,
                }}
              />
            </Container>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default Home;
