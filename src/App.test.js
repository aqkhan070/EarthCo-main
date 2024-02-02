const handleImageSelect = (image) => {
  // Check if the image is already selected
  const isSelected = selectedImages.some(
    (selectedImage) => selectedImage.InvoiceFileId === image.InvoiceFileId
  );

  if (isSelected) {
    // If already selected, remove it from the selectedImages state
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter(
        (selectedImage) =>
          selectedImage.InvoiceFileId !== image.InvoiceFileId
      )
    );
  } else {
    // If not selected, add it to the selectedImages state
    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
  }

  console.log("selected images arew", selectedImages);
};



{PrevFiles.map((file, index) => (
  <div
    key={index}
    className="col-md-2 col-md-2 mt-3 image-container"
    style={{
      width: "150px",
      height: "120px",
    
      position: "relative",
    }}
  >
    <a
      href={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
        alt={file.FileName}
        style={{
          width: "150px",
          height: "120px",
          objectFit: "cover",
        }}
      />
    </a>
    <p
      className="file-name-overlay"
      style={{
        position: "absolute",
        bottom: "0",
        left: "13px",
        right: "0",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        textOverflow: "ellipsis",
        padding: "5px",
      }}
    >
      {file.FileName}
    </p>
    {selectedImages.some(
      (selectedImage) =>
        selectedImage.InvoiceFileId ===
        file.InvoiceFileId
    ) ? (
      <span
        className=""
        style={{
          position: "absolute",
          top: "3px",
          left: "14px",
        }}
      >
        <Tooltip
          title="Click to select image"
          placement="top"
          arrow
        >
          <Checkbox
            checked={true}
            onChange={() => handleImageSelect(file)}
          />
        </Tooltip>
      </span>
    ) : (
      <span
        className=""
        style={{
          position: "absolute",
          top: "3px",
          left: "14px",
        }}
      >
        <Tooltip
          title="Click to select image"
          placement="top"
          arrow
        >
          <Checkbox
            checked={false}
            onChange={() => handleImageSelect(file)}
          />
        </Tooltip>
      </span>
    )}
    <span
      className="file-delete-button"
      style={{
        left: "140px",
      }}
    >
      <span
        onClick={() => {
          deleteEstmFile(
            file.InvoiceFileId,
            fetchEstimates
          );
        }}
      >
        <Delete color="error" />
      </span>
    </span>
  </div>
))}