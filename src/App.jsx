import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  TrendingUp,
  DollarSign,
  Building,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react';

// 페이지 컴포넌트 import
import LandManagement from './pages/LandManagement';
import GuideManagement from './pages/GuideManagement';
import GuideManagementOption2 from './pages/GuideManagementOption2';
import ReviewList from './pages/ReviewList';

// 사이드바 컴포넌트
const Sidebar = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', name: '대시보드', icon: Home },
    { id: 'LandManagement', name: '랜드사 관리', icon: Building },
    { id: 'GuideManagement', name: '가이드/인솔자 관리', icon: Users },
    { id: 'GuideManagementOption2', name: '가이드/인솔자 관리 opt.2', icon: Plus },
    { id: 'ReviewList', name: '리뷰 Options', icon: MessageSquare },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
        w-64
      `}>
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OT</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">OBMS</h2>
            
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left
                  ${isActive 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom user section */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">관</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">관리자</p>
              <p className="text-xs text-gray-500 truncate">test@admin.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Header 컴포넌트
const Header = ({ toggleSidebar, currentPage }) => {
  const getPageInfo = (pageId) => {
    const pages = {
      'dashboard': { title: 'Dashboard', subtitle: 'Welcome back, here\'s what\'s happening.' },
      'LandManagement': { title: '랜드사 관리', subtitle: '랜드사 등록 및 관리' },
      'GuideManagement': { title: '가이드&인솔자 관리', subtitle: '가이드&인솔자 등록 및 관리' },
      'GuideManagementOption2': { title: '가이드&인솔자 opt.2', subtitle: '가이드&인솔자 등록 및 관리 opt.2' },
      'ReviewList': { title: '리뷰/평가 작성 템플릿', subtitle: '리뷰 항목 템플릿' },
      'settings': { title: 'Settings', subtitle: 'Configure your preferences.' }
    };
    return pages[pageId] || pages.dashboard;
  };

  const pageInfo = getPageInfo(currentPage);

  return (

    
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{pageInfo.title}</h1>
              <p className="text-sm text-gray-500">{pageInfo.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-80"
              />
            </div>
             */}
            {/* Notifications */}
            {/* <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
            </button> */}
            
            {/* Add button */}
            {/* <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">New</span>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

// Stats Card 컴포넌트
const StatsCard = ({ title, value, change, trend, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    orange: "text-orange-600 bg-orange-50"
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <ArrowUpRight size={16} className="text-emerald-500 mr-1" />
            ) : (
              <ArrowDownRight size={16} className="text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

// Dashboard 메인 컴포넌트
const Dashboard = () => {
  return (

    
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
    
    </div>
  );
};

// 메인 App 컴포넌트
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'LandManagement':
        return <LandManagement />;
      case 'GuideManagement':
        return <GuideManagement />;
      case 'GuideManagementOption2':
        return <GuideManagementOption2 />;
      case 'ReviewList':
        return <ReviewList />;
      case 'analytics':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200/50 p-12 text-center">
              <BarChart3 size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h2>
              <p className="text-gray-500">Advanced analytics dashboard coming soon.</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200/50 p-12 text-center">
              <Users size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Users</h2>
              <p className="text-gray-500">User management system coming soon.</p>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200/50 p-12 text-center">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Documents</h2>
              <p className="text-gray-500">Document management system coming soon.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200/50 p-12 text-center">
              <Settings size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
              <p className="text-gray-500">Settings panel coming soon.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          currentPage={currentPage}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {renderCurrentPage()}
        </main>
      </div>
  
    </div>
    
  
);

};

export default App;