import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Home } from "./Pages/Home";
import AuthPage from "./Pages/AuthPage";
//import {About} from "./Pages/About";
//import { Login } from "./Pages/Login";
import { ShopPage } from "./Pages/ShopPage";

function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/auth" element={<AuthPage />}></Route>
       <Route path="/Dashboad" element={<ShopPage />}></Route> 
      </Routes>  
    </Router>
  );
}

export default App;