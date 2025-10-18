import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSection } from './DashboardSection';
import { AddWidgetModal } from './AddWidgetModal';
import { Widget } from '@/types/dashboard';

// Sample available widgets for each category
const availableWidgets: { [key: string]: Omit<Widget, 'id'>[] } = {
  CSPM: [
    {
      name: 'Widget 1',
      text: 'Sample CSPM widget for cloud security posture management',
      category: 'CSPM'
    },
    {
      name: 'Security Compliance',
      text: 'Monitor compliance across cloud infrastructure',
      category: 'CSPM'
    }
  ],
  CWPP: [
    {
      name: 'Widget 2',
      text: 'Sample CWPP widget for cloud workload protection',
      category: 'CWPP'
    },
    {
      name: 'Runtime Protection',
      text: 'Real-time workload security monitoring',
      category: 'CWPP'
    }
  ],
  Image: [
    {
      name: 'Container Scan',
      text: 'Vulnerability assessment for container images',
      category: 'Image'
    },
    {
      name: 'Registry Analysis',
      text: 'Deep analysis of registry security',
      category: 'Image'
    }
  ],
  Ticket: [
    {
      name: 'Support Tickets',
      text: 'Track and manage security support tickets',
      category: 'Ticket'
    },
    {
      name: 'Incident Response',
      text: 'Monitor security incident response status',
      category: 'Ticket'
    }
  ]
};

const getCategoryFromSectionId = (sectionId: string): string => {
  const mapping: { [key: string]: string } = {
    'cspm': 'CSPM',
    'cwpp': 'CWPP',
    'registry': 'Image',
    'ticket': 'Ticket'
  };
  return mapping[sectionId] || 'CSPM';
};

export const Dashboard = () => {
  const { data, addWidget, removeWidget } = useDashboardStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddWidget = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setIsAddModalOpen(true);
  };

  const handleModalAddWidget = (widget: Omit<Widget, 'id'>) => {
    if (selectedSectionId) {
      addWidget(selectedSectionId, widget);
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedSectionId(null);
  };

  const filteredSections = data.sections.map(section => {
    if (!searchQuery.trim()) {
      return section;
    }

    const query = searchQuery.toLowerCase();
    const filteredWidgets = section.widgets.filter(widget =>
      widget.name.toLowerCase().includes(query) ||
      widget.text.toLowerCase().includes(query) ||
      widget.category.toLowerCase().includes(query)
    );

    return {
      ...section,
      widgets: filteredWidgets
    };
  }).filter(section => section.widgets.length > 0 || !searchQuery.trim());

  const handleHeaderAddWidget = () => {
    setSelectedSectionId('cspm');
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onAddWidget={handleHeaderAddWidget}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="px-6 py-6 space-y-8">
        {filteredSections.map((section) => (
          <DashboardSection
            key={section.id}
            section={section}
            onRemoveWidget={removeWidget}
            onAddWidget={handleAddWidget}
          />
        ))}
        {searchQuery.trim() && filteredSections.every(s => s.widgets.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            No widgets found matching "{searchQuery}"
          </div>
        )}
      </main>

      <AddWidgetModal
        open={isAddModalOpen}
        onClose={handleCloseModal}
        onAddWidget={handleModalAddWidget}
        initialCategory={selectedSectionId ? getCategoryFromSectionId(selectedSectionId) : undefined}
      />
    </div>
  );
};