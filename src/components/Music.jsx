import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSongs } from "../services/spotifyMusic";

export default function Spotify() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["spotify"],
  //   queryFn: getSongs,
  //   staleTime: 1000 * 60 * 5,
  //   refetchInterval: 1000 * 60 * 15,
  // });
  return (
    <div className="px-[2rem]">
      <h2 className="font-quick text-2xl text-gray-500">Music</h2>
    </div>
  );
}
