import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import SmartNavigation from "@/components/SmartNavigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import MarketplaceHome from "./pages/MarketplaceHome";
import Marketplace from "./pages/Marketplace";
import GigDetail from "./pages/GigDetail";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Checkout from "./pages/Checkout";
import BecomeSeller from "./pages/BecomeSeller";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Consultants from "./pages/Consultants";
import ConsultantProfile from "./pages/ConsultantProfile";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import SmartDashboard from "./components/SmartDashboard";
import ConsultantRegister from "./pages/ConsultantRegister";
import BecomeConsultant from "./pages/BecomeConsultant";
import BecomeConsultantForm from "./pages/BecomeConsultantForm";
import ConsultantApplicationSubmitted from "./pages/ConsultantApplicationSubmitted";
import FooterShowcase from "./pages/FooterShowcase";
import DesignSystemShowcase from "./components/DesignSystemShowcase";
import NotFound from "./pages/NotFound";
import PaymentCheckout from "./pages/payments/Checkout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminTransactions from "./pages/admin/Transactions";
import AdminVerification from "./pages/admin/Verification";
import AdminContent from "./pages/admin/Content";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AdminSupport from "./pages/admin/Support";
import ConsultantLanding from "./pages/ConsultantLanding";
import CompanyLanding from "./pages/CompanyLanding";
import SignupSelection from "./pages/signup/SignupSelection";
import SignupCredentials from "./pages/signup/SignupCredentials";
import CompanySearch from "./pages/signup/CompanySearch";
import UserProfileSetup from "./pages/signup/UserProfileSetup";
import ConsultantProfileSetup from "./pages/signup/ConsultantProfileSetup";
import CompanyRegister from "./pages/signup/CompanyRegister";
import RegisterCompany from "./pages/signup/RegisterCompany";
import ApplicationSubmitted from "./pages/signup/ApplicationSubmitted";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SmartNavigation />
          <Routes>
            <Route path="/" element={<MarketplaceHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/gig/:id" element={<GigDetail />} />
            <Route 
              path="/checkout/:id" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<SignupSelection />} />
            <Route path="/signup/credentials" element={<SignupCredentials />} />
            <Route path="/signup/company-search" element={<CompanySearch />} />
            <Route path="/signup/company-register" element={<CompanyRegister />} />
            <Route path="/register-company" element={<RegisterCompany />} />
            <Route path="/signup/application-submitted" element={<ApplicationSubmitted />} />
            <Route path="/user-profile-setup" element={<UserProfileSetup />} />
            <Route path="/consultant-profile-setup" element={<ConsultantProfileSetup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pay/checkout" element={<PaymentCheckout />} />
            
            {/* Role-Specific Landing Pages */}
            <Route 
              path="/consultant-home" 
              element={
                <ProtectedRoute allowedRoles={['consultant']}>
                  <ConsultantLanding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company-home" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <CompanyLanding />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Routes - Require Authentication */}
            <Route 
              path="/consultants" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Consultants />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consultant/:id" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ConsultantProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking/:id" 
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <SmartDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/seller-dashboard" 
              element={
                <ProtectedRoute>
                  <SellerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/buyer-dashboard" 
              element={
                <ProtectedRoute>
                  <BuyerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/become-seller" 
              element={
                <ProtectedRoute>
                  <BecomeSeller />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consultant-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['consultant']}>
                  <ConsultantDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register-consultant" 
              element={
                <ProtectedRoute>
                  <ConsultantRegister />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/become-consultant" 
              element={
                <ProtectedRoute>
                  <BecomeConsultant />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="verification" element={<AdminVerification />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="support" element={<AdminSupport />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/footer-showcase" element={<FooterShowcase />} />
            <Route path="/design-system" element={<DesignSystemShowcase />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route 
              path="/become-consultant" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <BecomeConsultantForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consultant-application-submitted" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ConsultantApplicationSubmitted />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
