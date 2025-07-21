import Topbar from './components/layout/Topbar';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from "react-scroll-to-top";

export default function App() {
  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          .scroll-to-top {
            transition: all 0.3s ease !important;
          }
          .scroll-to-top:hover {
            opacity: 1 !important;
            transform: scale(1.1) !important;
          }
        `}
      </style>
      <ScrollToTop 
        smooth 
        color="#6366f1"
        className="scroll-to-top"
        style={{
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          opacity: 0.9,
        }}
        component={
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        }
      />
      <Topbar />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}
