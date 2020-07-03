import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const homeStyles = makeStyles((theme: Theme) =>
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
