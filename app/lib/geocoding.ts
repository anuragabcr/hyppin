const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const fetchAddressFromCoords = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    const components = data.results[0].address_components;
    const result = {
      address: data.results[0].formatted_address,
      city: "",
      pincode: "",
      state: "",
      locality: "",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components.forEach((c: any) => {
      if (c.types.includes("postal_code")) result.pincode = c.long_name;
      if (c.types.includes("locality")) result.city = c.long_name;
      if (c.types.includes("administrative_area_level_1"))
        result.state = c.long_name;
      if (
        c.types.includes("sublocality_level_1") ||
        c.types.includes("neighborhood")
      ) {
        result.locality = c.long_name;
      }
    });
    return result;
  }
  throw new Error("Location not found");
};
