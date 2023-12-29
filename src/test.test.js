import Contacts from "../CommonComponents/Contacts";
import ServiceLocations from "../CommonComponents/ServiceLocations";

<>
<div className="row">
<div className="col-md-auto">
  <label className="form-label">
    Contacts<span className="text-danger">*</span>
  </label>
</div>
<div className="col-md-3">
  {" "}
  {formData.CustomerId ? (
    <Contacts
      fetctContacts={fetctContacts}
      fetchCustomers={fetchCustomers}
      customerId={formData.CustomerId}
    />
  ) : (
    <></>
  )}
</div>
</div>

<div className="row">
<div className="col-md-auto">
  <label className="form-label">
    Service Locations
    <span className="text-danger">*</span>{" "}
  </label>
</div>
<div className="col-md-3">
  {" "}
  {formData.CustomerId ? (
    <ServiceLocations
      fetchServiceLocations={fetchServiceLocations}
      fetchCustomers={fetchCustomers}
      customerId={formData.CustomerId}
    />
  ) : (
    <></>
  )}
</div>
</div>
</>