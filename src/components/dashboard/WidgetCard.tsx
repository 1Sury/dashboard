import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Widget } from '@/types/dashboard';
import { DonutChart } from './DonutChart';
import { ProgressChart } from './ProgressChart';
import { EmptyWidget } from './EmptyWidget';

interface WidgetCardProps {
  widget?: Widget;
  isAddButton?: boolean;
  onRemove?: (widgetId: string) => void;
  onAdd?: () => void;
}

export const WidgetCard = ({ widget, isAddButton, onRemove, onAdd }: WidgetCardProps) => {
  if (isAddButton) {
    return (
      <Card className="p-6 border-2 border-dashed border-widget-border hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={onAdd}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
          <p className="text-muted-foreground group-hover:text-primary transition-colors font-medium">
            Add Widget
          </p>
        </div>
      </Card>
    );
  }

  if (!widget) return null;

  const renderChart = () => {
    if (!widget.data) {
      return <EmptyWidget />;
    }

    switch (widget.data.type) {
      case 'donut':
        return <DonutChart data={widget.data} />;
      case 'progress':
        return <ProgressChart data={widget.data} />;
      default:
        return <EmptyWidget />;
    }
  };

  return (
    <Card className="p-6 bg-widget-bg border-widget-border relative group">
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemove(widget.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">{widget.name}</h3>
        {renderChart()}
      </div>
    </Card>
  );
};