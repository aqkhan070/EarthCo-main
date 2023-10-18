import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [inputData, setInputData] = useState({});
  const [inputValues, setInputValues] = useState({}); // State to hold input values

  useEffect(() => {
    const extractInputNames = () => {
      const inputElements = document.querySelectorAll('form input');
      const nameArray = Array.from(inputElements).map(input => input.getAttribute('name'));

      const dataObject = {};
      nameArray.forEach(name => {
        dataObject[name] = '';
      });

      setInputData(dataObject);
    };

    extractInputNames();
  }, []);

  const handleButtonClick = () => {
    // Create a new object by copying the existing inputData
    const updatedData = { ...inputData };

    // Loop through the input elements to update the values
    const inputElements = document.querySelectorAll('form input');
    inputElements.forEach(input => {
      const name = input.getAttribute('name');
      const value = input.value;
      updatedData[name] = value;
    });

    // Update the state with the new object
    setInputData(updatedData);
  };

  return (
    <div>
      <form>
        <input type="text" name="input1" />
        <input type="text" name="input2" />
        <input type="text" name="input3" />
      </form>
      <button onClick={handleButtonClick}>Update Values</button>
      
    </div>
  );
}

export default MyComponent;
