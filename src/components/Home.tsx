import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import ScheduledBooks from "./BooksTables/ScheduledBooks";
import UnscheduledBooks from "./BooksTables/UnscheduledBooks";
import {
  GET_CURRENT_BOOKS,
  GET_UPCOMING_BOOKS,
  GET_UNSCHEDULED_BOOKS,
} from "../shared/graphql/queries";
import { CREATE_USER_BOOK } from "../shared/graphql/mutations";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddBook from "./AddBook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "white",
      padding: 20,
      margin: 20,
      color: "black",
      WebkitBoxShadow: "-22px 0px 48px 0px rgba(0, 0, 0, 0.75)",
      MozBoxShadow: "-22px 0px 48px 0px rgba(0, 0, 0, 0.75)",
      boxShadow: "-22px 0px 48px 0px rgba(0, 0, 0, 0.75)",
    },
    addBook: {
      marginTop: 20,
    },
  })
);

const Home = () => {
  const [
    getCurrentBooks,
    { loading: currentLoading, error: currentError, data: currentData },
  ] = useLazyQuery(GET_CURRENT_BOOKS);

  const [
    getUpcomingBooks,
    { loading: upcomingLoading, error: upcomingError, data: upcomingData },
  ] = useLazyQuery(GET_UPCOMING_BOOKS);

  const [
    getUnscheduledBooks,
    {
      loading: unscheduledLoading,
      error: unscheduledError,
      data: unscheduledData,
    },
  ] = useLazyQuery(GET_UNSCHEDULED_BOOKS);

  useEffect(() => {
    getCurrentBooks();
    getUpcomingBooks();
    getUnscheduledBooks();
  }, []);

  const [createUserBook] = useMutation(CREATE_USER_BOOK, {
    onCompleted({ createUserBookFromBook }) {
      const newBook = createUserBookFromBook;
      console.log(newBook);
      if (newBook.id) {
        if (newBook.startDate && newBook.endDate) {
          const start = new Date(newBook.startDate);
          const end = new Date(newBook.endDate);
          if (start <= new Date() && end >= new Date()) {
            console.log("current");
            getCurrentBooks();
          } else if (start > new Date()) {
            console.log("upcoming");
            getUpcomingBooks();
          }
        } else {
          console.log("unscheduled");
          getUnscheduledBooks();
        }
        setModal(false);
      }
    },

    onError(error) {
      console.log(error);
    },
  });

  console.log("current data", currentData);
  console.log("upcoming data", upcomingData);

  const [isOpen, setModal] = useState(false);

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      style={{ margin: 0, width: "100%" }}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={4}>
        <Container className={classes.root}>
          <p>Current Books</p>
          <ScheduledBooks
            loading={currentLoading}
            error={currentError}
            data={currentData ? currentData.getCurrentUserBooks : null}
          />
        </Container>
      </Grid>
      <Grid item xs={4}>
        <Container className={classes.root}>
          <p>Upcoming Books</p>
          <ScheduledBooks
            loading={upcomingLoading}
            error={upcomingError}
            data={upcomingData ? upcomingData.getUpcomingUserBooks : null}
          />
        </Container>
      </Grid>
      <Grid item xs={6}>
        <Container className={classes.root}>
          <p>Unscheduled Books</p>
          <UnscheduledBooks
            loading={unscheduledLoading}
            error={unscheduledError}
            data={
              unscheduledData ? unscheduledData.getUnscheduledUserBooks : null
            }
          />
          <Button
            className={classes.addBook}
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add Book
          </Button>
        </Container>
      </Grid>
      <AddBook
        isOpen={isOpen}
        handleClose={handleClose}
        createUserBook={createUserBook}
      />
    </Grid>
  );
};

export default Home;
