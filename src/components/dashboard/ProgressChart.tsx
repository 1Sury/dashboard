import { ChartWidgetData } from '@/types/dashboard';

interface ProgressChartProps {
  data: ChartWidgetData;
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  const { total, segments } = data;
  
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">
        {total} Total Vulnerabilities
      </div>
      
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="flex h-full">
          {segments.map((segment, index) => {
            const width = (segment.value / total) * 100;
            return (
              <div
                key={index}
                className="h-full transition-all duration-500"
                style={{
                  width: `${width}%`,
                  backgroundColor: segment.color
                }}
              />
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 text-sm">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
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