//main component of the application where all the routes are defined
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/post/new"
                  element={
                    <ProtectedRoute>
                      <NewPost />
                    </ProtectedRoute>
                  }
                />

                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
