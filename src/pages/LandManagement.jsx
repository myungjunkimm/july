import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText,
  Upload,
  ArrowLeft,
  Check,
  X,
  Eye,
  EyeOff,
  Users
} from 'lucide-react';

// Mock 데이터
const mockLandCompanies = [
  {
    id: 1,
    uuid: 'LAND-2024-001',
    organizationType: '랜드사',
    organizationName: '(주)A컴퍼니',
    businessType: '법인사업자',
    businessNumber: '123-45-67890',
    representative: '김대표',
    phone: '02-1234-5678',
    email: 'kim@acompany.com',
    businessCategory: '일반여행업',
    businessItem: '여행사업',
    postalCode: '12345',
    establishedDate: '2020-01-15',
    address1: '서울특별시 구로구 새말로 91',
    address2: '지하3층 308호(구로동, 신도림테크노마트)',
    accountBank: '국민은행',
    accountNumber: '123456-78-901234',
    accountHolder: '김대표',
    adminMemo: '우수 거래처',
    status: '활성',
    isPreferred: true,
    guideCount: 8,
    tourLeaderCount: 3,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    uuid: 'LAND-2024-002',
    organizationType: '연합',
    organizationName: '인솔자연합',
    businessType: '개인사업자',
    businessNumber: '987-65-43210',
    representative: '이사장',
    phone: '02-9876-5432',
    email: 'info@federation.com',
    businessCategory: '부동산업',
    businessItem: '부동산중개',
    postalCode: '54321',
    establishedDate: '2019-03-20',
    address1: '서울시 서초구 서초대로 789',
    address2: '2층',
    accountBank: '신한은행',
    accountNumber: '987654-32-109876',
    accountHolder: '이사장',
    adminMemo: '정기 검토 필요',
    status: '비활성',
    isPreferred: false,
    guideCount: 3,
    tourLeaderCount: 0,
    createdAt: '2024-02-20'
  }
];
const LandManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'register', 'edit'
  const [landCompanies, setLandCompanies] = useState(mockLandCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('전체');
  const [organizationFilter, setOrganizationFilter] = useState('전체');
  const [editingCompany, setEditingCompany] = useState(null);

  // 통계 데이터
  const totalCompanies = landCompanies.length;
  const activeCompanies = landCompanies.filter(company => company.status === '활성').length;
  const inactiveCompanies = landCompanies.filter(company => company.status === '비활성').length;

  // 필터링된 데이터
  const filteredCompanies = landCompanies.filter(company => {
    const matchesSearch = company.representative.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.businessNumber.includes(searchTerm) ||
                         company.uuid.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '전체' || company.status === statusFilter;
    const matchesOrganization = organizationFilter === '전체' || company.organizationType === organizationFilter;
    const matchesBusinessType = businessTypeFilter === '전체' || company.businessType === businessTypeFilter;
    
    return matchesSearch && matchesStatus && matchesOrganization && matchesBusinessType;
  });

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    uuid: '',
    organizationType: '랜드사',
    organizationName: '',
    businessType: '법인사업자',
    customOrganization: '',
    businessNumber: '',
    representative: '',
    phone: '',
    email: '',
    businessCategory: '',
    businessItem: '',
    postalCode: '',
    establishedDate: '',
    address1: '',
    address2: '',
    businessLicenseFile: null,
    bankAccountFile: null,
    accountBank: '',
    accountNumber: '',
    accountHolder: '',
    adminMemo: '',
    status: '활성',
    isPreferred: false,
    guideCount: 0,
    tourLeaderCount: 0
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
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  // UUID 자동 생성
  const generateUUID = () => {
    const year = new Date().getFullYear();
    const count = landCompanies.length + 1;
    return `LAND-${year}-${String(count).padStart(3, '0')}`;
  };

  // 등록/수정 처리
  const handleSubmit = () => {
    if (currentView === 'register') {
      const newCompany = {
        ...formData,
        id: Date.now(),
        uuid: formData.uuid || generateUUID(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setLandCompanies(prev => [...prev, newCompany]);
    } else if (currentView === 'edit') {
      setLandCompanies(prev => prev.map(company => 
        company.id === editingCompany.id ? { ...company, ...formData } : company
      ));
    }
    
    // 폼 초기화 및 목록으로 이동
    resetForm();
    setCurrentView('list');
    setEditingCompany(null);
  };

  // 폼 리셋
  const resetForm = () => {
    setFormData({
      uuid: '',
      organizationType: '랜드사',
      organizationName: '',
      businessType: '법인사업자',
      customOrganization: '',
      businessNumber: '',
      representative: '',
      phone: '',
      email: '',
      businessCategory: '',
      businessItem: '',
      postalCode: '',
      establishedDate: '',
      address1: '',
      address2: '',
      businessLicenseFile: null,
      bankAccountFile: null,
      accountBank: '',
      accountNumber: '',
      accountHolder: '',
      adminMemo: '',
      status: '활성',
      isPreferred: false,
      guideCount: 0,
      tourLeaderCount: 0
    });
  };

  // 수정 모드로 전환
  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData(company);
    setCurrentView('edit');
  };

  // 삭제 처리
  const handleDelete = (id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setLandCompanies(prev => prev.filter(company => company.id !== id));
    }
  };

  // 등록 화면으로 이동
  const handleRegister = () => {
    resetForm();
    setFormData(prev => ({ ...prev, uuid: generateUUID() }));
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
          color === 'text-emerald-600' ? 'bg-emerald-50' : 'bg-red-50'
        }`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  // 랜드사 카드 컴포넌트
  const CompanyCard = ({ company }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Building size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{company.organizationName}</h3>
            <p className="text-sm text-gray-600">{company.representative}</p>
            <p className="text-xs text-gray-500">{company.uuid}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {company.isPreferred && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
              우수거래처
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            company.status === '활성' 
              ? 'bg-emerald-100 text-emerald-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            {company.status}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => handleEdit(company)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(company.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-16 text-gray-500">단체:</span>
          <span>{company.organizationType}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-16 text-gray-500">구분:</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            company.businessType === '법인사업자' ? 'bg-blue-100 text-blue-600' :
            company.businessType === '개인사업자' ? 'bg-green-100 text-green-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            {company.businessType}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone size={14} className="mr-2 text-gray-400" />
          <span>{company.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail size={14} className="mr-2 text-gray-400" />
          <span>{company.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={14} className="mr-2 text-gray-400" />
          <span>{company.address1}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={14} className="mr-2 text-gray-400" />
          <span>설립일: {company.establishedDate}</span>
        </div>
      </div>
      
      {/* 소속 인원 정보 */}
      <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-blue-500" />
            <span className="text-gray-600">가이드: </span>
            <span className="font-medium text-blue-600">{company.guideCount}명</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-emerald-500" />
            <span className="text-gray-600">인솔자: </span>
            <span className="font-medium text-emerald-600">{company.tourLeaderCount}명</span>
          </div>
        </div>
      </div>
      
      {company.adminMemo && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <FileText size={14} className="inline mr-1" />
            {company.adminMemo}
          </p>
        </div>
      )}
    </div>
  );

  // 목록 화면
  if (currentView === 'list') {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">랜드사 관리</h1>
            <p className="text-gray-500 mt-1">랜드사 등록 및 관리</p>
          </div>
          <button
            onClick={handleRegister}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            <span>새 랜드사 등록</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="전체 랜드사" 
            value={totalCompanies} 
            color="text-blue-600" 
            icon={Building} 
          />
          <StatCard 
            title="활성 랜드사" 
            value={activeCompanies} 
            color="text-emerald-600" 
            icon={Check} 
          />
          <StatCard 
            title="비활성 랜드사" 
            value={inactiveCompanies} 
            color="text-red-600" 
            icon={X} 
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
                  placeholder="단체명, 대표자명, 사업자번호, UUID로 검색..."
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
                <option value="비활성">비활성</option>
              </select>
            </div>
            <div>
              <select
                value={organizationFilter}
                onChange={(e) => setOrganizationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 단체</option>
                <option value="랜드사">랜드사</option>
                <option value="연합">연합</option>
                <option value="협회">협회</option>
              </select>
            </div>
            <div>
              <select
                value={businessTypeFilter}
                onChange={(e) => setBusinessTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 사업자</option>
                <option value="법인사업자">법인사업자</option>
                <option value="개인사업자">개인사업자</option>
                <option value="현지">현지</option>
              </select>
            </div>
          </div>
        </div>

        {/* 랜드사 목록 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200/50">
            <Building size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">랜드사가 없습니다</h3>
            <p className="text-gray-500 mb-4">검색 조건을 확인하거나 새로운 랜드사를 등록해보세요.</p>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              새 랜드사 등록
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
            {currentView === 'register' ? '새 랜드사 등록' : '랜드사 정보 수정'}
          </h1>
          <p className="text-gray-500 mt-1">
            {currentView === 'register' ? '새로운 랜드사 정보를 입력해주세요' : '랜드사 정보를 수정해주세요'}
          </p>
        </div>
      </div>

      {/* 등록/수정 폼 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200/50 space-y-6">
        {/* 기본 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                랜드 UUID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="uuid"
                value={formData.uuid}
                onChange={handleInputChange}
                disabled={currentView === 'edit'}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentView === 'edit' ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                }`}
                required
              />
              {currentView === 'edit' && (
                <p className="text-xs text-gray-500 mt-1">UUID는 수정할 수 없습니다.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                단체 구분 <span className="text-red-500">*</span>
              </label>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="랜드사">랜드사</option>
                <option value="연합">연합</option>
                <option value="협회">협회</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {formData.organizationType === '기타' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기타 단체명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customOrganization"
                  value={formData.customOrganization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                단체명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사업자 구분 <span className="text-red-500">*</span>
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="법인사업자">법인사업자</option>
                <option value="개인사업자">개인사업자</option>
                <option value="현지">현지</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사업자번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessNumber"
                value={formData.businessNumber}
                onChange={handleInputChange}
                placeholder="000-00-00000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대표자 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="representative"
                value={formData.representative}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="02-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">업태</label>
              <input
                type="text"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종목</label>
              <input
                type="text"
                name="businessItem"
                value={formData.businessItem}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">설립일</label>
              <input
                type="date"
                name="establishedDate"
                value={formData.establishedDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                <option value="비활성">비활성</option>
              </select>
            </div>
          </div>
        </div>

        {/* 주소 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">주소 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">우편번호</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">주소 1</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">주소 2 (상세주소)</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 계좌 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">계좌 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">은행명</label>
              <input
                type="text"
                name="accountBank"
                value={formData.accountBank}
                onChange={handleInputChange}
                placeholder="국민은행"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">계좌번호</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="123456-78-901234"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">예금주명</label>
              <input
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 파일 업로드 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">첨부 파일</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사업자등록증 사본</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'businessLicenseFile')}
                  className="hidden"
                  id="businessLicense"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <label htmlFor="businessLicense" className="cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">파일 선택 또는 드래그 앤 드롭</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (최대 10MB)</p>
                </label>
                {formData.businessLicenseFile && (
                  <p className="text-sm text-blue-600 mt-2">{formData.businessLicenseFile.name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">은행계좌 사본</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'bankAccountFile')}
                  className="hidden"
                  id="bankAccount"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <label htmlFor="bankAccount" className="cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">파일 선택 또는 드래그 앤 드롭</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (최대 10MB)</p>
                </label>
                {formData.bankAccountFile && (
                  <p className="text-sm text-blue-600 mt-2">{formData.bankAccountFile.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 소속 인원 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">소속 인원 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">소속 가이드 수</label>
              <input
                type="number"
                name="guideCount"
                value={formData.guideCount}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">소속 인솔자 수</label>
              <input
                type="number"
                name="tourLeaderCount"
                value={formData.tourLeaderCount}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            현재 소속된 가이드 및 인솔자 수를 입력해주세요. (추후 가이드 관리 메뉴에서 상세 관리 가능)
          </p>
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

        {/* 우수 거래처 */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isPreferred"
              checked={formData.isPreferred}
              onChange={(e) => setFormData(prev => ({ ...prev, isPreferred: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-700">우수 거래처로 지정</span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-7">
            우수 거래처로 지정하면 목록에서 특별 표시됩니다.
          </p>
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

export default LandManagement;