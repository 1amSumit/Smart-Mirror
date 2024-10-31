import { useState } from "react";

export const useCurrentLocation = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useState(() => {
    const getCurrentPosi = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    };

    getCurrentPosi();
  }, []);

  return { latitude, longitude };
};
