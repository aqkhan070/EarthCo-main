const EstimatePreview = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const { name, setName, fetchName } = useFetchCustomerName();
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const navigate = useNavigate();
  const { estmPreviewId } = useContext(RoutingContext);
  const { toggleFullscreen, setToggleFullscreen } = useContext(DataContext);

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const [previewData, setPreviewData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const [showbuttons, setShowButtons] = useState(true);

  const handlePrint = () => {
    // setToggleFullscreen(false);
    setShowButtons(false);
    setTimeout(() => {
      window.print();
    }, 1000);
    setTimeout(() => {
      //setToggleFullscreen(true);
      setShowButtons(true);
    }, 3000);
  };

  const fetchEstimates = async () => {
    if (idParam === 0) {
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${idParam}`,
        { headers }
      );
      setPreviewData(response.data);
      fetchEmail(response.data.EstimateData.ContactId);

      console.log("selected estimate is", response.data);
      console.log("selected estimate is", previewData);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  return (
    <>
      <div id="estimate-preview" className=" get-preview ">
        <div style={{ minHeight: "20cm" }} className="card-body perview-pd">
          <div className="row mt-2">
            <div className="col-md-4 col-sm-4">
              <h5 className="mb-0">EarthCo</h5>{" "}
              <h6 className="mb-0">
                1225 East Wakeham Avenue
                <br /> Santa Ana, California <br /> 92705 O 714.571.0455 F
                714.571.0580 CL# C27 823185 / D49 1025053
              </h6>{" "}
            </div>
            <div className="col-md-4 col-sm-4 text-center">
              {" "}
              <h3>
                {" "}
                <strong>Proposal</strong>
              </h3>
            </div>
            <div className="col-md-4 col-sm-4 text-center table-cell-align">
              <img
                className="preview-Logo"
                style={{ width: "160px" }}
                src={logo}
                alt=""
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6">
              <h5 className="p-0 pt-4 mb-0 ">
                <strong>Submitted to</strong>
              </h5>
              <h6 className="p-0 " style={{ maxWidth: " 18em" }}>
                {previewData.EstimateData.ContactName}
                <br />
                {previewData.EstimateData.ContactAddress?.split(", ")
                  .slice(0, 2)
                  .join(", ")}
                <br />
                {previewData.EstimateData.ContactAddress?.split(", ")
                  .slice(2)
                  .join(", ")}
                <br />
                {/* {previewData.EstimateData.ContactEmail} <br />
                        {previewData.EstimateData.ContactPhone}*/}
              </h6>
            </div>

            <div className="col-md-2 col-sm-2"></div>
            <div className="col-md-4 col-sm-4">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>
                      {" "}
                      <h6 className="mb-0">
                        {" "}
                        <strong>Date</strong>
                      </h6>{" "}
                    </th>
                    <th>
                      {" "}
                      <h6 className="text-right mb-0">
                        {formatDate(previewData.EstimateData.IssueDate, false)}
                      </h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-cell-align mb-0 me-2">
                      <h6 className="mb-0">
                        <strong>Estimate #</strong>
                      </h6>{" "}
                    </td>

                    <td className="table-cell-align mb-0 text-right">
                      <h6 className="mb-0">
                        {previewData.EstimateData.EstimateNumber}
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell-align me-2">
                      <h6 className="mb-0">
                        <strong>Submitted by</strong>
                      </h6>{" "}
                    </td>

                    <td className="table-cell-align text-right">
                      <h6 className="mb-0">
                        {" "}
                        {previewData.EstimateData.AssignToName}
                      </h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12 col-sm-12 text-center">
              {" "}
              <h3 className="mb-0">
                <strong>South Peak</strong>
              </h3>{" "}
              <hr className="mt-0" />
            </div>
            <div className="col-md-12 col-sm-12">
              {" "}
              <h4 className="mb-0">
                <strong>Description of work</strong>
              </h4>
              <h6 className="mb-0">
                {" "}
                {previewData.EstimateData.EstimateNotes}
              </h6>
            </div>
          </div>
          <h5 className="mb-0 mt-3">
            <strong>Item(s)</strong>
          </h5>
          <table id="empoloyees-tblwrapper" className="table mt-2">
            <thead className="">
              <tr className="preview-table-head preview-table-header">
                <th className="text-start">
                  <strong>QTY</strong>
                </th>{" "}
                <th>
                  <strong>DESCRIPTION</strong>
                </th>
                {/* <th className="text-right">
                          <strong>RATE</strong>
                        </th> */}
                <th className="text-right">
                  <strong>AMOUNT</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {previewData.EstimateItemData.map((item, index) => {
                return (
                  <tr className="preview-table-row" key={index}>
                    <td className="text-start">{item.Qty}</td>
                    <td>{item.Description}</td>
                    {/* <td className="text-right">{item.Rate}</td> */}
                    <td className="text-right">{item.Amount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {previewData.EstimateItemData.length > 5 ? (
          <div style={{ marginTop: "20em" }}></div>
        ) : (
          <></>
        )}

        <div style={{ bottom: 0 }} className="card-footer border-0">
          {" "}
          <div className="row text-end px-5">
            <div className="col-md-9 col-sm-8"></div>
            <div
              style={{ whiteSpace: "nowrap" }}
              className="col-md-3 col-sm-4 text-end"
            >
              <div
                style={{
                  borderBottom: "1px solid #b7b4b4",

                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "black",
                    marginRight: "4em",
                  }}
                >
                  <strong>Total:</strong>
                </span>
                <span style={{ fontSize: "16px", color: "black" }}>
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>
          </div>
          <div
            className="row mt-5"
            style={{
              borderTop: "1px solid #b7b4b4",
            }}
          >
            <div className="col-md-3 col-sm-3">
              <h6>ACCEPTED BY:</h6>
            </div>
            <div className="col-md-3 col-sm-3">
              <h6>Buyer/Agent Signature</h6>
            </div>
            <div className="col-md-2 col-sm-2">
              <h6>Print Name</h6>
            </div>
            <div className="col-md-2 col-sm-2">
              <h6>Title</h6>
            </div>
            <div className="col-md-2 col-sm-2">
              <h6>Date</h6>
            </div>
            <div className="col-md-12 col-sm-12">
              <span
                style={{
                  fontSize: "7px",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Payment Terms and Conditions: Please be advised that payments
                are due upon receipt of the invoice, with any payment made
                beyond thirty ﴾30﴿ days from the billing date considered overdue
                and subject to interest at the maximum legally permissible rate.
                In the event of legal action for collection, Earthco is entitled
                to reimbursement of all legal fees. Failure to make payment
                within a thirty ﴾30﴿‐day period will be deemed a major breach.
                This proposal assumes no preexisting conditions detrimental to
                labor and materials during installation, replacement, and
                repair, specifically for work conducted by Earthco Commercial
                Landscape or Earthco Arbor Care, with a 30‐day lead time for
                tree work. Earthco Arbor Care disclaims responsibility for
                damage to underground utilities, and work will adhere to ANSI
                A300 Arbor Standards. Requests for crown thinning exceeding 25%
                may incur additional costs and release Earthco Arbor Care from
                liability. The proposal excludes permits, traffic control, or
                engineering, with the client responsible for associated costs.
                Cancellation of work incurs a 20% fee, and tree work inspections
                must be conducted within 30 days of completion; otherwise, the
                work is deemed final. The client acknowledges the potential
                placement of a mechanics lien on the property as per the
                California Civil Code for non‐payment within the specified
                terms. The signing party affirms authorization to obligate the
                client to these terms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstimatePreview;
