import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
// import { getCountrys, editCountry } from '../Service/api';

const initialValue = {
  title: "",
  description: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const EditFeedback = () => {
  const [feedback, setFeedback] = useState(initialValue);
  const { title, description } = feedback;
  const { id } = useParams();
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    loadFeedbackDetails();
  }, []);

  const loadFeedbackDetails = async () => {
    fetch(`http://localhost:3002/feedbacks/${id}`, {
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
        setFeedback(myJson);
      });
  };

  const editFeedbackDetails = () => {
    fetch(`http://localhost:3002/feedbacks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    history.push("/all");
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="title"
          value={title}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editFeedbackDetails()}
        >
          Edit Feedback
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default EditFeedback;
