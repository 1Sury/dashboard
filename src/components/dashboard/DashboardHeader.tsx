import { Search, Plus, MoreVertical, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  onAddWidget: () => void;
}

export const DashboardHeader = ({ onAddWidget }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-widget-border bg-transparent px-6 py-4">
     <div className="flex items-center justify-between bg-white p-4">
  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
    <span>Home</span>
    <span>{'>'}</span>
    <span className="text-foreground font-medium">Dashboard V2</span>
  </div>

  <div className="flex items-center space-x-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search anything..."
        className="w-64 pl-10"
      />
    </div>
  </div>
</div>


<div className="mt-6 flex items-center justify-between bg-gray-100 p-4 rounded">
  <h1 className="text-lg font-semibold text-foreground">CNAPP Dashboard</h1>
  
  <div className="flex items-center space-x-3">
    <Button
      onClick={onAddWidget}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      Add Widget
      <Plus className="h-4 w-4" />
    </Button>
    
    <Button variant="ghost" size="sm">
      <MoreVertical className="h-4 w-4" />
    </Button>
    
    <div className="flex items-center gap-2 text-sm text-primary">
      <div className="h-2 w-2 rounded-full bg-primary" />
      <span>Last 2 days</span>
      <ChevronDown className="h-4 w-4" />
    </div>
  </div>
</div>

    </header>
  );
};