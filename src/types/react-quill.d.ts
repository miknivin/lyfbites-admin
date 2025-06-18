declare module 'react-quill-new' {
  import { Component } from 'react';

  interface ReactQuillProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    theme?: string;
    modules?: any;
    formats?: string[];
    style?: React.CSSProperties;
    className?: string;
    readOnly?: boolean;
    bounds?: string | HTMLElement;
    preserveWhitespace?: boolean;
  }

  class ReactQuill extends Component<ReactQuillProps> {}
  export default ReactQuill;
  
  export interface Quill {
    getModule(name: string): any;
    getSelection(focus?: boolean): any;
    setSelection(range: any, source?: string): void;
    getText(index?: number, length?: number): string;
    getLength(): number;
    insertText(index: number, text: string, source?: string): void;
    insertEmbed(index: number, type: string, value: any, source?: string): void;
    deleteText(index: number, length: number, source?: string): void;
    formatText(index: number, length: number, format: string, value: any, source?: string): void;
    getFormat(index?: number, length?: number): any;
    removeFormat(index: number, length: number, source?: string): void;
    blur(): void;
    focus(): void;
    update(source?: string): void;
    scrollIntoView(): void;
  }
}
