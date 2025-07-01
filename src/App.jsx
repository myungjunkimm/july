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
  ChevronDown
} from 'lucide-react';

// 페이지 컴포넌트 import
import LandManagement from './pages/LandManagement';

// 사이드바 컴포넌트
const Sidebar = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'LandManagement', name: '토지 관리', icon: Home, color: 'text-blue-600' },
    { id: 'page2', name: '사용자 관리', icon: Users, color: 'text-green-600' },
    { id: 'page3', name: '통계 분석', icon: BarChart3, color: 'text-purple-600' },
    { id: 'page4', name: '문서 관리', icon: FileText, color: 'text-orange-600' },
    { id: 'page5', name: '시스템 설정', icon: Settings, color: 'text-gray-600' },
  ];

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* 사이드바 */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:border-r
        w-72
      `}>
        {/* 로고/헤더 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Admin Portal</h2>
                <p className="text-sm text-gray-500">관리자 대시보드</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* 메뉴 항목들 */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon 
                  size={20} 
                  className={`${isActive ? 'text-blue-600' : item.color} transition-colors`}
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* 사이드바 하단 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">관</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">관리자</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// 헤더 컴포넌트
const Header = ({ toggleSidebar, currentPage }) => {
  const getPageTitle = (pageId) => {
    const titles = {
      'LandManagement': '토지 관리',
      'page2': '사용자 관리',
      'page3': '통계 분석',
      'page4': '문서 관리',
      'page5': '시스템 설정'
    };
    return titles[pageId] || '대시보드';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{getPageTitle(currentPage)}</h1>
            <p className="text-sm text-gray-500">관리자 포털에 오신 것을 환영합니다</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* 검색 */}
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="검색..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          {/* 알림 */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          
          {/* 프로필 드롭다운 */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">관</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

// 개선된 LandManagement 페이지
const ImprovedLandManagement = () => {
  const stats = [
    { title: '총 토지 수', value: '1,234', change: '+12%', color: 'blue' },
    { title: '활성 계약', value: '856', change: '+8%', color: 'green' },
    { title: '대기중 승인', value: '23', change: '-5%', color: 'orange' },
    { title: '총 수익', value: '₩125M', change: '+15%', color: 'purple' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                stat.change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 활동 */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">최근 토지 등록</h3>
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">서울시 강남구 토지 #{item}</p>
                  <p className="text-sm text-gray-500">2024년 7월 {item}일 등록</p>
                </div>
                <div className="text-sm font-medium text-green-600">승인됨</div>
              </div>
            ))}
          </div>
        </div>

        {/* 빠른 작업 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">빠른 작업</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { name: '새 토지 등록', icon: Home, color: 'blue' },
              { name: '계약서 작성', icon: FileText, color: 'green' },
              { name: '승인 처리', icon: Users, color: 'orange' },
              { name: '리포트 생성', icon: BarChart3, color: 'purple' },
            ].map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <action.icon size={18} className={`text-${action.color}-600`} />
                <span className="font-medium text-gray-700">{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('LandManagement');

  // 현재 페이지에 따라 컴포넌트 렌더링
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'LandManagement':
        return <ImprovedLandManagement />;
      case 'page2':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <Users size={48} className="mx-auto text-green-600 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">사용자 관리</h1>
              <p className="text-gray-600">사용자 관리 페이지가 준비 중입니다.</p>
            </div>
          </div>
        );
      case 'page3':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <BarChart3 size={48} className="mx-auto text-purple-600 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">통계 분석</h1>
              <p className="text-gray-600">통계 분석 페이지가 준비 중입니다.</p>
            </div>
          </div>
        );
      case 'page4':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <FileText size={48} className="mx-auto text-orange-600 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">문서 관리</h1>
              <p className="text-gray-600">문서 관리 페이지가 준비 중입니다.</p>
            </div>
          </div>
        );
      case 'page5':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <Settings size={48} className="mx-auto text-gray-600 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">시스템 설정</h1>
              <p className="text-gray-600">시스템 설정 페이지가 준비 중입니다.</p>
            </div>
          </div>
        );
      default:
        return <ImprovedLandManagement />;
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          currentPage={currentPage}
        />
        
        {/* 페이지 컨텐츠 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default App;