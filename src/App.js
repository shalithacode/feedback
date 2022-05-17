import AllFeedbacks from "./Component/AllFeedbacks";
import AddFeedback from "./Component/AddFeedback";
import EditFeedback from "./Component/EditFeedback";
import NavBar from "./Component/NavBar";
import NotFound from "./Component/NotFound";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={AllFeedbacks} />
        <Route exact path="/all" component={AllFeedbacks} />
        <Route exact path="/add" component={AddFeedback} />
        <Route exact path="/edit/:id" component={EditFeedback} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
