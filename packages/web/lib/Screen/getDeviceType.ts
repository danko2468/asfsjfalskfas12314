import { DeviceType } from "./constants";

export function getDeviceType() {
  if (!globalThis.matchMedia) return DeviceType.Mobile;
  if (globalThis.matchMedia("(min-width: 1200px)").matches) return DeviceType.Desktop;
  if (globalThis.matchMedia("(min-width: 768px)").matches) return DeviceType.Tablet;
  return DeviceType.Mobile;
}
