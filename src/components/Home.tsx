import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  useLazyQuery,
  useMutation,
  useApolloClient,
} from "@apollo/react-hooks";
import ScheduledBooks from "./BooksTables/ScheduledBooks";
import UnscheduledBooks from "./BooksTables/UnscheduledBooks";
import {
  GET_CURRENT_BOOKS,
  GET_UPCOMING_BOOKS,
  GET_UNSCHEDULED_BOOKS,
} from "../shared/graphql/queries";
import {
  CREATE_USER_BOOK,
  UPDATE_USER_BOOK,
} from "../shared/graphql/mutations";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

async function getUnscheduleBooksQuery(client: any) {
  const { data } = await client.query({
    query: GET_UNSCHEDULED_BOOKS,
  });

  return data;
}

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
  }, [getCurrentBooks, getUnscheduledBooks, getUpcomingBooks]);

  const client = useApolloClient();

  const [createUserBook] = useMutation(CREATE_USER_BOOK, {
    onCompleted({ createUserBookFromBook }) {
      const newBook = createUserBookFromBook;
      if (newBook.id) {
        if (newBook.startDate && newBook.endDate) {
          const start = new Date(newBook.startDate);
          const end = new Date(newBook.endDate);
          if (start <= new Date() && end >= new Date()) {
            currentData.getCurrentUserBooks.push(newBook);
            getCurrentBooks();
          } else if (start > new Date()) {
            upcomingData.getUpcomingUserBooks.push(newBook);
            getUpcomingBooks();
          }
        } else {
          unscheduledData.getUnscheduledUserBooks.push(newBook);
          getUnscheduledBooks();
        }
        setAddBookModal(false);
      }
    },

    onError(error) {
      console.log(error);
    },
  });

  const [editUserBook] = useMutation(UPDATE_USER_BOOK, {
    onCompleted({ updateUserBook }) {
      const userBook = updateUserBook;
      console.log(updateUserBook);
      if (userBook.id) {
        if (userBook.startDate && userBook.endDate) {
          const start = new Date(userBook.startDate);
          const end = new Date(userBook.endDate);
          if (start <= new Date() && end >= new Date()) {
            currentData.getCurrentUserBooks.push(userBook);
            getCurrentBooks();
          } else if (start > new Date()) {
            upcomingData.getUpcomingUserBooks.push(userBook);
            getUpcomingBooks();
          }
        }
        const newData = getUnscheduleBooksQuery(client);
        setScheduleBookModal(false);
        console.log(newData);
        unscheduledData.getUnscheduledUserBooks = newData;
      }
    },

    onError(error) {
      console.log(error);
    },
  });

  const [addBookIsOpen, setAddBookModal] = useState(false);
  const [scheduleBookIsOpen, setScheduleBookModal] = useState(false);

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
      <Grid item xs={5}>
        <Container className={classes.root}>
          <p>Current Books</p>
          <ScheduledBooks
            loading={currentLoading}
            error={currentError}
            data={currentData ? currentData.getCurrentUserBooks : null}
          />
        </Container>
      </Grid>
      <Grid item xs={5}>
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
  );
};

export default Home;
