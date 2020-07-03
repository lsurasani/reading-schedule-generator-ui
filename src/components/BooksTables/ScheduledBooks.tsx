import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { formatDate, sortByDate } from "../../shared/utils";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import ScheduleBook from "../modals/ScheduleBook";

const createRows = (data: any) => {
  let rows: Array<Record<string, string>> = [];
  data.forEach((item: any) => {
    const row = {
      id: item.id,
      title: item.book.title,
      author: item.book.author,
      pages: item.book.pages,
      start: formatDate(item.startDate),
      end: formatDate(item.endDate),
      startDate: item.startDate,
      endDate: item.endDate,
    };
    rows.push(row);
  });
  return rows;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      minHeight: 450,
    },
    editButton: {
      float: "right",
    },
  })
);

const ScheduledBooks = (props: any) => {
  const { loading, error, data, editBook, scheduleBookModalOptions } = props;

  const classes = useStyles();
  const rowsPerPage = 5;

  const emptySelection = {
    id: "",
    title: "",
    author: "",
    pages: "",
    startDate: "",
    endDate: "",
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

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        disabled={!selected.id}
        className={classes.editButton}
        onClick={() => selected.id && scheduleBookModalOptions.handleOpen()}
      >
        <EditIcon />
        Edit
      </Button>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}
      {data ? (
        <div>
          <TableContainer className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Pages</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {createRows(data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort((a, b) => sortByDate(a.startDate, b.startDate))
                  .map((book) => {
                    const isItemSelected = isSelected(book.id);
                    return (
                      <TableRow key={book.id} onClick={() => handleClick(book)}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.pages}</TableCell>
                        <TableCell>{book.start}</TableCell>
                        <TableCell>{book.end}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {data && data.length > rowsPerPage ? (
            <TablePagination
              component="div"
              rowsPerPageOptions={[]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            />
          ) : null}
        </div>
      ) : (
        <div></div>
      )}
      <ScheduleBook
        isOpen={scheduleBookModalOptions.isOpen}
        handleClose={scheduleBookModalOptions.handleClose}
        title={selected.title}
        author={selected.author}
        scheduleBook={editBook}
        userBookId={selected.id}
        initialStart={selected.startDate}
        initialEnd={selected.endDate}
        clearSelectedBook={() => setSelected(emptySelection)}
      />
    </div>
  );
};

export default ScheduledBooks;
