import { Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Protected from "./pages/protected/Protected";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Register from "./pages/register/Register";
import UpdateUser from "./pages/updateUser/UpdateUser";
import Admin from "./pages/adminUser/AdminUser";
import Agregar from "./pages/adminUser/Agregar";
import Modificar from "./pages/adminUser/Modificar";
import Shop from "./pages/buy/Buy";
import GenderCatalog from "./pages/adminUser/AdminGender";
import PaymentCatalog from "./pages/adminUser/AdminPayment";
import "./css/body.css";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/updateuser/:email"
          component={UpdateUser}
        />
        <Route
          exact
          path="/admin"
          component={Admin}
        />
        <Route
          exact
          path="/admin/agregar"
          component={Agregar}
        />
        <Route
          exact
          path="/admin/modificar"
          component={Modificar}
        />
        <Route
          exact
          path="/shop"
          component={Shop}
        />         
        <Route
          exact
          path="/admin/gender"
          component={GenderCatalog}
        />   
        <Route
          exact
          path="/admin/payment"
          component={PaymentCatalog}
        />   
        <Route
          exact
          path="*"
          component={NotFound}
        />
      </Switch>
    </div>
  );
}

export default App;
