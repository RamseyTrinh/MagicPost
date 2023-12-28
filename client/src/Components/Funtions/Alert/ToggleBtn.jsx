import React, { useEffect } from "react";

export default function ToggleBtn() {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount("Timeout called!");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
}
