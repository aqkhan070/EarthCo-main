import React, { useState } from 'react'

const AdressModal = ({ boolState, handleAdress, adress, setAdress, topClass }) => {

    // const [adress, setadress] = useState(adress)

    const handleSubmit = (e) => {
        e.preventDefault();
        boolState(true);
    }


    const handleChange = (event) => {
        const value = event.target.value
        setAdress({
            ...adress,
            [event.target.name]: value
        })
    }

    const adressLine = adress.adressLine || '';
    const roomNo = (adress.room && (' / ' + adress.room)) || '';
    const city = (adress.city && (' / ' + adress.city)) || '';
    const adState = (adress.state && (' / ' + adress.state)) || '';
    const postCode = (adress.postalCode && (' / ' + adress.postalCode)) || '';
    const country = (adress.country && (' / ' + adress.country)) || '';

    handleAdress(adressLine + roomNo + city + adState + postCode + country)

    return (
        <div className={"adressmodal " + topClass}>
            <div className="card" style={{ marginBottom: '0px' }}>
                <div className="card-header" style={{ background: '#f8f4f4' }}>
                    <h4 className="card-title">Adress</h4>
                </div>
                <div className="card-body">
                    <div className="basic-form">
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-12 mb-2">
                                <input type="text" id='adressInput1' onChange={handleChange} value={adress.adressLine} name='adressLine' className="form-control input-default " placeholder="Adress Line 1" />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input type="text" id='adressInput2' onChange={handleChange} value={adress.room} name='room' className="form-control input-default " placeholder="Room / Suite / Apt #" />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input type="text" id='adressInput3' onChange={handleChange} value={adress.city} name='city' className="form-control input-default " placeholder="City" />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input type="text" id='adressInput4' onChange={handleChange} value={adress.state} name='state' className="form-control input-default " placeholder="State" />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input type="text" id='adressInput5' onChange={handleChange} value={adress.postalCode} name='postalCode' className="form-control input-default " placeholder="Postal Code" />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input type="text" id='adressInput6' onChange={handleChange} value={adress.country} name='country' className="form-control input-default " placeholder="Country" />
                            </div>
                            <div className="col-md-12 mt-3 text-end">
                                <button type='button' onClick={handleSubmit} className="btn btn-primary">Done</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdressModal
