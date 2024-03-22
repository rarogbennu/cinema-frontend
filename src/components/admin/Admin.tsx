import { useState } from "react";
import AddMovieForm from "./AddMovieForm";
import AdminScreenings from "./AdminScreenings";
import { useAuth } from "../../security/AuthProvider";
import AddScreeningForm from "./AddScreeningForm";

export default function Admin() {
  const [showAddMovieForm, setShowAddMovieForm] = useState<boolean>(false);
  const [showAddScreeningForm, setShowAddScreeningForm] =
    useState<boolean>(false);

  const handleAddMovieButtonClicked = () => {
    setShowAddMovieForm(true);
  };
  const handleAddScreeningButtonClicked = () => {
    setShowAddScreeningForm(true);
  };
  const auth = useAuth();

  return (
    <>
      <h2>Admin</h2>
      {auth.isLoggedInAs(["ADMIN"]) && (
        <button onClick={handleAddMovieButtonClicked} className="add-button">
          Tilføj ny film
        </button>
      )}
      {auth.isLoggedInAs(["ADMIN"]) && (
        <button
          onClick={handleAddScreeningButtonClicked}
          className="add-button"
        >
          Tilføj screening
        </button>
      )}
      {showAddMovieForm && <AddMovieForm />}
      {showAddScreeningForm && <AddScreeningForm />}
      <AdminScreenings />
    </>
  );
}
