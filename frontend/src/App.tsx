import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { MyLearningPage } from "./pages/MyLearningPage";
import { ProgressPage } from "./pages/ProgressPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/learning" element={<MyLearningPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;