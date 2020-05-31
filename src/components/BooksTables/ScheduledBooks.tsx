import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { formatDate } from "../../shared/utils";

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
    };
    rows.push(row);
  });
  return rows;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      mindWidth: 500,
    },
  })
);

const ScheduledBooks = (props: any) => {
  const { loading, error, data } = props;

  const classes = useStyles();
  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}
      {data ? (
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {createRows(data).map((book) => (
                <TableRow key={book.name}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.start}</TableCell>
                  <TableCell>{book.end}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ScheduledBooks;
