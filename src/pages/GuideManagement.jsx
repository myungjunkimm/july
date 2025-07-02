import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  MessageCircle,
  Building,
  Upload,
  ArrowLeft,
  Check,
  X,
  Clock,
  Instagram,
  Youtube,
  Globe,
  FileText
} from 'lucide-react';

// Mock 랜드사 데이터 (LandManagement에서 가져온 데이터)
const mockLandCompanies = [
  {
    id: 1,
    uuid: 'LAND-2024-001',
    organizationName: 'A랜드사',
    organizationType: '랜드사',
    businessType: '법인사업자'
  },
  {
    id: 2,
    uuid: 'LAND-2024-002',
    organizationName: '인솔자연합',
    organizationType: '연합',
    businessType: '개인사업자'
  }
];

// Mock 가이드 데이터
const mockGuides = [
  {
    id: 1,
    profileImage: null,
    name: '김가이드',
    phone: '010-1234-5678',
    email: 'guide@example.com',
    snsType: '카카오톡',
    snsId: 'guide_kim',
    landCompanyId: 1,
    landCompanyName: 'A랜드사',
    guideType: '가이드',
    employmentType: '정규직',
    status: '활성',
    instagramUrl: 'https://instagram.com/guide_kim',
    youtubeUrl: '',
    blogUrl: '',
    adminMemo: '경험이 풍부한 가이드',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    profileImage: null,
    name: '이인솔',
    phone: '010-9876-5432',
    email: 'leader@example.com',
    snsType: 'WeChat',
    snsId: 'leader_lee',
    landCompanyId: 1,
    landCompanyName: '인솔자연합',
    guideType: '인솔자',
    employmentType: '프리랜서',
    status: '활성',
    instagramUrl: '',
    youtubeUrl: 'https://youtube.com/@leader_lee',
    blogUrl: 'https://blog.naver.com/leader_lee',
    adminMemo: '중국어 전문 인솔자',
    createdAt: '2024-02-01'
  }
];

const GuideManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'register', 'edit'
  const [guides, setGuides] = useState(mockGuides);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [guideTypeFilter, setGuideTypeFilter] = useState('전체');
  const [landCompanyFilter, setLandCompanyFilter] = useState('전체');
  const [editingGuide, setEditingGuide] = useState(null);

  // 통계 데이터
  const totalGuides = guides.length;
  const activeGuides = guides.filter(guide => guide.status === '활성').length;
  const totalGuidesType = guides.filter(guide => guide.guideType === '가이드').length;
  const totalLeadersType = guides.filter(guide => guide.guideType === '인솔자').length;

  // 필터링된 데이터
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.phone.includes(searchTerm) ||
                         guide.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.landCompanyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '전체' || guide.status === statusFilter;
    const matchesGuideType = guideTypeFilter === '전체' || guide.guideType === guideTypeFilter;
    const matchesLandCompany = landCompanyFilter === '전체' || guide.landCompanyId.toString() === landCompanyFilter;
    
    return matchesSearch && matchesStatus && matchesGuideType && matchesLandCompany;
  });

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    profileImage: null,
    name: '',
    phone: '',
    email: '',
    snsType: '카카오톡',
    snsId: '',
    landCompanyId: '',
    guideType: '가이드',
    employmentType: '확인 불가',
    status: '활성',
    instagramUrl: '',
    youtubeUrl: '',
    blogUrl: '',
    adminMemo: ''
  });

  // 폼 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      profileImage: file
    }));
  };

  // 등록/수정 처리
  const handleSubmit = () => {
    const selectedLandCompany = mockLandCompanies.find(company => company.id.toString() === formData.landCompanyId);
    
    if (currentView === 'register') {
      const newGuide = {
        ...formData,
        id: Date.now(),
        landCompanyName: selectedLandCompany?.organizationName || '',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setGuides(prev => [...prev, newGuide]);
    } else if (currentView === 'edit') {
      setGuides(prev => prev.map(guide => 
        guide.id === editingGuide.id ? { 
          ...guide, 
          ...formData,
          landCompanyName: selectedLandCompany?.organizationName || guide.landCompanyName
        } : guide
      ));
    }
    
    // 폼 초기화 및 목록으로 이동
    resetForm();
    setCurrentView('list');
    setEditingGuide(null);
  };

  // 폼 리셋
  const resetForm = () => {
    setFormData({
      profileImage: null,
      name: '',
      phone: '',
      email: '',
      snsType: '카카오톡',
      snsId: '',
      landCompanyId: '',
      guideType: '가이드',
      employmentType: '확인 불가',
      status: '활성',
      instagramUrl: '',
      youtubeUrl: '',
      blogUrl: '',
      adminMemo: ''
    });
  };

  // 수정 모드로 전환
  const handleEdit = (guide) => {
    setEditingGuide(guide);
    setFormData({
      profileImage: guide.profileImage,
      name: guide.name,
      phone: guide.phone,
      email: guide.email,
      snsType: guide.snsType,
      snsId: guide.snsId,
      landCompanyId: guide.landCompanyId.toString(),
      guideType: guide.guideType,
      employmentType: guide.employmentType,
      status: guide.status,
      instagramUrl: guide.instagramUrl,
      youtubeUrl: guide.youtubeUrl,
      blogUrl: guide.blogUrl,
      adminMemo: guide.adminMemo
    });
    setCurrentView('edit');
  };

  // 삭제 처리
  const handleDelete = (id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setGuides(prev => prev.filter(guide => guide.id !== id));
    }
  };

  // 등록 화면으로 이동
  const handleRegister = () => {
    resetForm();
    setCurrentView('register');
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

  // 가이드 테이블 헤더
  const TableHeader = () => (
    <div className="bg-gray-50 rounded-t-xl p-4 border-b border-gray-200">
      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
        <div className="col-span-2">가이드 정보</div>
        <div className="col-span-2">연락처</div>
        <div className="col-span-2">소속 단체</div>
        <div className="col-span-1">유형</div>
        <div className="col-span-1">고용형태</div>
        <div className="col-span-1">상태</div>
        <div className="col-span-2">SNS</div>
        <div className="col-span-1">관리</div>
      </div>
    </div>
  );

  // 가이드 테이블 행 컴포넌트
  const GuideRow = ({ guide }) => (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* 가이드 정보 */}
        <div className="col-span-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              {guide.profileImage ? (
                <img src={URL.createObjectURL(guide.profileImage)} alt={guide.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <User size={16} className="text-white" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{guide.name}</p>
              <p className="text-xs text-gray-500 truncate">{guide.snsType}: {guide.snsId}</p>
            </div>
          </div>
        </div>

        {/* 연락처 */}
        <div className="col-span-2">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={12} className="mr-1 text-gray-400" />
              <span className="truncate">{guide.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={12} className="mr-1 text-gray-400" />
              <span className="truncate">{guide.email}</span>
            </div>
          </div>
        </div>

        {/* 소속 단체 */}
        <div className="col-span-2">
          <div className="flex items-center">
            <Building size={14} className="mr-2 text-gray-400" />
            <span className="text-sm text-gray-900 truncate">{guide.landCompanyName}</span>
          </div>
        </div>

        {/* 유형 */}
        <div className="col-span-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            guide.guideType === '가이드' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
          }`}>
            {guide.guideType}
          </span>
        </div>

        {/* 고용형태 */}
        <div className="col-span-1">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            guide.employmentType === '정규직' ? 'bg-green-100 text-green-600' :
            guide.employmentType === '프리랜서' ? 'bg-orange-100 text-orange-600' :
            guide.employmentType === '파트타임' ? 'bg-yellow-100 text-yellow-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            {guide.employmentType}
          </span>
        </div>

        {/* 상태 */}
        <div className="col-span-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            guide.status === '활성' ? 'bg-emerald-100 text-emerald-600' :
            guide.status === '비활성화' ? 'bg-red-100 text-red-600' :
            'bg-yellow-100 text-yellow-600'
          }`}>
            {guide.status}
          </span>
        </div>

        {/* SNS 링크 */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            {guide.instagramUrl && (
              <a href={guide.instagramUrl} target="_blank" rel="noopener noreferrer" 
                 className="p-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded transition-colors"
                 title="Instagram">
                <Instagram size={14} />
              </a>
            )}
            {guide.youtubeUrl && (
              <a href={guide.youtubeUrl} target="_blank" rel="noopener noreferrer" 
                 className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                 title="YouTube">
                <Youtube size={14} />
              </a>
            )}
            {guide.blogUrl && (
              <a href={guide.blogUrl} target="_blank" rel="noopener noreferrer" 
                 className="p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                 title="Blog">
                <Globe size={14} />
              </a>
            )}
            {guide.adminMemo && (
              <div className="relative group">
                <FileText size={14} className="text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {guide.adminMemo}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 관리 버튼 */}
        <div className="col-span-1">
          <div className="flex space-x-1">
            <button
              onClick={() => handleEdit(guide)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="수정"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => handleDelete(guide.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="삭제"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 목록 화면
  if (currentView === 'list') {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">가이드&인솔자 관리</h1>
            <p className="text-gray-500 mt-1">가이드 및 인솔자 등록 및 관리</p>
          </div>
          <button
            onClick={handleRegister}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            <span>가이드/인솔자 등록</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title="전체 인원" 
            value={totalGuides} 
            color="text-blue-600" 
            icon={User} 
          />
          <StatCard 
            title="활성 인원" 
            value={activeGuides} 
            color="text-emerald-600" 
            icon={Check} 
          />
          <StatCard 
            title="가이드" 
            value={totalGuidesType} 
            color="text-purple-600" 
            icon={User} 
          />
          <StatCard 
            title="인솔자" 
            value={totalLeadersType} 
            color="text-orange-600" 
            icon={User} 
          />
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="이름, 연락처, 이메일, 소속단체로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 상태</option>
                <option value="활성">활성</option>
                <option value="비활성화">비활성화</option>
                <option value="대기">대기</option>
              </select>
            </div>
            <div>
              <select
                value={guideTypeFilter}
                onChange={(e) => setGuideTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 유형</option>
                <option value="가이드">가이드</option>
                <option value="인솔자">인솔자</option>
              </select>
            </div>
            <div>
              <select
                value={landCompanyFilter}
                onChange={(e) => setLandCompanyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 소속</option>
                {mockLandCompanies.map(company => (
                  <option key={company.id} value={company.id.toString()}>
                    {company.organizationName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 가이드 목록 테이블 */}
        <div className="bg-white rounded-xl border border-gray-200/50 overflow-hidden">
          <TableHeader />
          <div className="divide-y divide-gray-100">
            {filteredGuides.map(guide => (
              <GuideRow key={guide.id} guide={guide} />
            ))}
          </div>
        </div>

        {filteredGuides.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200/50">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">가이드/인솔자가 없습니다</h3>
            <p className="text-gray-500 mb-4">검색 조건을 확인하거나 새로운 가이드/인솔자를 등록해보세요.</p>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              가이드/인솔자 등록
            </button>
          </div>
        )}
      </div>
    );
  }

  // 등록/수정 화면
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentView('list')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentView === 'register' ? '가이드/인솔자 등록' : '가이드/인솔자 정보 수정'}
          </h1>
          <p className="text-gray-500 mt-1">
            {currentView === 'register' ? '새로운 가이드/인솔자 정보를 입력해주세요' : '가이드/인솔자 정보를 수정해주세요'}
          </p>
        </div>
      </div>

      {/* 등록/수정 폼 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200/50 space-y-6">
        {/* 프로필 사진 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">프로필 정보</h3>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {formData.profileImage ? (
                  <img src={URL.createObjectURL(formData.profileImage)} alt="프로필" className="w-24 h-24 object-cover" />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="profileImage"
                accept=".jpg,.jpeg,.png"
              />
              <label htmlFor="profileImage" className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                사진 업로드
              </label>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                JPG, PNG 파일만 업로드 가능합니다. (최대 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SNS 선택</label>
              <select
                name="snsType"
                value={formData.snsType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="카카오톡">카카오톡</option>
                <option value="WeChat">WeChat</option>
                <option value="Naver">Naver</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">SNS ID</label>
              <input
                type="text"
                name="snsId"
                value={formData.snsId}
                onChange={handleInputChange}
                placeholder={`${formData.snsType} ID를 입력하세요`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 소속 및 업무 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">소속 및 업무 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                소속 단체 <span className="text-red-500">*</span>
              </label>
              <select
                name="landCompanyId"
                value={formData.landCompanyId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">소속 단체를 선택하세요</option>
                {mockLandCompanies.map(company => (
                  <option key={company.id} value={company.id.toString()}>
                    {company.organizationName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                가이드 유형 <span className="text-red-500">*</span>
              </label>
              <select
                name="guideType"
                value={formData.guideType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="가이드">가이드</option>
                <option value="인솔자">인솔자</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">고용형태</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="확인 불가">확인 불가</option>
                <option value="정규직">정규직</option>
                <option value="프리랜서">프리랜서</option>
                <option value="파트타임">파트타임</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="활성">활성</option>
                <option value="비활성화">비활성화</option>
                <option value="대기">대기</option>
              </select>
            </div>
          </div>
        </div>

        {/* SNS 링크 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SNS 링크</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleInputChange}
                placeholder="https://instagram.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleInputChange}
                placeholder="https://youtube.com/@username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog URL</label>
              <input
                type="url"
                name="blogUrl"
                value={formData.blogUrl}
                onChange={handleInputChange}
                placeholder="https://blog.naver.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 관리자 메모 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">관리자 메모</label>
          <textarea
            name="adminMemo"
            value={formData.adminMemo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="관리자용 메모를 입력하세요..."
          />
        </div>

        {/* 버튼 */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setCurrentView('list')}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {currentView === 'register' ? '등록' : '수정'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideManagement;