import { DashboardSection as DashboardSectionType } from '@/types/dashboard';
import { WidgetCard } from './WidgetCard';

interface DashboardSectionProps {
  section: DashboardSectionType;
  onRemoveWidget: (sectionId: string, widgetId: string) => void;
  onAddWidget: (sectionId: string) => void;
}

export const DashboardSection = ({ 
  section, 
  onRemoveWidget, 
  onAddWidget 
}: DashboardSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">
        {section.title}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {section.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={(widgetId) => onRemoveWidget(section.id, widgetId)}
          />
        ))}
        
        <WidgetCard
          isAddButton
          onAdd={() => onAddWidget(section.id)}
        />
      </div>
    </div>
  );
};