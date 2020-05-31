import React from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import gql from "graphql-tag";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = (props: any) => {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data);
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <div className="header">
            <h3>Reading Schedule Generator</h3>
          </div>
          <div className="App-main">
            {data.isLoggedIn ? <Home /> : <Login />}
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
};

export default App;
