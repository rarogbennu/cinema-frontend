import "./App.css";
import Layout from "./components/navigation/Layout";
import { Route, Routes } from "react-router-dom";
import CinemaList from "./components/cinema/CinemaList";
import Cinema from "./components/cinema/Cinema";
import MoviesLayout from "./components/movie/MoviesLayout";
import Movie from "./components/movie/Movie";
import Home from "./components/navigation/Home";
import LoginComponent from "./security/LoginComponent";
import LogoutComponent from "./security/LogoutComponent.tsx";
import RequireAuth from "./security/RequireAuth.tsx";
import ReservationComponent from "./components/reservations/ReservationComponent.tsx";
// import ScreeningsComponent from "./components/screenings/ScreeningComponent.tsx";


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinemas/" element={<CinemaList />} />
            <Route path="/cinemas/:id" element={<Cinema />} />
          <Route path="/movies" element={<MoviesLayout />}>
            <Route path=":id" element={<Movie />} />
          </Route>
          <Route path="/screenings/:id" element={<ReservationComponent />} /> 
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="/add" 
            element={    
              <RequireAuth roles={["ADMIN"]}>
                <p>Only for admins</p>
              </RequireAuth>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
