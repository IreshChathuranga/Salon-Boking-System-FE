interface GridPatternProps {
  width?: number;
  height?: number;
  className?: string;
}

export const GridPattern = ({ width = 20, height = 20, className = "" }: GridPatternProps) => (
  <svg className={className} width="100%" height="100%">
    <defs>
      <pattern id="grid" width={width} height={height} patternUnits="userSpaceOnUse">
        <path d={`M ${width} 0 L 0 0 0 ${height}`} fill="none" stroke="#262a30ff" strokeWidth="0.5" />
        <path d={`M 0 0 L ${width} 0 L ${width} ${height}`} fill="none" stroke="#000000ff" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);
