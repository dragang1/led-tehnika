/**
 * Parses plain text product description into structured sections
 * for better readability and SEO.
 */

// Section header keywords (case-insensitive)
const SECTION_KEYWORDS = [
  'tehničke specifikacije',
  'specifikacije',
  'prednosti',
  'preporučena upotreba',
  'upotreba',
  'dimenzije',
  'varijante',
  'često postavljena pitanja',
  'faq',
  'pitanja i odgovori',
  'karakteristike',
  'osobine',
  'napomena',
  'dodatne informacije'
];

// FAQ question indicators
const FAQ_INDICATORS = ['?', 'pitanje', 'odgovor'];

/**
 * Checks if a line is a section header
 */
function isSectionHeader(line) {
  const trimmed = line.trim();
  const upperTrimmed = trimmed.toUpperCase();
  
  // Must be reasonably short and contain a section keyword
  if (trimmed.length > 100) return false;
  
  // Check for exact or partial match with section keywords
  const hasKeyword = SECTION_KEYWORDS.some(keyword => {
    const upperKeyword = keyword.toUpperCase();
    // Check if line starts with keyword or contains it as a major part
    return upperTrimmed.includes(upperKeyword) && 
           (upperTrimmed.startsWith(upperKeyword) || 
            upperTrimmed.indexOf(upperKeyword) < 20);
  });
  
  // Also check if it's all caps (common for headers)
  const isAllCaps = trimmed === upperTrimmed && trimmed.length > 5;
  
  return hasKeyword || (isAllCaps && trimmed.length < 50);
}

/**
 * Checks if a line looks like a specification (contains colon or dash)
 */
function isSpecification(line) {
  const trimmed = line.trim();
  return trimmed.includes(':') || 
         (trimmed.includes('-') && trimmed.length < 150) ||
         /^\s*[-•]\s/.test(trimmed);
}

/**
 * Checks if a line looks like a FAQ question
 */
function isFAQQuestion(line) {
  const trimmed = line.trim();
  // Must end with question mark or be short and contain question keywords
  return (trimmed.endsWith('?') && trimmed.length < 200) || 
         (trimmed.length < 150 && trimmed.length > 10 && 
          (trimmed.toLowerCase().includes('šta') || 
           trimmed.toLowerCase().includes('što') ||
           trimmed.toLowerCase().includes('kako') ||
           trimmed.toLowerCase().includes('zašto') ||
           trimmed.toLowerCase().includes('da li') ||
           trimmed.toLowerCase().includes('koliko')));
}

/**
 * Extracts section title from header line
 */
function extractSectionTitle(line) {
  return line.trim();
}

/**
 * Parses description text into structured sections
 */
export function parseProductDescription(description) {
  if (!description || typeof description !== 'string') {
    return { intro: [], sections: [] };
  }

  const lines = description.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const result = {
    intro: [],
    sections: []
  };

  let currentSection = null;
  let introComplete = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a section header
    if (isSectionHeader(line)) {
      introComplete = true;
      
      // Save previous section if exists
      if (currentSection) {
        result.sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        title: extractSectionTitle(line),
        type: line.toLowerCase().includes('pitanja') || line.toLowerCase().includes('faq') 
          ? 'faq' 
          : 'regular',
        content: []
      };
      continue;
    }

    // If we haven't found a section yet, add to intro
    if (!introComplete) {
      result.intro.push(line);
      continue;
    }

    // Add content to current section
    if (currentSection) {
      currentSection.content.push(line);
    } else {
      // Fallback: if we have sections but no current section, add to last section
      if (result.sections.length > 0) {
        result.sections[result.sections.length - 1].content.push(line);
      } else {
        // Or add to intro if no sections yet
        result.intro.push(line);
      }
    }
  }

  // Save last section
  if (currentSection) {
    result.sections.push(currentSection);
  }

  return result;
}

/**
 * Processes section content into structured items
 */
export function processSectionContent(content, sectionType) {
  if (!Array.isArray(content) || content.length === 0) {
    return [];
  }

  const items = [];
  let currentItem = null;
  let faqQuestion = null;
  let faqAnswer = [];

  for (let i = 0; i < content.length; i++) {
    const line = content[i];

    if (sectionType === 'faq') {
      // FAQ processing
      if (isFAQQuestion(line)) {
        // Save previous FAQ item
        if (faqQuestion) {
          items.push({
            type: 'faq',
            question: faqQuestion,
            answer: faqAnswer.join('\n').trim() || 'Nema dodatnih informacija.'
          });
        }
        // Start new FAQ
        faqQuestion = line.replace(/^\s*[-•]\s*/, '').trim(); // Remove leading bullets
        faqAnswer = [];
      } else if (faqQuestion) {
        // Add to answer (skip empty lines at start)
        if (line.trim() || faqAnswer.length > 0) {
          faqAnswer.push(line);
        }
      } else {
        // First line without question - treat as regular content
        items.push({ type: 'paragraph', text: line });
      }
    } else {
      // Regular section processing
      if (isSpecification(line)) {
        // Save previous item if exists
        if (currentItem) {
          items.push(currentItem);
        }
        // Start new spec item
        currentItem = {
          type: 'spec',
          text: line
        };
      } else if (currentItem) {
        // Continue current spec item
        currentItem.text += ' ' + line;
      } else {
        // Regular paragraph
        if (items.length > 0 && items[items.length - 1].type === 'paragraph') {
          // Append to last paragraph
          items[items.length - 1].text += ' ' + line;
        } else {
          // New paragraph
          items.push({
            type: 'paragraph',
            text: line
          });
        }
      }
    }
  }

  // Save last items
  if (sectionType === 'faq' && faqQuestion) {
    items.push({
      type: 'faq',
      question: faqQuestion,
      answer: faqAnswer.join('\n').trim() || 'Nema dodatnih informacija.'
    });
  } else if (currentItem) {
    items.push(currentItem);
  }

  return items;
}
