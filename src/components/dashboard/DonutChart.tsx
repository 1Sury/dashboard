import { ChartWidgetData } from '@/types/dashboard';

interface DonutChartProps {
  data: ChartWidgetData;
  size?: number;
}

export const DonutChart = ({ data, size = 120 }: DonutChartProps) => {
  const { total, segments } = data;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercentage = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f1f3f4"
            strokeWidth={strokeWidth}
          />
          {segments.map((segment, index) => {
            const percentage = (segment.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
            
            accumulatedPercentage += percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-lg font-bold text-foreground">{total}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
      </div>
      
      <div className="space-y-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-foreground">
              {segment.name} ({segment.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};