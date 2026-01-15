// @ts-nocheck
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarCategories } from '../../data/grammarData';
import { Button } from '@/components/ui/Button';

type GrammarSelectorProps = {
  onSelectTopic?: (categoryId: string, subcategoryId: string, topicId: string) => void;
  selectedTopic?: string | null;
};

export const GrammarSelector: React.FC<GrammarSelectorProps> = ({ onSelectTopic, selectedTopic }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setExpandedSubcategory(null);
    } else {
      setExpandedCategory(categoryId);
      setExpandedSubcategory(null);
    }
  };

  const toggleSubcategory = (subcategoryId: string) => {
    if (expandedSubcategory === subcategoryId) {
      setExpandedSubcategory(null);
    } else {
      setExpandedSubcategory(subcategoryId);
    }
  };

  const handleTopicClick = (categoryId: string, subcategoryId: string, topicId: string) => {
    if (onSelectTopic) {
      onSelectTopic(categoryId, subcategoryId, topicId);
    }
  };

  const isTopicSelected = (topicId: string) => {
    return selectedTopic === topicId;
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          Ngữ pháp cơ bản
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Chọn chủ đề ngữ pháp bạn muốn học
        </p>
      </div>

      <div className="space-y-3">
        {grammarCategories.map((category) => (
          <div key={category.id} className="border-2 border-gray-200 rounded-xl overflow-hidden">
            {/* Category Header */}
            <Button
              onClick={() => toggleCategory(category.id)}
              variant="ghost"
              className="w-full p-4 flex items-center justify-between bg-white hover:bg-blue-50 
                       transition-colors duration-200 text-left rounded-none border-0"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {category.description}
                </p>
              </div>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500 flex-shrink-0 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </Button>

            {/* Subcategories */}
            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-gray-50 border-t-2 border-gray-200 overflow-hidden"
                >
                  {category.subcategories.map((subcategory, index) => (
                    <motion.div
                      key={subcategory.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      {/* Subcategory Header */}
                      <Button
                        onClick={() => toggleSubcategory(subcategory.id)}
                        variant="ghost"
                        className="w-full p-4 pl-8 flex items-center justify-between bg-gray-50 
                                 hover:bg-blue-50 transition-colors duration-200 text-left rounded-none border-0"
                      >
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-800">
                            {subcategory.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {subcategory.description}
                          </p>
                        </div>
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-gray-500 flex-shrink-0 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ rotate: expandedSubcategory === subcategory.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </Button>

                      {/* Topics */}
                      <AnimatePresence>
                        {expandedSubcategory === subcategory.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="bg-white overflow-hidden"
                          >
                            {subcategory.topics.map((topic) => {
                              const isSelected = isTopicSelected(topic.id);
                              return (
                                <Button
                                  key={topic.id}
                                  onClick={() => handleTopicClick(category.id, subcategory.id, topic.id)}
                                  variant="ghost"
                                  className={`w-full p-4 pl-12 text-left transition-all duration-200 
                                           border-b border-l-4 last:border-b-0 group relative rounded-none
                                           ${isSelected 
                                             ? 'bg-blue-50 border-blue-200 border-l-blue-500' 
                                             : 'border-gray-100 border-l-transparent hover:bg-blue-50 hover:border-l-blue-300'
                                           }`}
                                >
                                  <h5 className={`text-sm font-medium transition-colors
                                               ${isSelected 
                                                 ? 'text-blue-600' 
                                                 : 'text-gray-800 group-hover:text-blue-600'
                                               }`}>
                                    {topic.title}
                                  </h5>
                                  <p className={`text-xs mt-1 transition-colors
                                             ${isSelected 
                                               ? 'text-blue-700' 
                                               : 'text-gray-600'
                                             }`}>
                                    {topic.description}
                                  </p>
                                </Button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

