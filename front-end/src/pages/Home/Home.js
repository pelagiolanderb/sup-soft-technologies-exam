import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { fetchHomes, createHome, deleteHome, updateHome } from "../../api/home";
import RentalModal from "../../components/Modal/RentalModal";

const Home = () => {
  const [rentalHomes, setRentalHomes] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleFetchRentals();
  }, [searchTerm]);

  const handleFetchRentals = async () => {
    setFetchLoading(true);
    setError(null);

    try {
      const response = await fetchHomes(searchTerm);
      setRentalHomes(response);
    } catch (error) {
      setError("Failed to fetch rentals.");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSearch = () => {
    handleFetchRentals();
  };

  const handleCreateRental = (data) => {
    console.log("Rental Data:", data);
    setModalOpen(false);
  };

  const handleUpdateRental = (homeData) => {
    setHomeData(homeData);
    setUpdate(true);
    setModalOpen(true);
  };

  const handleDeleteHome = async (id) => {
    setDeleteLoading((prev) => [...prev, id]);
    setError(null);

    try {
      await deleteHome(id);
      handleFetchRentals();
    } catch (error) {
      setError("Failed to delete rental.");
    } finally {
      setDeleteLoading((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="rental-homes-container">
        <div className="rental-homes-header">
          <h1>Rental Homes</h1>
          <div className="search-container">
            <label htmlFor="search-rental">Search Rental:</label>
            <input
              type="search"
              name="search-rental"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="rentals-container">
          {fetchLoading ? (
            "Loading..."
          ) : (
            <>
              {rentalHomes.map((home) => (
                <div key={home.id} className="rental-home-card">
                  <img
                    src={`http://127.0.0.1:8000${home.image}`}
                    alt={home.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <h2>{home.title}</h2>
                  <p>{home.description}</p>
                  <p>Price: ${home.price}</p>
                  <p>Location: {home.location}</p>
                  <div className="action-container">
                    <button
                      className="update-btn"
                      onClick={() => handleUpdateRental(home)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteHome(home.id)}
                    >
                      {deleteLoading.includes(home.id)
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
              <div className="rental-home-card add">
                <button onClick={() => setModalOpen(true)}>+</button>
              </div>
            </>
          )}
        </div>
        <RentalModal
          isOpen={isModalOpen}
          onClose={handleCreateRental}
          onSubmit={createHome}
          handleFetchRentals={handleFetchRentals}
          isUpdate={isUpdate}
          homeData={homeData}
          onSubmitUpdate={updateHome}
        />
      </div>
    </>
  );
};

export default Home;
