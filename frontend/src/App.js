import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import ViewDataComponent from './components/ViewDataComponent';
import FormComponent from './components/FormComponent';
import NavBar from './components/NavBar'; 
import EditFormComponent from './components/EditFormComponent';


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (

    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/view" element={<ViewDataComponent />} />
          <Route path="/edit/:id" element={<EditFormComponent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
