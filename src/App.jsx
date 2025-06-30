// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/routes/ProtectedRoute';

// Layouts
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import PricingPage from './pages/public/PricingPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Student Pages
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import MyCoursesPage from './pages/student/MyCoursesPage';
import MySubscriptionPage from './pages/student/MySubscriptionPage';

// Instructor Pages
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage';
import ManageCoursesPage from './pages/instructor/ManageCoursesPage';
import CourseFormPage from './pages/instructor/CourseFormPage';
import InstructorCourseEnrollmentsPage from './pages/instructor/InstructorCourseEnrollmentsPage'; // Naya Page import kiya

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import AdminManageCoursesPage from './pages/admin/AdminManageCoursesPage';

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="pricing" element={<PricingPage />} />
      </Route>

      {/* --- Student Routes --- */}
      <Route path="/student" element={<ProtectedRoute allowedRoles={['Student']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="my-subscription" element={<MySubscriptionPage />} />
      </Route>
      
      {/* --- Instructor Routes --- */}
      <Route path="/instructor" element={<ProtectedRoute allowedRoles={['Instructor']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<InstructorDashboardPage />} />
          <Route path="courses" element={<ManageCoursesPage />} />
          <Route path="courses/new" element={<CourseFormPage />} />
          <Route path="courses/edit/:id" element={<CourseFormPage />} />
          <Route path="courses/:id/enrollments" element={<InstructorCourseEnrollmentsPage />} /> {/* Naya route add kiya */}
      </Route>
      
      {/* --- Admin Routes --- */}\
       <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><DashboardLayout /></ProtectedRoute>}>\
          <Route path="dashboard" element={<AdminDashboardPage />} />\
          <Route path="users" element={<ManageUsersPage />} />\
          <Route path="courses" element={<AdminManageCoursesPage />} />\
      </Route>

      {/* --- Not Found Route --- */}
      <Route path="*" element={<RootLayout><NotFoundPage /></RootLayout>} />
    </Routes>
  );
}

export default App;
