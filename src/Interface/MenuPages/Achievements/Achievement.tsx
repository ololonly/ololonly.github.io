import React from "react";

const AchievementLevel: React.FC<{ level: number; maxLevel: number }> = ({
  level,
  maxLevel,
}) => {
  const blocks = Array(maxLevel)
    .fill(null)
    .map((el, index) => {
      const style = {
        animationDelay: `${500 + 400 * index}ms`,
      } as React.CSSProperties;
      return (
        <div key={index} className="achievement-level-bar">
          {index + 1 <= level ? (
            <div className="achievement-level-bar__filler" style={style}></div>
          ) : (
            <></>
          )}
        </div>
      );
    });

  return <>{blocks}</>;
};

const Achievement: React.FC<{
  name: string;
  logo: string;
  level: number;
  maxLevel: number;
}> = ({ name, logo, level, maxLevel }) => {
  return (
    <div className="achievement-container">
      <div className="achievement-title">{name}</div>
      <div className="achievement-logo">
        <img src={logo} alt="" />
      </div>
      <div className="achievement-level">
        <AchievementLevel level={level} maxLevel={maxLevel} />
      </div>
    </div>
  );
};

export default Achievement;
