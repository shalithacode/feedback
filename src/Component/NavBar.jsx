import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles({
  header: {
    background: "#111111",
  },
  tabs: {
    color: "#FFFFFF",
    marginRight: 20,
    textDecoration: "none",
    fontSize: 20,
  },
});

const NavBar = () => {
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <NavLink
          style={{ color: "yellow", fontWeight: "bold" }}
          className={classes.tabs}
          to="all"
          exact
        >
          ABC Company
        </NavLink>
        <NavLink className={classes.tabs} to="add" exact>
          Add Feedback
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
