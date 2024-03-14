import "./App.css";
import Layout from "./components/navigation/Layout";
import { Route, Routes } from "react-router-dom";
import CinemaList from "./components/cinema/CinemaList";
import MoviesLayout from "./components/movie/MoviesLayout";
import Movie from "./components/movie/Movie";
import Home from "./components/navigation/Home";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinemas/" element={<CinemaList />} />
          <Route path="/movies" element={<MoviesLayout />}>
            <Route path=":id" element={<Movie />} />
          </Route>
          <Route
            path="/add"
            element={<h2>Not implemented</h2>}
            // element={
            //   // <RequireAuth roles={["ADMIN"]}>
            //   // <ChangeUsers />
            //   // </RequireAuth>
            // }
          />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="*"
            element={
              <h2>
                Side ikke fundet <br />
                <a href="/">Gå til forside</a>
              </h2>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
