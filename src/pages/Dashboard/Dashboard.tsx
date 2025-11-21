"use client";

import AdminShowPhotographersSection from "@/section/AdminShowPhotographersSection/AdminShowPhotographersSection";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-6 bg-blue_light_10">
        <h1 className="items-center text-4xl font-bold text-blue_dark">
          Main Dashboard 😉
        </h1>
        <p>This is the main dashboard of the app.</p>
        <AdminShowPhotographersSection/>
      </div>
    </>
  );
};

export default Dashboard;