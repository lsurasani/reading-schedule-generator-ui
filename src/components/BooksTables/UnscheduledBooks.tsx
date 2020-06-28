import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import TablePagination from "@material-ui/core/TablePagination";
import AddIcon from "@material-ui/icons/Add";
import AddBook from "../modals/AddBook";
import ScheduleBook from "../modals/ScheduleBook";

const createRows = (data: any) => {
  let rows: Array<Record<string, string>> = [];
  data.forEach((item: any) => {
    const row = {
      id: item.id,
      title: item.book.title,
      author: item.book.author,
      pages: item.book.pages,
    };
    rows.push(row);
  });
  return rows;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      minHeight: 350,
    },
    table: {
      minWidth: 500,
    },
    editButton: {
      float: "right",
    },
    addBook: {
      marginTop: 20,
    },
  })
);

const UnscheduledBooks = (props: any) => {
  const {
    loading,
    error,
    data,
    createBook,
    editBook,
    addBookModalOptions,
    scheduleBookModalOptions,
  } = props;
  const rowsPerPage = 5;

  const emptySelection = {
    id: "",
    title: "",
    author: "",
    pages: "",
  };
  const [selected, setSelected] = useState(emptySelection);
  const [page, setPage] = useState(0);

  const handleClick = (book: any) =>
    !isSelected(book.id) || selected === emptySelection
      ? setSelected(book)
      : setSelected(emptySelection);

  const isSelected = (id: string) => selected.id === id;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const classes = useStyles();
  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}
      <Button
        variant="contained"
        color="secondary"
        disabled={!selected.id}
        className={classes.editButton}
        onClick={() => selected.id && scheduleBookModalOptions.handleOpen()}
      >
        <CalendarTodayIcon />
        Schedule
      </Button>
      {data ? (
        <div>
          <TableContainer className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Pages</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {createRows(data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((book) => {
                    const isItemSelected = isSelected(book.id);
                    return (
                      <TableRow key={book.id} onClick={() => handleClick(book)}>
                        <Checkbox checked={isItemSelected} />
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.pages}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </div>
      ) : (
        <div></div>
      )}
      <Button
        className={classes.addBook}
        variant="contained"
        color="primary"
        onClick={() => addBookModalOptions.handleOpen()}
      >
        <AddIcon />
        Add Book
      </Button>
      <AddBook
        isOpen={addBookModalOptions.isOpen}
        handleClose={addBookModalOptions.handleClose}
        createBook={createBook}
      />
      <ScheduleBook
        isOpen={scheduleBookModalOptions.isOpen}
        handleClose={scheduleBookModalOptions.handleClose}
        title={selected.title}
        author={selected.author}
        scheduleBook={editBook}
        userBookId={selected.id}
      />
    </div>
  );
};

export default UnscheduledBooks;
