import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye,
  FileText,
  Star,
  Filter,
  ArrowLeft,
  Building,
  User
} from 'lucide-react';

// 템플릿 컴포넌트 import
import Cards from '../reviewComponents/Cards';
import Menu from '../reviewComponents/Menu';
import NewCards from '../reviewComponents/NewCards';
import NewCards2 from '../reviewComponents/NewCards2';

// 리뷰 템플릿 Mock 데이터
const mockTemplates = [
  {
    id: 1,
    templateName: '신규 기능',
    description: '스타가이드 & 랜드사 통합 관리 기능 구조도',
  
  },
  {
    id: 2,
    templateName: '[AS-IS] Card Component',
    description: ' 패키지 여행 상품 PLP 카드 컴포넌트',
  },
  {
    id: 3,
    templateName: '카드 컴포넌트 (뱃지) #1',
    description: '멀티 이미지',
  },
  {
    id: 4,
    templateName: '카드 컴포넌트 (뱃지) #2',
    description: '싱글 이미지',
  }

];

const ReviewComponents = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'template'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates] = useState(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');

  // 통계 데이터
  const totalTemplates = templates.length;


  // 템플릿 상세보기
  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentView('template');
  };

  // 통계 카드 컴포넌트
  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          color === 'text-blue-600' ? 'bg-blue-50' : 
          color === 'text-emerald-600' ? 'bg-emerald-50' : 
          color === 'text-purple-600' ? 'bg-purple-50' :
          'bg-orange-50'
        }`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  // 템플릿 테이블 헤더
  const TableHeader = () => (
    <div className="bg-gray-50 rounded-t-xl p-4 border-b border-gray-200">
      <div className="grid grid-cols-10 gap-4 text-sm font-medium text-gray-700">
        <div className="col-span-8">템플릿명</div>
        <div className="col-span-2">액션</div>
      </div>
    </div>
  );

  // 템플릿 테이블 행 컴포넌트
  const TemplateRow = ({ template }) => (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-10 gap-4 items-center">
        {/* 템플릿명 */}
        <div className="col-span-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{template.templateName}</p>
              <p className="text-xs text-gray-500 truncate">{template.description}</p>
            </div>
          </div>
        </div>

        {/* 관리 버튼 */}
        <div className="col-span-2">
          <button
            onClick={() => handleViewTemplate(template)}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="상세보기"
          >
            <Eye size={12} />
            <span>상세보기</span>
          </button>
        </div>
      </div>
    </div>
  );

  // 템플릿 상세보기 (실제 템플릿 컴포넌트 렌더링)
  if (currentView === 'template' && selectedTemplate) {
    const handleBack = () => setCurrentView('list');
    
    // 템플릿 ID에 따라 해당 컴포넌트 렌더링
    switch (selectedTemplate.id) {
      case 1:
        return <Menu onBack={handleBack} />;
      case 2 : 
        return <Cards onBack={handleBack} />;
      case 3 : 
        return <NewCards2 onBack={handleBack}/>;
    
      case 4 :
        return <NewCards onBack={handleBack} />;
      default:
        return (
          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedTemplate.templateName}</h1>
                <p className="text-gray-500 mt-1">{selectedTemplate.description}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200/50">
              <div className="text-center py-12">
                <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  템플릿을 준비 중입니다
                </h3>
                <p className="text-gray-500">
                  템플릿 #{selectedTemplate.id}는 아직 구현되지 않았습니다.
                </p>
              </div>
            </div>
          </div>
        );
    }
  }

  // 메인 목록 화면
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">리뷰 템플릿 관리</h1>
          <p className="text-gray-500 mt-1">리뷰 평가 템플릿 목록</p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <StatCard 
          title="전체 템플릿" 
          value={totalTemplates} 
          color="text-blue-600" 
          icon={FileText} 
        />
      </div>

      {/* 템플릿 목록 테이블 */}
      <div className="bg-white rounded-xl border border-gray-200/50 overflow-hidden">
        <TableHeader />
        <div className="divide-y divide-gray-100">
          {templates.map(template => (
            <TemplateRow key={template.id} template={template} />
          ))}
        </div>
      </div>

      {templates.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200/50">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">템플릿이 없습니다</h3>
          <p className="text-gray-500 mb-4">새로운 템플릿을 만들어보세요.</p>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            새 템플릿 만들기
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewComponents;