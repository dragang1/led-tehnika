'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { parseProductDescription, processSectionContent } from '@/app/_utils/parseProductDescription';

/**
 * Simple Accordion component for FAQ items
 */
const AccordionItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-gray-700 leading-relaxed">
          {answer.split('\n').map((para, idx) => (
            para.trim() && (
              <p key={idx} className="mb-2 last:mb-0">
                {para.trim()}
              </p>
            )
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Renders a specification item (with colon or dash)
 */
const SpecItem = ({ text }) => {
  // Split by colon if present
  const parts = text.split(':');
  
  if (parts.length === 2) {
    const [label, value] = parts;
    return (
      <li className="mb-2">
        <span className="font-medium text-gray-900">{label.trim()}:</span>
        <span className="text-gray-700 ml-2">{value.trim()}</span>
      </li>
    );
  }
  
  // Handle dash or bullet format
  const cleaned = text.replace(/^[-•]\s*/, '').trim();
  return (
    <li className="mb-2 text-gray-700">{cleaned}</li>
  );
};

/**
 * Main Product Description component
 */
const ProductDescription = ({ description }) => {
  if (!description) return null;

  const parsed = parseProductDescription(description);

  return (
    <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
      {/* Introductory paragraphs */}
      {parsed.intro.length > 0 && (
        <div className="mb-6">
          {parsed.intro.map((para, idx) => (
            <p key={idx} className="mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Sections */}
      {parsed.sections.map((section, sectionIdx) => {
        const processedContent = processSectionContent(section.content, section.type);

        return (
          <div key={sectionIdx} className="mb-8">
            {/* Section Header */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
              {section.title}
            </h2>

            {/* Section Content */}
            {section.type === 'faq' ? (
              // FAQ Accordion
              <div className="space-y-2">
                {processedContent.map((item, itemIdx) => {
                  if (item.type === 'faq') {
                    return (
                      <AccordionItem
                        key={itemIdx}
                        question={item.question}
                        answer={item.answer}
                        index={itemIdx}
                      />
                    );
                  }
                  // Fallback for non-FAQ items in FAQ section
                  return (
                    <p key={itemIdx} className="mb-4 text-gray-700">
                      {item.text}
                    </p>
                  );
                })}
              </div>
            ) : (
              // Regular section content
              <div>
                {(() => {
                  const specItems = processedContent.filter(item => item.type === 'spec');
                  const otherItems = processedContent.filter(item => item.type !== 'spec');
                  
                  return (
                    <>
                      {specItems.length > 0 && (
                        <ul className="list-none space-y-2 mb-4">
                          {specItems.map((item, itemIdx) => (
                            <SpecItem key={itemIdx} text={item.text} />
                          ))}
                        </ul>
                      )}
                      {otherItems.map((item, itemIdx) => (
                        <p key={itemIdx} className="mb-4 last:mb-0 text-gray-700">
                          {item.text}
                        </p>
                      ))}
                      {/* If content wasn't processed into items, render as paragraphs */}
                      {processedContent.length === 0 && section.content.length > 0 && (
                        <div>
                          {(() => {
                            const specLines = section.content.filter(line => 
                              line.includes(':') || /^[-•]\s/.test(line)
                            );
                            const paraLines = section.content.filter(line => 
                              !line.includes(':') && !/^[-•]\s/.test(line)
                            );
                            
                            return (
                              <>
                                {specLines.length > 0 && (
                                  <ul className="list-none space-y-2 mb-4">
                                    {specLines.map((line, lineIdx) => (
                                      <SpecItem key={lineIdx} text={line} />
                                    ))}
                                  </ul>
                                )}
                                {paraLines.map((line, lineIdx) => (
                                  <p key={lineIdx} className="mb-4 last:mb-0 text-gray-700">
                                    {line}
                                  </p>
                                ))}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        );
      })}

      {/* Fallback: if no sections detected, render as plain paragraphs */}
      {parsed.intro.length > 0 && parsed.sections.length === 0 && (
        <div>
          {parsed.intro.map((para, idx) => (
            <p key={idx} className="mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
