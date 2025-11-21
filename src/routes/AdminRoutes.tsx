import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ButtonShowcasePage from "@/pages/TestingPage/ButtonShowcase";
import InputShowcasePage from "@/pages/TestingPage/InputShowcase";
import AvatarAndToasts from "@/pages/TestingPage/AvatarAndToasts";
import TableShowcasePage from "@/pages/TestingPage/TableShowCase";
import StepperShowcasePage from "@/pages/TestingPage/StepperShowcase";
import ChipShowcase from "@/pages/TestingPage/ChipShowcase";
import LoadingSection from "@/section/LoadingSection/LoadingSection";
import Layout from "@/components/Layout/Layout";
import { AuthLayout } from "@/components/Layout/AuthLayout";

const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const Photographers = lazy(() => import("@/pages/Photographers/Photographers"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Reviews = lazy(() => import("@/pages/Reviews/Reviews"));
const PhotoGallery = lazy(() => import("@/pages/PhotoGallery/PhotoGallery"));

export const AdminRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSection />
        </div>
      }
    >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/photographers" element={<Photographers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
        </Route>

        <Route element={<Layout />}>
          <Route
            path="/testing/buttonShowcase"
            element={<ButtonShowcasePage />}
          />
          <Route
            path="/testing/inputShowcase"
            element={<InputShowcasePage />}
          />
          <Route path="/testing/avatars&toasts" element={<AvatarAndToasts />} />
          <Route path="/testing/tables" element={<TableShowcasePage />} />
          <Route path="/testing/stepper" element={<StepperShowcasePage />} />
          <Route path="/testing/chips" element={<ChipShowcase />} />
        </Route>
        {/* Add more routes as needed */}

        {/* Add more routes as needed */}
      </Routes>
    </Suspense>
  );
};
