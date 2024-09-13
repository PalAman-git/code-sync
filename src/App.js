import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    {/* added the toast for the success message on top right */}
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
