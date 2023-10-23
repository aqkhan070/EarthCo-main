const handleSubmit = () => {
  const postData = new FormData();

  // Merge the current items with the new items for EstimateData
  const mergedEstimateData = {
      ...formData.EstimateData,
      tblEstimateItems: [
          ...formData.EstimateData.tblEstimateItems,
          ...itemForm.tblEstimateItems,
      ]
  };

  // Append mergedEstimateData as a stringified JSON to postData
  postData.append('EstimateData', JSON.stringify(mergedEstimateData));

  appendFilesToFormData(postData);

  // Call submitData with postData
  submitData(postData);
};

const appendFilesToFormData = (formData) => {
  Files.forEach((fileObj) => {
      formData.append('Files', fileObj.actualFile);
  });
};

const submitData = async (postData) => {
  try {
      const response = await axios.post(
          "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
          postData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
      );

      if (response.status === 200) {
          console.log("Data submitted successfully:", response.data);
      } else {
          console.log("Error submitting data:", response.statusText);
      }
  } catch (error) {
      console.error("API Call Error:", error);
  }

  // Logging FormData contents (for debugging purposes)
  for (let [key, value] of postData.entries()) {
      console.log(key, value);
  }
};
