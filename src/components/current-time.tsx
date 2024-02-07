"use client";

import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {};

const CurrentTime = (props: Props) => {
  const [currentTime, setCurrentTime] = useState<string>(
    formatDate(new Date())
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        formatDate(new Date(), "time") + " " + formatDate(new Date(), "date")
      );
    }, 1000);
    return () => clearInterval(interval);
  });
  return <div>{currentTime}</div>;
};

export default CurrentTime;
