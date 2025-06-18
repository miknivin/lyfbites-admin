'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Use react-quill-new which is more compatible with React 18+
const ReactQuillNoSSR = dynamic(
  () => import('react-quill-new'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-gray-500 min-h-[120px] flex items-center justify-center">
        Loading rich text editor...
      </div>
    ),
  }
);

interface QuillWrapperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  modules?: any;
  formats?: string[];
  theme?: string;
}

const QuillWrapper: React.FC<QuillWrapperProps> = ({ 
  value, 
  onChange, 
  placeholder = "",
  style,
  modules,
  formats,
  theme = "snow"
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = useCallback((content: string) => {
    onChange(content);
  }, [onChange]);

  if (!isMounted) {
    return (
      <div className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-gray-500 min-h-[120px] flex items-center justify-center">
        Loading rich text editor...
      </div>
    );
  }

  return (
    <div className="quill-wrapper">
      <ReactQuillNoSSR
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        theme={theme}
        style={style}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillWrapper;
