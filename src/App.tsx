import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ViewOrg } from "./Components/Operations/ViewOrg";
import { UpdateOrg } from "./Components/Operations/UpdateOrg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ViewOrg} />
        <Route exact path="/UpdateOrg" component={UpdateOrg} />
      </Switch>
    </Router>
  );
};

export default App;
