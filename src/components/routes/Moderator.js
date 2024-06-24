import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import AbsTloOutput from "../moderator/AbsTloOutput";
import MutHistory from "../mutationHistory/MutHistory";

const Moderator = (p) => {
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<h1>homes</h1>} />
        <Route exact path="/abstloo" element={<AbsTloOutput />} />
        <Route exact path="/mh" element={<MutHistory type="admin" />} />
        <Route exact path="/pcv" element={<MutHistory type="admin" />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Suspense>
  );
};
export default Moderator;
