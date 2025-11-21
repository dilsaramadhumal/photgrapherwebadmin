import { MdOutlineDashboard } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";
// import path from "path";

export const adminMenuItems = [
  {
    title: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/dashboard",
    bgColor: "bg-purple-800",
  },
  {
    title: "Photographers",
    icon: FaCamera,
    bgColor: "bg-blue-800",
    path: "/photographers",
  },
  {
    title: "Reviews",
    icon: MdStarRate,
    bgColor: "bg-green-800",
    path: "/reviews",
  },
  {
    title: "Photo Gallery",
    icon: MdPhotoLibrary,
    bgColor: "bg-orange-800",
    path: "/photo-gallery"
  }
];

export const iconBgColors = {
  Dashboard: "bg-purple-600",
  Photographers: "bg-blue-600",
  Reviews: "bg-green-600",
  "Photo Gallery": "bg-red-600",
};
