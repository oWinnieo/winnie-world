// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import ReactGA from "react-ga4";



// export function GoogleAnalytics({}) {
//     const GA_TRACKING_ID = "G-9QTB7YVB49"; // 替换为你的 GA4 ID
//   const pathname = usePathname();

//   useEffect(() => {
//     ReactGA.initialize(GA_TRACKING_ID);
//   }, []);

//   useEffect(() => {
//     if (pathname) {
//       ReactGA.send({ hitType: "pageview", page: pathname });
//     }
//   }, [pathname]);

//   return null;
// }


"use client";
import { useEffect } from "react";
// import ReactGA from "react-ga4";
import { usePathname } from "next/navigation";

export const AnalyticsProvider = ({ gaMeasureId, children }) => {
  const pathname = usePathname();

  // useEffect(() => {
  //   ReactGA.initialize(gaMeasureId);
  //   ReactGA.send("pageview"); // 初始页面加载时发送 pageview
  // }, []);

  // useEffect(() => {
  //   if (pathname) {
  //     ReactGA.send({ hitType: "pageview", page: pathname });
  //   }
  // }, [pathname]);

  return <>{children}</>;
}