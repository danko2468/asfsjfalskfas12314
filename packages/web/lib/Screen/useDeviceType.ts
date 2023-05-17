"use client";

import { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

import { DeviceType } from "./constants";
import { getDeviceType } from "./getDeviceType";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState(DeviceType.Mobile);

  useEffect(() => {
    setDeviceType(getDeviceType());
    const sub = fromEvent(window, "resize")
      .pipe(
        debounceTime(100),
        map(() => getDeviceType())
      )
      .subscribe((val) => {
        setDeviceType(val);
      });

    return () => sub.unsubscribe();
  }, []);

  return deviceType;
}
