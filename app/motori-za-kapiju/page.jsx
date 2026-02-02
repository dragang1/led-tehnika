import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import ProductItem from '@/app/_components/ProductItem'
import Breadcrumbs from '@/app/_components/Breadcrumbs'

const BASE_DOMAIN = 'https://ledtehnika.com'

export async function generateMetadata() {
  const baseDomain = 'https://ledtehnika.com'
  
  try {
    const stranica = await GlobalApi.getStranicaBySlug('motori-za-kapiju')
    
    if (!stranica) {
      return {
        title: 'Motori za kapiju | Led Tehnika',
        description: 'Motori za kapiju i oprema za automatizaciju kliznih i krilnih kapija.',
        alternates: {
          canonical: `${baseDomain}/motori-za-kapiju`,
        },
      }
    }

    // Helper to extract plain text from Rich Text blocks for metadata
    const extractPlainText = (content) => {
      if (!content) return '';
      if (typeof content === 'string') return content;
      if (Array.isArray(content)) {
        return content
          .map(block => {
            if (typeof block === 'string') return block;
            if (block.text) return block.text;
            if (Array.isArray(block.children)) {
              return block.children
                .map(child => child.text || '')
                .join('');
            }
            return '';
          })
          .join(' ');
      }
      if (typeof content === 'object' && content.text) return content.text;
      return '';
    };

    const title = stranica.seoTitle || `${stranica.title} | Led Tehnika`
    const contentText = extractPlainText(stranica.content || stranica.description);
    const description = stranica.seoDescription || (
      contentText 
        ? contentText.slice(0, 160).replace(/\n/g, ' ').trim()
        : `${stranica.title} - Kvalitetni proizvodi na Led Tehnika.`
    )

    const imageUrl = stranica.cover?.url 
      ? (stranica.cover.url.startsWith('http') 
          ? stranica.cover.url 
          : `https://led-backend-62tj.onrender.com${stranica.cover.url}`)
      : 'https://ledtehnika.com/logo-black.png'

    return {
      title,
      description,
      alternates: {
        canonical: `${baseDomain}/motori-za-kapiju`,
      },
      openGraph: {
        title,
        description,
        url: `${baseDomain}/motori-za-kapiju`,
        siteName: 'Led Tehnika',
        type: 'website',
        locale: 'bs_BA',
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${stranica.title} - Led Tehnika`,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    }
  } catch (e) {
    return {
      title: 'Motori za kapiju | Led Tehnika',
      description: 'Motori za kapiju i oprema za automatizaciju kliznih i krilnih kapija.',
      alternates: {
        canonical: `${baseDomain}/motori-za-kapiju`,
      },
    }
  }
}

// Extract text from Rich Text block children (recursive)
const extractTextFromChildren = (children) => {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children
      .map(child => {
        if (typeof child === 'string') return child;
        if (child.text) return child.text;
        if (child.children) return extractTextFromChildren(child.children);
        return '';
      })
      .join('');
  }
  if (typeof children === 'object' && children.text) return children.text;
  return '';
};

// Convert content to plain string (handles Rich Text blocks)
const convertContentToString = (content) => {
  if (!content) return '';
  if (typeof content === 'string') return content;
  
  // Handle Rich Text blocks array
  if (Array.isArray(content)) {
    return content
      .map(block => {
        const text = extractTextFromChildren(block.children);
        if (!text.trim()) return '';
        
        // Add markers based on block type
        switch (block.type) {
          case 'heading':
            const level = block.level || 2;
            if (level === 2) return `[[H2]] ${text}`;
            if (level === 3) return `[[H3]] ${text}`;
            return `[[H2]] ${text}`;
          
          case 'list':
            if (Array.isArray(block.children)) {
              return block.children
                .map(item => {
                  const itemText = extractTextFromChildren(item.children);
                  return `- ${itemText}`;
                })
                .join('\n');
            }
            return text;
          
          case 'paragraph':
            return text;
          
          default:
            return text;
        }
      })
      .filter(line => line.trim())
      .join('\n');
  }
  
  // Handle single object
  if (typeof content === 'object') {
    return extractTextFromChildren(content.children || content);
  }
  
  return String(content);
};

// Render a single Rich Text block
const renderRichTextBlock = (block, index) => {
  if (!block || !block.type) return null;
  
  const text = extractTextFromChildren(block.children);
  if (!text.trim() && block.type !== 'list') return null;
  
  switch (block.type) {
    case 'heading':
      const level = block.level || 2;
      if (level === 2) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">{text}</h2>;
      } else if (level === 3) {
        return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-3">{text}</h3>;
      }
      return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{text}</h2>;
    
    case 'paragraph':
      return <p key={index} className="mb-6 leading-relaxed text-gray-700">{text}</p>;
    
    case 'list':
      const isOrdered = block.format === 'ordered';
      if (Array.isArray(block.children)) {
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered 
          ? 'list-decimal list-inside mb-6 space-y-2 text-gray-700'
          : 'list-disc list-inside mb-6 space-y-2 text-gray-700';
        
        return (
          <ListTag key={index} className={listClass}>
            {block.children.map((item, itemIndex) => {
              const itemText = extractTextFromChildren(item.children);
              return <li key={itemIndex} className="ml-4">{itemText}</li>;
            })}
          </ListTag>
        );
      }
      return <p key={index} className="mb-6 leading-relaxed text-gray-700">{text}</p>;
    
    case 'list-item':
      return <li key={index} className="ml-4 mb-2 text-gray-700">{text}</li>;
    
    default:
      return <p key={index} className="mb-6 leading-relaxed text-gray-700">{text}</p>;
  }
};

// Parse content string with explicit markers
const parseContentWithMarkers = (contentString) => {
  if (!contentString || typeof contentString !== 'string') return [];
  
  const lines = contentString.split('\n');
  const elements = [];
  let inFAQ = false;
  let currentQuestion = null;
  let currentAnswer = [];
  let currentListItems = [];
  let inList = false;
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      // Empty line - close current list if open
      if (inList && currentListItems.length > 0) {
        elements.push({ type: 'ul', items: currentListItems });
        currentListItems = [];
        inList = false;
      }
      return;
    }
    
    // Handle markers
    if (trimmed.startsWith('[[H2]]')) {
      // Close any open structures
      if (inList && currentListItems.length > 0) {
        elements.push({ type: 'ul', items: currentListItems });
        currentListItems = [];
        inList = false;
      }
      if (inFAQ && currentQuestion) {
        elements.push({ type: 'faq-item', question: currentQuestion, answer: currentAnswer.join(' ').trim() });
        currentQuestion = null;
        currentAnswer = [];
      }
      if (inFAQ) {
        inFAQ = false;
      }
      
      const text = trimmed.replace('[[H2]]', '').trim();
      if (text) {
        elements.push({ type: 'h2', content: text });
      }
      return;
    }
    
    if (trimmed.startsWith('[[H3]]')) {
      if (inList && currentListItems.length > 0) {
        elements.push({ type: 'ul', items: currentListItems });
        currentListItems = [];
        inList = false;
      }
      if (inFAQ && currentQuestion) {
        elements.push({ type: 'faq-item', question: currentQuestion, answer: currentAnswer.join(' ').trim() });
        currentQuestion = null;
        currentAnswer = [];
      }
      
      const text = trimmed.replace('[[H3]]', '').trim();
      if (text) {
        elements.push({ type: 'h3', content: text });
      }
      return;
    }
    
    if (trimmed === '[[FAQ]]') {
      if (inList && currentListItems.length > 0) {
        elements.push({ type: 'ul', items: currentListItems });
        currentListItems = [];
        inList = false;
      }
      if (inFAQ && currentQuestion) {
        elements.push({ type: 'faq-item', question: currentQuestion, answer: currentAnswer.join(' ').trim() });
        currentQuestion = null;
        currentAnswer = [];
      }
      
      inFAQ = true;
      return;
    }
    
    if (trimmed === '[[ENDFAQ]]') {
      if (currentQuestion) {
        elements.push({ type: 'faq-item', question: currentQuestion, answer: currentAnswer.join(' ').trim() });
        currentQuestion = null;
        currentAnswer = [];
      }
      inFAQ = false;
      return;
    }
    
    if (trimmed.startsWith('[[Q]]')) {
      if (currentQuestion) {
        elements.push({ type: 'faq-item', question: currentQuestion, answer: currentAnswer.join(' ').trim() });
      }
      const question = trimmed.replace('[[Q]]', '').trim();
      currentQuestion = question;
      currentAnswer = [];
      return;
    }
    
    if (trimmed.startsWith('[[A]]')) {
      if (!inFAQ || !currentQuestion) {
        if (inList && currentListItems.length > 0) {
          elements.push({ type: 'ul', items: currentListItems });
          currentListItems = [];
          inList = false;
        }
        const text = trimmed.replace('[[A]]', '').trim();
        if (text) {
          elements.push({ type: 'paragraph', content: text });
        }
        return;
      }
      const answer = trimmed.replace('[[A]]', '').trim();
      if (answer) {
        currentAnswer.push(answer);
      }
      return;
    }
    
    // Handle bullet lists
    if (trimmed.startsWith('- ')) {
      if (inFAQ && currentQuestion && currentAnswer.length === 0) {
        currentAnswer.push(trimmed);
        return;
      }
      
      if (inList && currentListItems.length > 0 && !trimmed.startsWith('- ')) {
        elements.push({ type: 'ul', items: currentListItems });
        currentListItems = [];
        inList = false;
      }
      
      inList = true;
      const itemText = trimmed.replace(/^-\s*/, '').trim();
      if (itemText) {
        currentListItems.push(itemText);
      }
      return;
    }
    
    // Regular content
    if (inFAQ && currentQuestion) {
      currentAnswer.push(trimmed);
      return;
    }
    
    if (inList && currentListItems.length > 0) {
      elements.push({ type: 'ul', items: currentListItems });
      currentListItems = [];
      inList = false;
    }
    
    elements.push({ type: 'paragraph', content: trimmed });
  });
  
  if (inList && currentListItems.length > 0) {
    elements.push({ type: 'ul', items: currentListItems });
  }
  if (inFAQ && currentQuestion) {
    elements.push({ type: 'faq-item', question: currentQuestion, answer: currentAnswer.join(' ').trim() });
  }
  
  return elements;
};

// Render parsed elements
const renderParsedElements = (elements) => {
  const rendered = [];
  let faqGroup = [];
  
  elements.forEach((element, index) => {
    switch (element.type) {
      case 'h2':
        if (faqGroup.length > 0) {
          rendered.push(
            <div key={`faq-group-${index}`} className="mt-8 space-y-4">
              {faqGroup.map((faq, faqIdx) => (
                <details
                  key={faqIdx}
                  className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none">
                    <span className="flex items-center justify-between">
                      <span>{faq.question}</span>
                      <svg
                        className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-200">
                    {faq.answer.split('\n').map((para, pIdx) => (
                      <p key={pIdx} className="mb-3 last:mb-0">{para.trim()}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          );
          faqGroup = [];
        }
        rendered.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">
            {element.content}
          </h2>
        );
        break;
      
      case 'h3':
        if (faqGroup.length > 0) {
          rendered.push(
            <div key={`faq-group-${index}`} className="mt-8 space-y-4">
              {faqGroup.map((faq, faqIdx) => (
                <details
                  key={faqIdx}
                  className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none">
                    <span className="flex items-center justify-between">
                      <span>{faq.question}</span>
                      <svg
                        className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-200">
                    {faq.answer.split('\n').map((para, pIdx) => (
                      <p key={pIdx} className="mb-3 last:mb-0">{para.trim()}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          );
          faqGroup = [];
        }
        rendered.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            {element.content}
          </h3>
        );
        break;
      
      case 'paragraph':
        rendered.push(
          <p key={`p-${index}`} className="mb-6 leading-relaxed text-gray-700">
            {element.content}
          </p>
        );
        break;
      
      case 'ul':
        rendered.push(
          <ul key={`ul-${index}`} className="list-disc list-inside mb-6 space-y-2 text-gray-700">
            {element.items.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-4">{item}</li>
            ))}
          </ul>
        );
        break;
      
      case 'faq-item':
        faqGroup.push({ question: element.question, answer: element.answer });
        break;
    }
  });
  
  if (faqGroup.length > 0) {
    rendered.push(
      <div key="faq-group-final" className="mt-8 space-y-4">
        {faqGroup.map((faq, faqIdx) => (
          <details
            key={faqIdx}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none">
              <span className="flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-200">
              {faq.answer.split('\n').map((para, pIdx) => (
                <p key={pIdx} className="mb-3 last:mb-0">{para.trim()}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    );
  }
  
  return rendered;
};

// Extract key points for Sažetak box
const extractKeyPoints = (content) => {
  const points = [];
  const rawContent = content;
  
  if (!rawContent) return points;
  
  // Extract from string content
  if (typeof rawContent === 'string') {
    const lines = rawContent.split('\n').filter(l => l.trim());
    lines.forEach(line => {
      const trimmed = line.trim();
      // Look for bullet points or key phrases
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
        points.push(trimmed.replace(/^[-•*]\s*/, ''));
      } else if (
        trimmed.toLowerCase().includes('tip kapije') ||
        trimmed.toLowerCase().includes('težina') ||
        trimmed.toLowerCase().includes('sigurnost') ||
        trimmed.toLowerCase().includes('upravljanje') ||
        trimmed.toLowerCase().includes('snaga')
      ) {
        if (trimmed.length < 100) {
          points.push(trimmed);
        }
      }
    });
  }
  
  // Extract from Rich Text blocks
  if (Array.isArray(rawContent)) {
    rawContent.forEach(block => {
      if (block.type === 'list-item' || block.type === 'bulleted-list') {
        const text = extractTextFromChildren(block.children);
        if (text && text.length < 100) {
          points.push(text);
        }
      }
    });
  }
  
  return points.slice(0, 5); // Max 5 points
};

// Render Rich Text blocks with FAQ accordion logic
const renderRichTextBlocks = (blocks) => {
  if (!Array.isArray(blocks)) return null;
  
  const renderedElements = [];
  let faqItems = [];
  let inFAQ = false;
  let currentQuestion = null;
  let currentAnswerBlocks = [];
  
  blocks.forEach((block, index) => {
    const text = extractTextFromChildren(block.children);
    
    // Detect FAQ section start: H2 with "Često postavljena pitanja"
    if (block.type === 'heading' && block.level === 2) {
      const headingText = text.toLowerCase();
      if (headingText.includes('često postavljena pitanja') ||
          headingText.includes('faq') ||
          headingText.includes('pitanja i odgovori')) {
        // Save any previous FAQ items
        if (faqItems.length > 0) {
          renderedElements.push({ type: 'faq-group', items: faqItems });
          faqItems = [];
        }
        // Render the FAQ heading
        renderedElements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">
            {text}
          </h2>
        );
        inFAQ = true;
        currentQuestion = null;
        currentAnswerBlocks = [];
        return;
      }
      
      // New H2 ends FAQ section
      if (inFAQ) {
        // Save last FAQ item
        if (currentQuestion && currentAnswerBlocks.length > 0) {
          faqItems.push({ question: currentQuestion, answerBlocks: [...currentAnswerBlocks] });
        } else if (currentQuestion) {
          faqItems.push({ question: currentQuestion, answerBlocks: [] });
        }
        // Render FAQ group
        if (faqItems.length > 0) {
          renderedElements.push({ type: 'faq-group', items: faqItems });
          faqItems = [];
        }
        inFAQ = false;
        currentQuestion = null;
        currentAnswerBlocks = [];
      }
    }
    
    // If we're in FAQ section
    if (inFAQ) {
      // H3 becomes a question (accordion summary)
      if (block.type === 'heading' && block.level === 3) {
        // Save previous Q&A if exists
        if (currentQuestion && currentAnswerBlocks.length > 0) {
          faqItems.push({ question: currentQuestion, answerBlocks: [...currentAnswerBlocks] });
        } else if (currentQuestion) {
          faqItems.push({ question: currentQuestion, answerBlocks: [] });
        }
        // Start new question
        currentQuestion = text.trim();
        currentAnswerBlocks = [];
        return;
      }
      
      // Paragraphs and lists after H3 become answer content
      if (currentQuestion && (block.type === 'paragraph' || block.type === 'list')) {
        currentAnswerBlocks.push(block);
        return;
      }
      
      // If we encounter something else while in FAQ mode (like another H3 or H2), save current FAQ item
      if (currentQuestion && block.type !== 'paragraph' && block.type !== 'list') {
        if (currentAnswerBlocks.length > 0) {
          const answerBlocks = currentAnswerBlocks;
          faqItems.push({ question: currentQuestion, answerBlocks });
        } else {
          faqItems.push({ question: currentQuestion, answerBlocks: [] });
        }
        currentQuestion = null;
        currentAnswerBlocks = [];
        
        // If it's a new H3, start new question
        if (block.type === 'heading' && block.level === 3) {
          currentQuestion = text.trim();
          return;
        }
      }
    }
    
    // Regular content rendering (not in FAQ or not collecting answer)
    if (!inFAQ || !currentQuestion) {
      const rendered = renderRichTextBlock(block, index);
      if (rendered) {
        renderedElements.push(rendered);
      }
    }
  });
  
  // Handle remaining FAQ items at the end
  if (inFAQ && currentQuestion) {
    if (currentAnswerBlocks.length > 0) {
      faqItems.push({ question: currentQuestion, answerBlocks: [...currentAnswerBlocks] });
    } else {
      faqItems.push({ question: currentQuestion, answerBlocks: [] });
    }
  }
  if (faqItems.length > 0) {
    renderedElements.push({ type: 'faq-group', items: faqItems });
  }
  
  // Render all elements
  return renderedElements.map((element, idx) => {
    if (element && element.type === 'faq-group') {
      return (
        <div key={`faq-${idx}`} className="mt-8 space-y-4">
          {element.items.map((faq, faqIndex) => (
            <details
              key={faqIndex}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none">
                <span className="flex items-center justify-between">
                  <span>{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-200">
                {faq.answerBlocks && faq.answerBlocks.length > 0 ? (
                  faq.answerBlocks.map((answerBlock, blockIdx) => {
                    if (answerBlock.type === 'paragraph') {
                      const text = extractTextFromChildren(answerBlock.children);
                      return <p key={blockIdx} className="mb-3 last:mb-0">{text}</p>;
                    } else if (answerBlock.type === 'list') {
                      const isOrdered = answerBlock.format === 'ordered';
                      const ListTag = isOrdered ? 'ol' : 'ul';
                      const listClass = isOrdered 
                        ? 'list-decimal list-inside mb-3 space-y-1 text-gray-700'
                        : 'list-disc list-inside mb-3 space-y-1 text-gray-700';
                      
                      if (Array.isArray(answerBlock.children)) {
                        return (
                          <ListTag key={blockIdx} className={listClass}>
                            {answerBlock.children.map((item, itemIdx) => {
                              const itemText = extractTextFromChildren(item.children);
                              return <li key={itemIdx} className="ml-4">{itemText}</li>;
                            })}
                          </ListTag>
                        );
                      }
                      return null;
                    }
                    return null;
                  })
                ) : (
                  <p className="mb-3">Odgovor nije dostupan.</p>
                )}
              </div>
            </details>
          ))}
        </div>
      );
    }
    // Regular React element
    return element;
  });
};

// Parse plain string content into structured elements
const parseStringContent = (content) => {
  if (!content || typeof content !== 'string') return [];
  
  const lines = content.split('\n').filter(l => l.trim());
  const elements = [];
  let currentParagraph = '';
  let inList = false;
  let listItems = [];
  let inFAQ = false;
  let faqItems = [];
  let currentQuestion = '';
  let currentAnswer = '';
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Detect FAQ section
    if (trimmed.toLowerCase().includes('često postavljena pitanja') || 
        trimmed.toLowerCase().includes('faq') ||
        trimmed.toLowerCase().includes('pitanja i odgovori')) {
      if (currentParagraph) {
        elements.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      if (inList) {
        elements.push({ type: 'ul', items: listItems });
        listItems = [];
        inList = false;
      }
      elements.push({ type: 'h2', content: trimmed });
      inFAQ = true;
      return;
    }
    
    // Detect headings
    if (trimmed.includes('–') || 
        trimmed.toLowerCase().includes('kako izabrati') ||
        trimmed.toLowerCase().endsWith('kapija') ||
        trimmed.toLowerCase().endsWith('kapiju')) {
      // Check if it looks like a title (short, no period, capitalized)
      if (trimmed.length < 80 && !trimmed.endsWith('.') && trimmed.length > 5) {
        if (currentParagraph) {
          elements.push({ type: 'paragraph', content: currentParagraph });
          currentParagraph = '';
        }
        if (inList) {
          elements.push({ type: 'ul', items: listItems });
          listItems = [];
          inList = false;
        }
        if (inFAQ && faqItems.length > 0) {
          elements.push({ type: 'faq-group', items: faqItems });
          faqItems = [];
          inFAQ = false;
        }
        elements.push({ type: 'h2', content: trimmed });
        return;
      }
    }
    
    // Detect list items
    if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
      if (currentParagraph) {
        elements.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      if (inFAQ && currentQuestion) {
        // End current FAQ item
        if (currentAnswer) {
          faqItems.push({ question: currentQuestion, answer: currentAnswer });
          currentQuestion = '';
          currentAnswer = '';
        }
      }
      inList = true;
      listItems.push(trimmed.replace(/^[-•*]\s*/, ''));
      return;
    }
    
    // FAQ Q/A detection
    if (inFAQ) {
      if (trimmed.endsWith('?') && trimmed.length < 100) {
        if (currentQuestion && currentAnswer) {
          faqItems.push({ question: currentQuestion, answer: currentAnswer });
        }
        currentQuestion = trimmed;
        currentAnswer = '';
        return;
      } else if (currentQuestion) {
        currentAnswer += (currentAnswer ? ' ' : '') + trimmed;
        return;
      }
    }
    
    // Regular paragraph
    if (trimmed) {
      if (inList) {
        elements.push({ type: 'ul', items: listItems });
        listItems = [];
        inList = false;
      }
      if (inFAQ && currentQuestion && !currentAnswer) {
        // Question without answer yet, treat as paragraph
        if (currentQuestion) {
          faqItems.push({ question: currentQuestion, answer: '' });
          currentQuestion = '';
        }
        inFAQ = false;
      }
      currentParagraph += (currentParagraph ? ' ' : '') + trimmed;
    } else {
      // Empty line - end current paragraph
      if (currentParagraph) {
        elements.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      if (inList) {
        elements.push({ type: 'ul', items: listItems });
        listItems = [];
        inList = false;
      }
    }
  });
  
  // Add remaining content
  if (currentParagraph) {
    elements.push({ type: 'paragraph', content: currentParagraph });
  }
  if (inList && listItems.length > 0) {
    elements.push({ type: 'ul', items: listItems });
  }
  if (inFAQ) {
    if (currentQuestion && currentAnswer) {
      faqItems.push({ question: currentQuestion, answer: currentAnswer });
    }
    if (faqItems.length > 0) {
      elements.push({ type: 'faq-group', items: faqItems });
    }
  }
  
  return elements;
};

// Render parsed string content
const renderStringContent = (elements) => {
  return elements.map((element, index) => {
    switch (element.type) {
      case 'h2':
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">{element.content}</h2>;
      case 'h3':
        return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-3">{element.content}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-6 leading-relaxed text-gray-700">{element.content}</p>;
      case 'ul':
        return (
          <ul key={index} className="list-disc list-inside mb-6 space-y-2 text-gray-700">
            {element.items.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-4">{item}</li>
            ))}
          </ul>
        );
      case 'faq-group':
        return (
          <div key={index} className="mt-8 space-y-4">
            {element.items.map((faq, faqIndex) => (
              <details
                key={faqIndex}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none">
                  <span className="flex items-center justify-between">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-200">
                  {faq.answer || 'Odgovor nije dostupan.'}
                </p>
              </details>
            ))}
          </div>
        );
      case 'faq-question':
        return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-2">{element.content}</h3>;
      case 'faq-answer':
        return <p key={index} className="mb-6 leading-relaxed text-gray-700 pl-4 border-l-4 border-blue-200">{element.content}</p>;
      default:
        return null;
    }
  });
};

export default async function Page() {
  const stranica = await GlobalApi.getStranicaBySlug('motori-za-kapiju')
  
  // Fetch main product
  const mainProduct = await GlobalApi.getProductBySlug('motor-za-kapiju-set')

  if (!stranica) {
    return (
      <div className='px-4 md:px-8 lg:px-16 max-w-5xl mx-auto py-10'>
        <h1 className='text-primary font-bold text-2xl mt-5 text-center'>
          Stranica nije pronađena
        </h1>
        <p className="text-center text-gray-500 text-lg mt-5">
          Tražena stranica ne postoji.
        </p>
      </div>
    )
  }

  const rawContent = stranica.content || stranica.description;
  const isRichText = Array.isArray(rawContent);
  const keyPoints = extractKeyPoints(rawContent);
  
  // Get subtitle from seoDescription or first sentence of content
  const getSubtitle = () => {
    if (stranica.seoDescription) {
      return stranica.seoDescription.split('.')[0] + '.';
    }
    if (rawContent) {
      if (typeof rawContent === 'string') {
        const firstSentence = rawContent.split('.')[0];
        if (firstSentence && firstSentence.length > 20 && firstSentence.length < 200) {
          return firstSentence + '.';
        }
      } else if (Array.isArray(rawContent) && rawContent.length > 0) {
        const firstBlock = rawContent[0];
        const text = extractTextFromChildren(firstBlock.children);
        if (text) {
          const firstSentence = text.split('.')[0];
          if (firstSentence && firstSentence.length > 20 && firstSentence.length < 200) {
            return firstSentence + '.';
          }
        }
      }
    }
    return 'Kompletan vodič za izbor i instalaciju motora za kapiju.';
  };

  const subtitle = getSubtitle();
  const coverUrl = stranica.cover?.url 
    ? (stranica.cover.url.startsWith('http') 
        ? stranica.cover.url 
        : `https://led-backend-62tj.onrender.com${stranica.cover.url}`)
    : null

  const pageTitle = stranica?.title || 'Motori za kapiju'
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: BASE_DOMAIN },
      { '@type': 'ListItem', position: 2, name: pageTitle, item: `${BASE_DOMAIN}/motori-za-kapiju` },
    ],
  }
  const breadcrumbItems = [{ label: pageTitle, href: '#' }]

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className='px-4 md:px-8 lg:px-16 max-w-5xl mx-auto py-10'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          {stranica.title}
        </h1>
        <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
          {subtitle}
        </p>
        
        {/* CTA Button */}
        <div className='flex justify-center items-center'>
          <Link
            href="/kategorije/automatizacija"
            className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl'
          >
            <span>Pogledaj proizvode</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Cover Image */}
      {coverUrl && (
        <div className='mb-10 rounded-2xl overflow-hidden shadow-xl'>
          <Image
            src={coverUrl}
            alt={stranica.title}
            width={1200}
            height={630}
            className='w-full h-auto object-cover'
            priority
          />
        </div>
      )}

      {/* Sažetak Box */}
      {keyPoints.length > 0 && (
        <div className='mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Sažetak</h2>
          <ul className='space-y-2 text-gray-700'>
            {keyPoints.map((point, index) => (
              <li key={index} className='flex items-start gap-2'>
                <span className='text-blue-600 mt-1'>•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content Section */}
      <article className='prose prose-lg max-w-none mt-10'>
        {isRichText ? (
          renderRichTextBlocks(rawContent)
        ) : (
          typeof rawContent === 'string' ? (
            <div className="text-gray-700">
              {rawContent.split('\n\n').map((para, idx) => (
                <p key={idx} className="mb-6 leading-relaxed">{para.trim()}</p>
              ))}
            </div>
          ) : null
        )}
      </article>

      {/* Main Product Section */}
      {mainProduct && (
        <section className='mt-12 mb-8'>
          <div className='max-w-md mx-auto'>
            <ProductItem product={mainProduct} />
          </div>
        </section>
      )}

      {/* Link to products */}
      <div className='mt-10 text-center'>
        <Link
          href="/kategorije/automatizacija"
          className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors'
        >
          <span>Pogledaj sve proizvode</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
    </>
  )
}
