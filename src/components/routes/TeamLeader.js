import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "../production_card/Home";

const TeamLeader = (p) => {
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/cp" />} />
        <Route exact path="/cp" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/cp" />} />
      </Routes>
    </Suspense>
  );
};
export default TeamLeader;
