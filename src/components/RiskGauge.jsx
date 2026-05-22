import React, { useEffect, useState } from 'react';
import { theme } from 'antd';

export const RiskGauge = ({ score = 0, level = 'Low Risk' }) => {
  const { token } = theme.useToken();
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the gauge from 0 to target score
  useEffect(() => {
    setAnimatedScore(0);
    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  // Map score to color
  const getColor = (val) => {
    if (val <= 30) return '#10b981'; // Green
    if (val <= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getGlowColor = (val) => {
    if (val <= 30) return 'rgba(16, 185, 129, 0.2)';
    if (val <= 60) return 'rgba(245, 158, 11, 0.2)';
    return 'rgba(239, 68, 68, 0.2)';
  };

  const strokeColor = getColor(score);
  const glowColor = getGlowColor(score);

  // SVG parameters
  const radius = 80;
  const strokeWidth = 14;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0',
      }}
    >
      <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: strokeWidth,
            left: strokeWidth,
            width: normalizedRadius * 2,
            height: normalizedRadius * 2,
            borderRadius: '50%',
            boxShadow: `0 0 30px ${glowColor}`,
            zIndex: 0,
            transition: 'box-shadow 0.5s ease',
          }}
        />

        <svg
          height={radius * 2}
          width={radius * 2}
          style={{ transform: 'rotate(-90deg)', zIndex: 1, position: 'relative' }}
        >
          {/* Background circle */}
          <circle
            stroke="rgba(255, 255, 255, 0.05)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Animated progress circle */}
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset, 
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease',
              strokeLinecap: 'round'
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Centered Score text */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '42px',
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: token.colorTextDescription,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '4px',
            }}
          >
            Risk Score
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '4px 16px',
          borderRadius: '20px',
          background: glowColor,
          border: `1px solid ${strokeColor}44`,
          color: strokeColor,
          fontWeight: 700,
          fontSize: '15px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          transition: 'all 0.5s ease',
        }}
      >
        {level}
      </div>
    </div>
  );
};

export default RiskGauge;
