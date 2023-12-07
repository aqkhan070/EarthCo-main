const request = {
  placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  fields: [
    "name",
    "formatted_address",
    "place_id",
    "geometry",
    "photos"
  ]
};

const service = new google.maps.places.PlacesService(map);
service.getDetails(request, (place, status) => {
  if (
    status === google.maps.places.PlacesServiceStatus.OK &&
    place &&
    place.geometry &&
    place.geometry.location
  ) {
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location
    });
  }
  this.setState({
    photos: place.photos[0].getUrl(),
    name: place.formatted_address
  });
});