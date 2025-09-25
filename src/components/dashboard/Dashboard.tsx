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

export const Dashboard = () => {
  const { data, addWidget, removeWidget } = useDashboardStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onAddWidget={() => setIsAddModalOpen(true)} />
      
      <main className="px-6 py-6 space-y-8">
        {data.sections.map((section) => (
          <DashboardSection
            key={section.id}
            section={section}
            onRemoveWidget={removeWidget}
            onAddWidget={handleAddWidget}
          />
        ))}
      </main>

      <AddWidgetModal
        open={isAddModalOpen}
        onClose={handleCloseModal}
        onAddWidget={handleModalAddWidget}
        availableWidgets={availableWidgets}
      />
    </div>
  );
};