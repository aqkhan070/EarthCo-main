<div className="print-page-width">
<div style={{ width: "28.7cm" }}>
  <div className="row ">
    <div className="col-md-1">
      {isMail ? (
        <></>
      ) : (
        <button
                  className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                  onClick={() => {
                    navigate(`/summary-report`);
                  }}
                  style={{ padding: "5px 10px" }}
                >
                  <ArrowBackIcon sx={{ fontSize: 17 }} />
                </button>
      )}
    </div>
    <div className="col-md-11 text-end">
      {" "}
      <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handlePrint}
              >
                <i className="fa fa-print"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handleDownload}
              >
                <i className="fa fa-download"></i>
              </button>
      {isMail ? (
        <></>
      ) : (
        <button
                  className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                  onClick={() => {
                    // sendEmail(
                    //   `/general-report?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                    //   customerParam,
                    //   0,
                    //   false
                    // );
                    navigate(`/send-mail?title=${"Report"}&mail=${customerMail}`);
                  }}
                >
                  <i className="fa-regular fa-envelope"></i>
                </button>
      )}
    </div>
  </div>
</div>
</div>