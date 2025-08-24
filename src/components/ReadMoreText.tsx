import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ReadMoreText = ({ text, maxLength = 150, className = '' }: ReadMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  const truncatedText = text.slice(0, maxLength).trim() + '...';

  return (
    <div className={className}>
      <p className="mb-3">
        {isExpanded ? text : truncatedText}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors">

        {isExpanded ?
        <>
            Show Less <ChevronUp className="h-3 w-3 ml-1" />
          </> :

        <>
            Read More <ChevronDown className="h-3 w-3 ml-1" />
          </>
        }
      </Button>
    </div>);

};

export default ReadMoreText;