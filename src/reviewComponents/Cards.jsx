import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import MD_Hover from '../assets/as-is/MD_Hover.png';
import MD from '../assets/as-is/MD.png';
import top from '../assets/as-is/top.png';
import special_hover from '../assets/as-is/특가_hover.png';
import special from '../assets/as-is/특가.png';



const Cards = ({ onBack }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // As-Is 섹션 컴포넌트
  const AsIsSection = () => {
    return (
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* 메인 헤더 - onBack이 없을 때만 표시 */}
        {!onBack && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">카드 컴포넌트 As-Is</h1>
            <p className="text-gray-500 mt-1">현재 카드 컴포넌트들의 UI 상태</p>
          </div>
        )}

        {/* 1. 특가상품 카드 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">1. 특가상품</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 기본 상태 */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={special} 
                  alt="특가상품 기본 UI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-gray-500">
                  특가.png
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">UI 기본</p>
            </div>

            {/* 호버 상태 */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={special_hover}
                  alt="특가상품 호버 UI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-gray-500">
                  특가_hover.png
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">hover 시</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg">
            <strong>설명:</strong> 기본적으로 대표 상품 이미지, 대표 출발 일자, 판매가, 할인 전 금액, 혜택, 라벨로 분류, hover 시 상품 포인트 노출
          </p>
        </div>

        {/* 2. MD Pick 카드 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">2. MD Pick</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 기본 상태 */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={MD}
                  alt="MD Pick 기본 UI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-gray-500">
                  MD.png
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">UI 기본</p>
            </div>

            {/* 호버 상태 */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={MD_Hover}
                  alt="MD Pick 호버 UI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-gray-500">
                  MD_Hover.png
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">hover 시</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg">
            <strong>설명:</strong> 대표 상품 이미지, 상품명, 판매가, hover 시 혜택
          </p>
        </div>

        {/* 3. 지역별 인기상품 카드 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">3. 지역별 인기상품</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-md">
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={top} 
                  alt="지역별 인기상품 UI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-gray-500">
                  top.png
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">UI 기본</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg">
            <strong>설명:</strong> 기본적으로 상품, 판매가, 판매순위
          </p>
        </div>

 
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
    >
      {/* Header */}
      {onBack && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-lg mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900" style={{ fontWeight: 500 }}>카드 컴포넌트 As-Is</h1>
              <div className="w-8"></div>
            </div>
          </div>
        </div>
      )}
      
      <AsIsSection />
    </div>
  );
};

export default Cards;