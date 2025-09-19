import React from 'react';
import { Cardio } from 'ldrs/react'
import 'ldrs/react/Cardio.css'


type LoadingOverlayProps = {
  isLoading: boolean;
  message?: string;
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading,
  message = "Đang tạo bộ câu hỏi..."
}) => {
  if (!isLoading) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-blue-400/90 to-blue-600/90 backdrop-blur-sm z-50 flex items-center justify-center"
      style={{
        animation: "fadeIn 0.3s ease-in-out"
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-md mx-4 transform transition-all">
        <div className="mb-6">
          <Cardio
            size="60"
            stroke="4"
            speed="2"
            color="#3b82f6" 
          />
        </div>
        <p className="text-xl font-medium text-blue-700 mb-2">{message}</p>
        <p className="text-gray-500 text-center">Vui lòng đợi trong giây lát...</p>
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}; 