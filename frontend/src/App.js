
import Login from "./pages/First/First";
import Page from "./pages/Page/Page";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
 
} from "react-router-dom";



const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
       
        <Route path="/page"element={ <Page />}/>
       
      </Routes>
    </Router>
  );
};

export default App;