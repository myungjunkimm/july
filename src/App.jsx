import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Menu,
  X
} from 'lucide-react';

// 페이지 컴포넌트 import
import LandManagement from './pages/LandManagement';
// import Page2 from './pages/Page2';
// import Page3 from './pages/Page3';
// import Page4 from './pages/Page4';
// import Page5 from './pages/Page5';

// 사이드바 컴포넌트
const Sidebar = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'LandManagement', name: '1', icon: Home },
    { id: 'page2', name: '2', icon: Users },
    { id: 'page3', name: '3', icon: BarChart3 },
    { id: 'page4', name: '4', icon: FileText },
    { id: 'page5', name: '5', icon: Settings },
  ];

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false); // 모바일에서 메뉴 클릭 시 사이드바 닫기
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* 사이드바 */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
        w-64
      `}>
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 메뉴 항목들 */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left
                      ${isActive 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">페이지 {item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

// 헤더 컴포넌트
const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">관리자 대시보드</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('LandManagement'); // 수정: 'page1' -> 'LandManagement'

  // 현재 페이지에 따라 컴포넌트 렌더링
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'LandManagement':
        return <LandManagement />;
      case 'page2':
        return <div className="p-6"><h1 className="text-2xl">페이지 2</h1></div>;
      case 'page3':
        return <div className="p-6"><h1 className="text-2xl">페이지 3</h1></div>;
      case 'page4':
        return <div className="p-6"><h1 className="text-2xl">페이지 4</h1></div>;
      case 'page5':
        return <div className="p-6"><h1 className="text-2xl">페이지 5</h1></div>;
      default:
        return <LandManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* 헤더 */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* 페이지 컨텐츠 */}
        <main className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default App;