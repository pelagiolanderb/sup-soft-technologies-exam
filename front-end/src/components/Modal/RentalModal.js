import React, { useEffect, useState } from "react";
import "./RentalModal.css";

const RentalModal = ({
  isOpen,
  onClose,
  onSubmit,
  handleFetchRentals,
  isUpdate,
  homeData,
  onSubmitUpdate,
}) => {
  const [rentalDetails, setRentalDetails] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isUpdate && homeData) {
      setRentalDetails({
        title: homeData.title || "",
        description: homeData.description || "",
        price: homeData.price || "",
        location: homeData.location || "",
        image: null,
      });
    }
  }, [isUpdate, homeData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setRentalDetails((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", rentalDetails.title);
    formData.append("description", rentalDetails.description);
    formData.append("price", rentalDetails.price);
    formData.append("location", rentalDetails.location);
    if (rentalDetails.image) formData.append("image", rentalDetails.image);

    try {
      if (isUpdate) {
        console.log('bago ibato', rentalDetails);
        await onSubmitUpdate(homeData.id, formData);
      } else {
        await onSubmit(formData);
      }
      setRentalDetails({
        title: "",
        description: "",
        price: "",
        location: "",
        image: null,
      });
      handleFetchRentals();
    } catch (error) {
      setError("Failed to submit rental.");
    } finally {
      onClose();
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">
          {isUpdate ? "Update Rental" : "Create New Rental"}
        </h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={rentalDetails.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={rentalDetails.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={rentalDetails.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={rentalDetails.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">
            {loading
              ? "Loading..."
              : isUpdate
              ? "Update Rental"
              : "Create Rental"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentalModal;
