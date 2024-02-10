"use client";

import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {};

const CurrentTime = (props: Props) => {
  const [currentTime, setCurrentTime] = useState<string>(
    formatDate(new Date(), "time")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatDate(new Date(), "time"));
    }, 1000);
    return () => clearInterval(interval);
  });
  return <div>{currentTime}</div>;
};

export default CurrentTime;
