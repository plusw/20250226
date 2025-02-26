"use client";

import { useEffect, useState } from "react";
import FooterArea from "./compotents/footer/FooterArea";
import Navbar from "./compotents/header/Navbar";
import MainArea from "./compotents/main/MainArea";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // 确保只在客户端渲染时触发
  }, []);
  return (
    <>
      {isClient && (
        <>
          {/* <Test /> */}
          <Navbar />
          <MainArea />
          <FooterArea />
        </>
      )}
    </>
  );
}
