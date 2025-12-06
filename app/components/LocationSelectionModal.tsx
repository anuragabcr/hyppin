import React, { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineMapPin } from "react-icons/hi2";
import { useUI } from "../context/UIContext";

interface LocationSelectionModalProps {
  onLocationSelect: (location: string) => void;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
type LocationCache = {
  lat: number;
  lng: number;
  locationString: string;
};

const LocationSelectionModal: React.FC<LocationSelectionModalProps> = ({
  onLocationSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLocationModalOpen, setIsLocationModalOpen } = useUI();

  if (!isLocationModalOpen) return null;

  const geocodeCoordinates = async (lat: number, lng: number) => {
    const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
    const cachedData = localStorage.getItem("location_cache");

    if (cachedData) {
      const cache: LocationCache = JSON.parse(cachedData);
      const cachedKey = `${cache.lat.toFixed(4)},${cache.lng.toFixed(4)}`;

      if (cacheKey === cachedKey) {
        console.log("Location fetched from cache!");
        return cache.locationString;
      }
    }

    if (!API_KEY) {
      console.error("API Key is missing. Check .env.local.");
      return "API Key configuration error.";
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const formattedAddress = data.results[0].formatted_address;
        let pincode = "";
        let district = "";
        let state = "";
        let localityFound = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addressComponents.forEach((component: any) => {
          if (component.types.includes("postal_code")) {
            pincode = component.long_name;
          }
          if (!localityFound && component.types.includes("locality")) {
            district = component.long_name;
            localityFound = true;
          }
          if (
            !localityFound &&
            component.types.includes("administrative_area_level_2")
          ) {
            district = component.long_name;
          }

          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
        });

        const readableLocation = `${district}, ${state} ${pincode} `;

        const newCache: LocationCache = {
          lat: lat,
          lng: lng,
          locationString: readableLocation,
        };
        localStorage.setItem("location_cache", JSON.stringify(newCache));
        localStorage.setItem("last_location", readableLocation);
        localStorage.setItem("last_complete_location", formattedAddress);

        return readableLocation;
      } else {
        return "Location details not found.";
      }
    } catch (error) {
      console.error("Geocoding API error:", error);
      return "Error fetching location details.";
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationDetails = await geocodeCoordinates(latitude, longitude);

          onLocationSelect(locationDetails);
          console.log("Current Location:", locationDetails);
        },
        (error) => {
          alert(
            `Error getting location: ${error.message}. Please enter manually.`,
          );
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearchLocation = () => {
    if (searchTerm.trim()) {
      onLocationSelect(searchTerm.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setIsLocationModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl transition-all duration-300 ease-out transform translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          📍 Select Collection/Delivery Location
        </h2>

        <button
          onClick={handleUseCurrentLocation}
          className="flex items-center justify-center w-full p-4 mb-4 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out shadow-md cursor-pointer"
        >
          <HiOutlineMapPin className="w-5 h-5 mr-3" />
          Use My Current Location
        </button>

        <div className="flex items-center justify-center my-4">
          <hr className="w-full border-t border-gray-300" />
          <span className="px-3 text-sm font-medium text-gray-500 bg-white">
            OR
          </span>
          <hr className="w-full border-t border-gray-300" />
        </div>

        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter location or ZIP code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSearchLocation}
            disabled={!searchTerm.trim()}
            className="absolute right-0 top-0 h-full px-4 text-white font-semibold bg-red-600 rounded-r-lg hover:bg-red-700 disabled:bg-red-300 transition duration-150 ease-in-out"
          >
            Find
          </button>
        </div>

        <button
          onClick={() => setIsLocationModalOpen(false)}
          className="absolute p-1 text-gray-400 transition duration-150 ease-in-out rounded-full top-2 right-2 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LocationSelectionModal;
