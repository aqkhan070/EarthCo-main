import React, { useEffect, useRef } from 'react';
import { LoadScript } from '@react-google-maps/api';

const AdressModal = ({ boolState, handleAdress, adress, setAdress, topClass }) => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (place.address_components) {
          const addressObject = {
            adressLine: '',
            room: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
          };

          place.address_components.forEach(component => {
            switch (component.types[0]) {
              case 'street_number':
                addressObject.adressLine += component.long_name;
                break;
              case 'route':
                addressObject.adressLine += ' ' + component.long_name;
                break;
              case 'locality':
                addressObject.city = component.long_name;
                break;
              case 'administrative_area_level_1':
                addressObject.state = component.short_name;
                break;
              case 'postal_code':
                addressObject.postalCode = component.long_name;
                break;
              case 'country':
                addressObject.country = component.long_name;
                break;
              default:
                break;
            }
          });

          setAdress(addressObject);
        }
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    boolState(true);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setAdress({
      ...adress,
      [event.target.name]: value,
    });
  };

  const adressLine = adress.adressLine || '';
  const roomNo = (adress.room && (', ' + adress.room)) || '';
  const city = (adress.city && (', ' + adress.city)) || '';
  const adState = (adress.state && (',' + adress.state)) || '';
  const postCode = (adress.postalCode && (', ' + adress.postalCode)) || '';
  const country = (adress.country && (',' + adress.country)) || '';

  handleAdress(adressLine + roomNo + city + adState + postCode + country);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw" libraries={['places']}>
      <div className={"adressmodal " + topClass}>
        { /* ...rest of the component */ }
        <input
          ref={autocompleteRef}
          type="text"
          id='adressInput1'
          onChange={handleChange}
          value={adress.adressLine}
          name='adressLine'
          className="form-control input-default "
          placeholder="Adress Line 1"
        />
        { /* ...rest of the component */ }
      </div>
    </LoadScript>
  );
};

export default AdressModal;
