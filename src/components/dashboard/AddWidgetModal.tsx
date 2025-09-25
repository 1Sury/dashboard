import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Widget } from '@/types/dashboard';

interface AddWidgetModalProps {
  open: boolean;
  onClose: () => void;
  onAddWidget: (widget: Omit<Widget, 'id'>) => void;
  availableWidgets: { [key: string]: Omit<Widget, 'id'>[] };
}

export const AddWidgetModal = ({ 
  open, 
  onClose, 
  onAddWidget, 
  availableWidgets 
}: AddWidgetModalProps) => {
  const [selectedWidgets, setSelectedWidgets] = useState<Set<string>>(new Set());
  const [customWidget, setCustomWidget] = useState({
    name: '',
    text: '',
    category: 'CSPM' as const
  });
  const [activeTab, setActiveTab] = useState('CSPM');

  const handleWidgetToggle = (widgetKey: string, widget: Omit<Widget, 'id'>) => {
    const newSelected = new Set(selectedWidgets);
    if (newSelected.has(widgetKey)) {
      newSelected.delete(widgetKey);
    } else {
      newSelected.add(widgetKey);
    }
    setSelectedWidgets(newSelected);
  };

  const handleConfirm = () => {
    // Add selected predefined widgets
    Object.entries(availableWidgets).forEach(([category, widgets]) => {
      widgets.forEach((widget, index) => {
        const widgetKey = `${category}-${index}`;
        if (selectedWidgets.has(widgetKey)) {
          onAddWidget(widget);
        }
      });
    });

    // Add custom widget if name is provided
    if (customWidget.name.trim()) {
      onAddWidget({
        name: customWidget.name,
        text: customWidget.text,
        category: customWidget.category
      });
    }

    // Reset state and close
    setSelectedWidgets(new Set());
    setCustomWidget({ name: '', text: '', category: 'CSPM' });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-primary">Add Widget</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <p className="text-sm text-muted-foreground">
            Personalise your dashboard by adding the following widget
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="CSPM">CSPM</TabsTrigger>
              <TabsTrigger value="CWPP">CWPP</TabsTrigger>
              <TabsTrigger value="Image">Image</TabsTrigger>
              <TabsTrigger value="Ticket">Ticket</TabsTrigger>
            </TabsList>

            {Object.entries(availableWidgets).map(([category, widgets]) => (
              <TabsContent key={category} value={category} className="space-y-3">
                {widgets.map((widget, index) => {
                  const widgetKey = `${category}-${index}`;
                  return (
                    <div key={widgetKey} className="flex items-center space-x-2">
                      <Checkbox
                        id={widgetKey}
                        checked={selectedWidgets.has(widgetKey)}
                        onCheckedChange={() => handleWidgetToggle(widgetKey, widget)}
                      />
                      <label
                        htmlFor={widgetKey}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {widget.name}
                      </label>
                    </div>
                  );
                })}
                
                {widgets.length === 0 && (
                  <p className="text-sm text-muted-foreground">No widgets available in this category</p>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-4">Create Custom Widget</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Widget Name</label>
                <Input
                  value={customWidget.name}
                  onChange={(e) => setCustomWidget(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter widget name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Widget Text</label>
                <Textarea
                  value={customWidget.text}
                  onChange={(e) => setCustomWidget(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter widget description"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleConfirm} className="w-full">
              Confirm
            </Button>
          </div> 
        </div>
      </SheetContent>
    </Sheet>
  );
};