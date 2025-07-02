import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Star, 
  BarChart3, 
  Monitor, 
  Smartphone, 
  Award, 
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  Package,
  Eye,
  ArrowLeft
} from 'lucide-react';

const Menu = ({ onBack }) => {
  const [expandedNodes, setExpandedNodes] = useState({
    obms: true,
    otfront: true,
    excellentGuide: true,
    guideManagement: true,
    evaluation: true
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const TreeNode = ({ 
    id, 
    icon: Icon, 
    title, 
    description, 
    children, 
    level = 0, 
    isNew = false,
    nodeType = 'default'
  }) => {
    const hasChildren = children && children.length > 0;
    const isExpanded = expandedNodes[id];
    
    const getNodeStyles = () => {
      switch (nodeType) {
        case 'platform':
          return 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-900';
        case 'category':
          return 'bg-gray-50 border-gray-200 text-gray-800';
        case 'feature':
          return 'bg-white border-gray-100 text-gray-700 hover:bg-blue-50';
        default:
          return 'bg-white border-gray-100 text-gray-700';
      }
    };

    return (
      <div className="relative">
        {/* 연결선 */}
        {level > 0 && (
          <>
            <div 
              className="absolute left-4 top-0 w-px bg-gray-300"
              style={{ 
                height: '20px',
                marginLeft: `${(level - 1) * 24}px`
              }}
            />
            <div 
              className="absolute left-4 top-5 w-4 h-px bg-gray-300"
              style={{ 
                marginLeft: `${(level - 1) * 24}px`
              }}
            />
          </>
        )}

        <div 
          className={`
            relative flex items-center p-3 rounded-lg border-2 mb-3 transition-all duration-200 cursor-pointer group
            ${getNodeStyles()}
            ${isNew ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
          `}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => hasChildren && toggleNode(id)}
        >
          {/* 아이콘 */}
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0
            ${nodeType === 'platform' ? 'bg-white bg-opacity-80' : 'bg-blue-100'}
          `}>
            <Icon size={16} className={nodeType === 'platform' ? 'text-blue-600' : 'text-blue-500'} />
          </div>

          {/* 제목과 설명 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className={`font-semibold ${nodeType === 'platform' ? 'text-lg' : 'text-sm'}`}>
                {title}
              </h3>
              {isNew && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  NEW
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>

          {/* 확장/축소 버튼 */}
          {hasChildren && (
            <div className="ml-2">
              {isExpanded ? (
                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />
              ) : (
                <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
              )}
            </div>
          )}
        </div>

        {/* 자식 노드들 */}
        {hasChildren && isExpanded && (
          <div className="ml-6">
            {children.map((child, index) => (
              <TreeNode key={`${id}-${index}`} {...child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const menuStructure = [
    {
      id: 'obms',
      icon: Building2,
      title: 'OBMS Platform',
      description: '관리자 백오피스 시스템',
      nodeType: 'platform',
      isNew: false,
      children: [
        {
          id: 'excellentGuide',
          icon: Award,
          title: '우수가이드 & 랜드사 통합 관리',
          description: '새로 추가되는 통합 관리 메뉴',
          nodeType: 'category',
          isNew: true,
          children: [
            {
              id: 'landManagement',
              icon: Building2,
              title: '랜드사 관리',
              description: '랜드사 등록 및 관리 기능',
              nodeType: 'feature',
              isNew: true
            },
            {
              id: 'guideManagement',
              icon: Users,
              title: '가이드&인솔자',
              description: '가이드 및 인솔자 관리',
              nodeType: 'feature',
              isNew: true
            },
            {
              id: 'evaluation',
              icon: BarChart3,
              title: '가이드 평가 관리',
              description: '가이드 평가 시스템',
              nodeType: 'feature',
              isNew: true
            },
            {
              id: 'dashboard',
              icon: Monitor,
              title: '대시보드',
              description: '통합 현황 대시보드',
              nodeType: 'feature',
              isNew: true
            }
          ]
        }
      ]
    },
    {
      id: 'otfront',
      icon: Monitor,
      title: 'OT FRONT Platform',
      description: 'Web & Mobile 사용자 인터페이스',
      nodeType: 'platform',
      isNew: false,
      children: [
        {
          id: 'webFeatures',
          icon: Monitor,
          title: 'Web Features',
          description: '웹 플랫폼 기능',
          nodeType: 'category',
          isNew: true,
          children: [
            {
              id: 'plpBadge',
              icon: Award,
              title: 'PLP 우수가이드 배지',
              description: '상품 리스트 페이지 우수가이드 표시',
              nodeType: 'feature',
              isNew: true
            },
            {
              id: 'pdpComponent',
              icon: Star,
              title: 'PDP 우수가이드 컴포넌트',
              description: '상품 상세 페이지 우수가이드 정보',
              nodeType: 'feature',
              isNew: true
            }
          ]
        },
        {
          id: 'mobileFeatures',
          icon: Smartphone,
          title: 'Mobile Features',
          description: '모바일 플랫폼 기능',
          nodeType: 'category',
          isNew: true,
          children: [
            {
              id: 'mobilePlpBadge',
              icon: Award,
              title: 'PLP 우수가이드 배지',
              description: '모바일 상품 리스트 우수가이드 표시',
              nodeType: 'feature',
              isNew: true
            },
            {
              id: 'mobilePdpComponent',
              icon: Star,
              title: 'PDP 우수가이드 컴포넌트',
              description: '모바일 상품 상세 우수가이드 정보',
              nodeType: 'feature',
              isNew: true
            }
          ]
        }
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900" style={{ fontWeight: 500 }}>스타가이드 & 랜드사 통합 관리 기능 구조도</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* 서브 헤더 */}
        {/* <div className="text-center mb-8">
          <p className="text-gray-600">
            우수가이드 & 랜드사 통합 관리 기능 추가 구조도
          </p>
        </div> */}

        {/* 범례 */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">범례</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded"></div>
              <span>플랫폼</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
              <span>카테고리</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border border-gray-100 rounded"></div>
              <span>기능</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                NEW
              </span>
              <span>새로 추가되는 기능</span>
            </div>
          </div>
        </div>

        {/* 트리 구조 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          {menuStructure.map((node) => (
            <TreeNode key={node.id} {...node} />
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">OBMS Platform</h4>
            <p className="text-sm text-blue-700">
              관리자가 우수가이드와 랜드사를 통합적으로 관리할 수 있는 백오피스 시스템입니다.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">OT FRONT Platform</h4>
            <p className="text-sm text-purple-700">
              사용자가 우수가이드 정보를 확인할 수 있는 웹/모바일 인터페이스입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;