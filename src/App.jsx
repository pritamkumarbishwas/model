import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
    setFormErrors({});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      alert('Form submitted successfully!');
      closeModal();
    } else {
      setFormErrors(errors);
      Object.values(errors).forEach(error => alert(error));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email || !data.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = 'Invalid email. Please check your email address.';
    }
    if (!data.phone || !data.phone.match(/^\d{10}$/)) {
      errors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    }
    if (!data.dob || new Date(data.dob) >= new Date()) {
      errors.dob = 'Invalid date of birth. Date of birth cannot be in the future.';
    }
    return errors;
  };

  return (
    <div className="App">
      <button onClick={openModal}>Open Form</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={formData.username} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
                {formErrors.phone && <span className="error">{formErrors.phone}</span>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
                {formErrors.dob && <span className="error">{formErrors.dob}</span>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
