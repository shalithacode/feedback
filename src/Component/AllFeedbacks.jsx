import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  makeStyles,
} from "@material-ui/core";
// import { getCountrys, deleteCountry } from '../Service/api';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#000000",
      color: "#FFFFFF",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
});

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const deleteFeedbackData = (id) => {
    fetch(`http://localhost:3002/feedbacks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        //console.log(myJson);
      });

    getAllFeedbacks();
  };

  const getAllFeedbacks = () => {
    fetch("http://localhost:3002/feedbacks", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        //console.log(myJson);
        setFeedbacks(myJson);
      });
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>Id</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {feedbacks.map((feedback) => (
          <TableRow className={classes.row} key={feedback.id}>
            <TableCell>{feedback.id}</TableCell>
            <TableCell>{feedback.title}</TableCell>
            <TableCell>{feedback.description}</TableCell>
            <TableCell>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/edit/${feedback.id}`}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => deleteFeedbackData(feedback.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllFeedbacks;
