import React from 'react';

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
        <div className="loader mb-6"></div>
        <p className="text-xl font-medium text-blue-700 mb-2">{message}</p>
        <p className="text-gray-500 text-center">Vui lòng đợi trong giây lát...</p>
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .loader {
            width: 60px;
            aspect-ratio: 1;
            --c: no-repeat radial-gradient(farthest-side, #3b82f6 92%, #0000);
            background: 
              var(--c) 50% 0, 
              var(--c) 50% 100%, 
              var(--c) 100% 50%, 
              var(--c) 0 50%;
            background-size: 12px 12px;
            animation: l18 1s infinite;
            position: relative;
          }
          
          .loader::before {    
            content: "";
            position: absolute;
            inset: 0;
            margin: 4px;
            background: repeating-conic-gradient(#0000 0 35deg, #2563eb 0 90deg);
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 0);
            border-radius: 50%;
          }
          
          @keyframes l18 { 
            100% { transform: rotate(.5turn) }
          }
        `}</style>
      </div>
    </div>
  );
}; 