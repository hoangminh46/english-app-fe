import React from 'react';
import { audiences } from '../../types/quiz';
import { 
  AcademicCapIcon,
  UserGroupIcon, 
  BriefcaseIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

type AudienceInfo = {
  [key: string]: {
    icon: React.ElementType;
    description: string;
  }
}

const audienceInfo: AudienceInfo = {
  "student": {
    icon: AcademicCapIcon,
    description: "Dành cho các bạn học sinh phổ thông"
  },
  "college": {
    icon: UserGroupIcon,
    description: "Phù hợp với sinh viên đại học, cao đẳng"
  },
  "worker": {
    icon: BriefcaseIcon,
    description: "Từ vựng và ngữ pháp cho người đi làm"
  },
  "senior": {
    icon: HeartIcon,
    description: "Học ngoại ngữ không giới hạn độ tuổi"
  }
};

type AudienceSelectorProps = {
  selectedAudience: string;
  onSelectAudience: (audience: string) => void;
};

export const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedAudience,
  onSelectAudience
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">Bạn là ai?</h2>
        <p className="text-gray-600 text-sm sm:text-base">Chọn đối tượng phù hợp để có trải nghiệm học tập tốt nhất</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {audiences.map((audience) => {
          const AudienceIcon = audienceInfo[audience.value].icon;
          return (
            <Button
              key={audience.value}
              type="button"
              variant="ghost"
              size="none"
              className={`h-auto group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                selectedAudience === audience.value
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
              onClick={() => onSelectAudience(audience.value)}
            >
              <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
                <div className={`p-2 sm:p-3 rounded-full transition-colors duration-300 ${
                  selectedAudience === audience.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                }`}>
                  <AudienceIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1 sm:flex-none text-left sm:text-center">
                  <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                    selectedAudience === audience.value ? "text-blue-600" : "text-gray-800"
                  }`}>
                    {audience.label}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                    {audienceInfo[audience.value].description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}; 