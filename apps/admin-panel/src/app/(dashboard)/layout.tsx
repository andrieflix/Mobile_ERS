'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDesktopSidebar = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onMobileToggle={toggleMobileSidebar}
        isDesktopCollapsed={isDesktopCollapsed}
        onDesktopToggle={toggleDesktopSidebar}
      />
      
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 `}>
        <Header onMenuClick={toggleMobileSidebar} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 


// 'use client';

// import { useEffect,useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/contexts/AuthContext';
// import Header from '@/components/layout/Header';
// import { Sidebar } from '@/components/layout/Sidebar';

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {


//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

//   const toggleMobileSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleDesktopSidebar = () => {
//     setIsDesktopCollapsed(!isDesktopCollapsed);
//   };


//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-gray-500">Redirecting to login...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-red-500">
//     <Sidebar 
//       isOpen={isSidebarOpen} 
//       onMobileToggle={toggleMobileSidebar}
//       isDesktopCollapsed={isDesktopCollapsed}
//       onDesktopToggle={toggleDesktopSidebar}
//     />
    
//     <div className={`flex-1 flex flex-col  transition-all duration-300 `}>
//       <Header onMenuClick={toggleMobileSidebar} />
//       <main className="flex-1 overflow-auto">
//         <div className="p-4 md:p-6 lg:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   </div>
//   );
// } 