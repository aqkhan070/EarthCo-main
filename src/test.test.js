import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [inputData, setInputData] = useState({});
  const [bigArray, setBigArray] = useState([]); // State for the big array

  useEffect(() => {
    // Function to extract name attributes from all form inputs
    const extractInputNames = () => {
      const inputElements = document.querySelectorAll('form input');
      const nameArray = Array.from(inputElements).map(input => input.getAttribute('name'));

      // Create an object with keys from nameArray
      const dataObject = {};
      nameArray.forEach(name => {
        dataObject[name] = ''; // Initialize with empty values
      });

      setInputData(dataObject); // Update the state with the object
    };

    // Call the function when the component loads
    extractInputNames();
  }, []);

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    const updatedData = { ...inputData }; // Create a copy of the existing data

    // Map over the nameArray and assign values from the bigArray
    nameArray.forEach((name, index) => {
      updatedData[name] = bigArray[index] || ''; // Use a value from the bigArray if available, otherwise use an empty string
    });

    setInputData(updatedData); // Update the state with the updated data
  };

  // Map over the nameArray to create input fields
  const inputFields = nameArray.map(name => (
    <div key={name}>
      <label>{name}: </label>
      <input
        type="text"
        name={name}
        value={inputData[name]}
        onChange={event => {
          const { name, value } = event.target;
          setInputData(prevData => ({
            ...prevData,
            [name]: value,
          }));
        }}
      />
    </div>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {inputFields}
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(inputData, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
