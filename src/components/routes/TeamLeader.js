import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "../production_card/Home";
import HomeOt from "../overTime/HomeOt";


const TeamLeader = (p) => {
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/cp" />} />
        <Route exact path="/cp" element={<Home />} />
        <Route exact path="/dhc" element={<HomeOt />} />
        <Route path="*" element={<Navigate replace to="/cp" />} />
      </Routes>
    </Suspense>
  );
};
export default TeamLeader;
