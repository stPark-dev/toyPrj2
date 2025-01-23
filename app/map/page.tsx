"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import { Button } from "@/components/ui/button";
import useKakaoLoader from "@/components/use-kakao-loader";
import { createClient } from "@/utils/supabase/client";

type NightView = {
  num: number;
  title: string;
  addr: string;
  la: number;
  lo: number;
  operating_time: string;
  contents: string;
};

export default function BasicMap() {
  useKakaoLoader();
  const [nightViews, setNightViews] = useState<NightView[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [level, setLevel] = useState(8);
  const supabase = createClient();

  const MIN_LEVEL = 3;
  const MAX_LEVEL = 12;

  useEffect(() => {
    async function fetchNightViews() {
      const { data, error } = await supabase
        .from("seoul_night_view")
        .select("num, title, addr, la, lo, operating_time, contents")
        .returns<NightView[]>();

      if (error) {
        console.error("Error fetching night views:", error);
        return;
      }

      setNightViews(data);
    }

    fetchNightViews();
  }, []);

  return (
    <div className="relative">
      <Map
        id="map"
        center={{
          // 서울 시청 좌표
          lat: 37.5665,
          lng: 126.978,
        }}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        level={level}
      >
        {nightViews.map((view) => (
          <div key={view.num}>
            <MapMarker
              position={{ lat: view.la, lng: view.lo }}
              onMouseOver={() => setSelectedMarker(view.num)}
              onMouseOut={() => setSelectedMarker(null)}
              zIndex={1}
            />
            {selectedMarker === view.num && (
              <CustomOverlayMap
                position={{ lat: view.la, lng: view.lo }}
                yAnchor={1.5}
                zIndex={999}
              >
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm relative overflow-auto z-[1000]">
                  <h3 className="font-bold text-lg mb-2 text-black">{view.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{view.addr}</p>
                  <p className="text-sm text-gray-600 mb-2">운영시간: {view.operating_time}</p>
                  <div
                    className="text-sm text-gray-700 max-h-24 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: view.contents }}
                  />
                </div>
              </CustomOverlayMap>
            )}
          </div>
        ))}
      </Map>
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setLevel((prev) => Math.max(MIN_LEVEL, prev - 1))}
          disabled={level <= MIN_LEVEL}
          className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <Plus className="h-4 w-4 text-gray-700" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setLevel((prev) => Math.min(MAX_LEVEL, prev + 1))}
          disabled={level >= MAX_LEVEL}
          className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <Minus className="h-4 w-4 text-gray-700" />
        </Button>
      </div>
    </div>
  );
}
