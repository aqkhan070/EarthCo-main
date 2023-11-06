

<Form.Select
                        size="lg"
                        name="UserId"
                        onChange={handleInputChange}
                        value={SRData.ServiceRequestData.UserId || ""}
                        aria-label="Default select example"
                        id="inputState"
                        className="bg-white"
                      >
                        <option value="">Customer</option>{" "}
                        {customers.map((customer) => (
                          <option
                            key={customer.UserId}
                            value={customer.UserId}
                          >
                            {customer.CompanyName}
                          </option>
                        ))}
                      </Form.Select>