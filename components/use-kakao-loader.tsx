import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
    libraries: ["clusterer", "drawing", "services"],
  });
}
