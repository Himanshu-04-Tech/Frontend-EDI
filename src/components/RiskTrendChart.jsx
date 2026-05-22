import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { theme } from 'antd';

export const RiskTrendChart = ({ data = [] }) => {
  const { token } = theme.useToken();

  // Prepare chart data (reverse to show chronological order)
  const chartData = [...data]
    .reverse()
    .map(item => ({
      name: new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
      score: item.riskScore,
      rawDate: new Date(item.timestamp).toLocaleString()
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'rgba(22, 26, 34, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{payload[0].payload.rawDate}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#6366f1' }}>
            Risk Score: {payload[0].value} / 100
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="#64748b" 
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#6366f1" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#scoreColor)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskTrendChart;
