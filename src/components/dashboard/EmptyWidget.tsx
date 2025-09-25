import { BarChart3 } from 'lucide-react';

export const EmptyWidget = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BarChart3 className="h-12 w-12 text-muted-foreground mb-3" />
      <p className="text-muted-foreground text-sm">No Graph data available!</p>
    </div>
  );
};