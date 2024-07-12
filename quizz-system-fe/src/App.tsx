import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@main/components/layouts/MainLayout";
import { AuthenticationLayout } from "@main/components/layouts/AuthenticationLayout";
const QuizzManagement = lazy(() => import("./pages/Quizz/QuizzManagement"));
const ExamManagement = lazy(() => import("./pages/Exam/ExamManagement"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Home = lazy(() => import("@main/pages/Home"));
const NotFound = lazy(() => import("@main/pages/NotFound"));
const KeywordsManagement = lazy(() => import("@main/pages/Keywords/KeywordManagement"))

function App() {
  return (
    <Suspense>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="keywords" element={<KeywordsManagement />} />
          <Route path="quizz" element={<QuizzManagement />} />
          <Route path="exam/:competitionId" element={<ExamManagement />} />
        </Route>
        <Route path="/authentication" element={<AuthenticationLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
