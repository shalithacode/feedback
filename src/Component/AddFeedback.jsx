import { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
// import { addCountry } from '../Service/api';
import { useHistory } from "react-router-dom";

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

const AddFeedback = () => {
  const [feedback, setFeedback] = useState(initialValue);
  const { title, description } = feedback;
  const classes = useStyles();
  let history = useHistory();

  const onValueChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const addFeedbackDetails = async () => {
    console.log(feedback);
    fetch("http://localhost:3002/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    history.push("./all");
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Add Feedback</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Select
          onChange={(e) => onValueChange(e)}
          name="title"
          value={title}
          id="my-input"
        >
          <MenuItem value={"Some thing is wrong with this task"}>
            Some thing is wrong with this task
          </MenuItem>
          <MenuItem value={"Suggestions"}>Suggestions</MenuItem>
          <MenuItem value={"Other Problem"}>Other Problem</MenuItem>
          <MenuItem value={"Other Feeedback"}>Other Feeedback</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addFeedbackDetails()}
        >
          Add Feedback
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default AddFeedback;
