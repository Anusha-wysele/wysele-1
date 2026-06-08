import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/Admin/ProtectedRoute";
import { ToastProvider } from "./components/Admin/ToastContext";
import ScrollProgressBar from "./components/common/ScrollProgressBar";
import SEOManager from "./components/common/SEOManager";
import LeftSidebar from "./components/layout/navbar/LeftSidebar";
import Navbar from "./components/layout/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

// Lazy load pages for better performance
const ConsultationPopup = lazy(() => import("./components/common/ConsultationPopup"));
const LandingPages = lazy(() => import("./components/layout/section/LandingPages"));
const AboutPage = lazy(() => import("./pages/AboutUs/AboutPage"));
const SapConsulting = lazy(() => import("./pages/OurServices/SapConsulting/SapHero"));
const SapSignavio = lazy(() => import("./pages/OurServices/SapSignavio/SapSignavioPage"));
const SapDatasphere = lazy(() => import("./pages/OurServices/SapDatasphere/SapDataspherePage"));
const RiseWithSap = lazy(() => import("./pages/OurServices/RiseWithsap/RiseWithSapPage"));
const SapServices = lazy(() => import("./pages/SapServices/SapServiceshero"));
const SapBtp = lazy(() => import("./pages/OurServices/BtpServices/SapBtp"));
const SapIntegration = lazy(() => import("./pages/OurServices/SapIntegration/SapIntegrationPage"));
const IndustriesPage = lazy(() => import("./pages/Industries/IndustriesPage"));
const ContactPage = lazy(() => import("./pages/ContactUs/ContactPage"));
const SapVimPage = lazy(() => import("./pages/OurServices/SapVimbrim/SapVimPage"));
const SapMigrationPage = lazy(() => import("./pages/OurServices/MigrationServices/SapMigrationPage"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment/WebDevelopmentpages"));
const AppDevelopment = lazy(() => import("./pages/AppDeveiopment/AppDevelopmentpsges"));
const IotPage = lazy(() => import("./pages/Iotservice/IotPage"));
const Aimlpage = lazy(() => import("./pages/AiMlservices/Aimlpage"));
const SapS4hanaPage = lazy(() => import("./pages/OurServices/SapS4hana/SapS4pages"));
const SapGenaiPage = lazy(() => import("./pages/OurServices/SapGenai/SapGenaipages"));
const SapMasterPage = lazy(() => import("./pages/OurServices/SapMasterdata/SapMasterPage"));
const SapBtpApiPage = lazy(() => import("./pages/OurServices/SapBtpapimanagement/Sapbtpapipage"));
const SapTechnicalConsultingPage = lazy(() => import("./pages/OurServices/SapTechnicalconsulting/SapTechnicalconsultingpage"));
const SapOpentextPage = lazy(() => import("./pages/OurServices/SapOpentext/SapOpentextpage"));
const FdePage = lazy(() => import("./pages/Fde/fdePage"));

const Salesforce = lazy(() => import("./pages/SalesforceServices/Salesforcepages"));
const Cybersecurityhome = lazy(() => import("./pages/Cybersecurity/Cybersecurityhome"));
const Itinfrastructurepages = lazy(() => import("./pages/ITinfrastructure/ItInfrastrutureHome"));
const CareersHome = lazy(() => import("./pages/Careers/CareersHome"));
const JobApplicationPage = lazy(() => import("./pages/Careers/JobApplicationPage"));
const BlogsPage = lazy(() => import("./pages/Blogs/BlogsPage"));
const BlogDetailPage = lazy(() => import("./pages/Blogs/BlogDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));
const SitemapPage = lazy(() => import("./pages/Sitemap/SitemapPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy/CookiePolicy"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminJobPosting = lazy(() => import("./pages/Admin/JobPosting"));
const AdminManageJobs = lazy(() => import("./pages/Admin/ManageJobs"));
const AdminJobApplications = lazy(() => import("./pages/Admin/JobApplications"));
const AdminAllApplications = lazy(() => import("./pages/Admin/AllApplications"));
const AdminEmployees = lazy(() => import("./pages/Admin/Employees"));
const AdminConsultations = lazy(() => import("./pages/Admin/Consultations"));
const AdminManageBlogs = lazy(() => import("./pages/Admin/ManageBlogs"));
const AdminContacts = lazy(() => import("./pages/Admin/Users"));

const AdminRoutes = () => (
  <ToastProvider>
    <Routes>
      <Route path="/" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/job-postings" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminManageJobs /></ProtectedRoute>} />
      <Route path="/manage-jobs" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminManageJobs /></ProtectedRoute>} />
      <Route path="/jobs/:id/applications" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminJobApplications /></ProtectedRoute>} />
      <Route path="/job-posting/create" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminJobPosting /></ProtectedRoute>} />
      <Route path="/job-posting" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminJobPosting /></ProtectedRoute>} />
      <Route path="/applicants" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR', 'ADMIN']}><AdminAllApplications /></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']}><AdminEmployees /></ProtectedRoute>} />
      <Route path="/consultations" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR']}><AdminConsultations /></ProtectedRoute>} />
      <Route path="/contacts" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR']}><AdminContacts /></ProtectedRoute>} />
      <Route path="/blogs" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}><AdminManageBlogs /></ProtectedRoute>} />
    </Routes>
  </ToastProvider>
);

export default function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <SEOManager />
      <div className="relative min-h-screen" style={{ background: "#000" }}>
        {!isAdminPath && <Navbar />}
        {!isAdminPath && <LeftSidebar />}
        <Suspense fallback={null}>
          {!isAdminPath && <ConsultationPopup />}
        </Suspense>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPages />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/services/fde" element={<FdePage />} />
            <Route path="/services/sap-consulting" element={<SapConsulting />} />
            <Route path="/services/sap-signavio" element={<SapSignavio />} />
            <Route path="/services/sap-datasphere" element={<SapDatasphere />} />
            <Route path="/services/rise-with-sap" element={<RiseWithSap />} />
            <Route path="/services/sap-btp" element={<SapBtp />} />
            <Route path="/services/sap-integration" element={<SapIntegration />} />
            <Route path="/services/sap-vim-brim" element={<SapVimPage />} />
            <Route path="/services/sap-migration" element={<SapMigrationPage />} />
            <Route path="/services/salesforce" element={<Salesforce />} />
            <Route path="/services/cybersecurityhome" element={<Cybersecurityhome />} />
            <Route path="/services/itinfrastructure" element={<Itinfrastructurepages />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/app-development" element={<AppDevelopment />} />
            <Route path="/services/iot-services" element={<IotPage />} />
            <Route path="/services/aiml-services" element={<Aimlpage />} />
            <Route path="/services/sap-s4hana" element={<SapS4hanaPage />} />
            <Route path="/services/sap-genai" element={<SapGenaiPage />} />
            <Route path="/services/sap-masterdata" element={<SapMasterPage />} />
            <Route path="/services/sap-btp-api-management" element={<SapBtpApiPage />} />
            <Route path="/services/sap-technical-consulting" element={<SapTechnicalConsultingPage />} />
            <Route path="/services/sap-opentext" element={<SapOpentextPage />} />
            <Route path="/sap-services" element={<SapServices />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersHome />} />
            <Route path="/careers/apply/:id" element={<JobApplicationPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminRoutes />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        {!isAdminPath && <ScrollProgressBar />}
      </div>
    </AuthProvider>
  );
}