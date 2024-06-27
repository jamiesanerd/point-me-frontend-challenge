import React, { useCallback } from 'react';
import Star from './Star';

const STAR_SCALE = [1, 2, 3, 4, 5];

interface StarScale extends React.HTMLAttributes<HTMLDivElement> {
  value: number | null;
  onValueChange?: (value: number) => void;
  display?: boolean;
}

// A component that displays a rating scale of stars that can be used as a form component
// Both mouse and keyboard interactions are supported
const StarScale: React.FC<StarScale> = ({
  value,
  onValueChange,
  display,
  ...props
}) => {
  const [hoveredStar, setHoveredStar] = React.useState<number | null>(null);

  const handleStarHover = (starId: number) => {
    setHoveredStar(starId);
  };

  const handleStarLeave = () => {
    setHoveredStar(null);
  };

  const handleStarClick = (starId: number) => {
    if (onValueChange) {
      onValueChange(starId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, starId: number) => {
    if (e.target === e.currentTarget && e.key === 'Enter') {
      handleStarClick(starId);
      e.currentTarget.blur()
    }
  };

  return (
    <div aria-label="star rating" {...props}>
      {STAR_SCALE.map(starId => (
        <Star
          key={starId}
          tabIndex={display ? -1 : 0}
          starId={starId}
          hovered={hoveredStar !== null && hoveredStar >= starId}
          marked={
            hoveredStar === null &&
            value !== null &&
            value >= starId
          }
          // TODO: make this cleaner with less repeated code
          onMouseEnter={display ? undefined : () => handleStarHover(starId)}
          onMouseLeave={display ? undefined : handleStarLeave}
          onClick={display ? undefined : () => handleStarClick(starId)}
          onKeyDown={display ? undefined : (e) => handleKeyDown(e as React.KeyboardEvent<HTMLDivElement>, starId)}
        />
      ))}
    </div>
  );
};

export default StarScale;
