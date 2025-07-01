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
  Download
} from 'lucide-react';

// 페이지 컴포넌트 import
import LandManagement from './pages/LandManagement';

// 사이드바 컴포넌트
const Sidebar = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'LandManagement', name: 'Land Management', icon: Building },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
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
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">LandOS</h2>
              <p className="text-xs text-gray-500">Land Management</p>
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
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">admin@company.com</p>
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
      'LandManagement': { title: 'Land Management', subtitle: 'Manage your properties and land assets.' },
      'analytics': { title: 'Analytics', subtitle: 'Track performance and insights.' },
      'users': { title: 'Users', subtitle: 'Manage users and permissions.' },
      'documents': { title: 'Documents', subtitle: 'Access and organize documents.' },
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
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-80"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
            </button>
            
            {/* Add button */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">New</span>
            </button>
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
  const stats = [
    {
      title: "Total Properties",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: Building,
      color: "blue"
    },
    {
      title: "Active Contracts",
      value: "856",
      change: "+8.2%",
      trend: "up",
      icon: FileText,
      color: "green"
    },
    {
      title: "Revenue",
      value: "$2.4M",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "purple"
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "-5.1%",
      trend: "down",
      icon: Calendar,
      color: "orange"
    }
  ];

  const recentActivity = [
    { id: 1, action: "New property registered", location: "Downtown District", time: "2 min ago", status: "completed" },
    { id: 2, action: "Contract signed", location: "Riverside Area", time: "1 hour ago", status: "completed" },
    { id: 3, action: "Review pending", location: "Tech Park", time: "3 hours ago", status: "pending" },
    { id: 4, action: "Payment received", location: "Business Center", time: "5 hours ago", status: "completed" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly performance metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={16} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Simple chart placeholder */}
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.location}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Add Property", icon: Building, color: "blue" },
            { name: "New Contract", icon: FileText, color: "green" },
            { name: "Generate Report", icon: BarChart3, color: "purple" },
            { name: "Manage Users", icon: Users, color: "orange" }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center space-y-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                action.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                action.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                <action.icon size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
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