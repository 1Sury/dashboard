import { create } from 'zustand';
import { DashboardData, Widget } from '@/types/dashboard';

const initialData: DashboardData = {
  sections: [
    {
      id: 'cspm',
      title: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected and Not Connected accounts overview',
          category: 'CSPM',
          data: {
            type: 'donut',
            total: 4,
            segments: [
              { name: 'Connected', value: 2, color: '#4285f4' },
              { name: 'Not Connected', value: 2, color: '#e8eaed' }
            ]
          }
        },
        {
          id: 'risk-assessment',
          name: 'Cloud Account Risk Assessment',
          text: 'Security risk distribution across cloud accounts',
          category: 'CSPM',
          data: {
            type: 'donut',
            total: 9659,
            segments: [
              { name: 'Failed', value: 1689, color: '#ea4335' },
              { name: 'Warning', value: 681, color: '#fbbc04' },
              { name: 'Not available', value: 36, color: '#e8eaed' },
              { name: 'Passed', value: 7253, color: '#34a853' }
            ]
          }
        }
      ]
    },
    {
      id: 'cwpp',
      title: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          category: 'CWPP'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          category: 'CWPP'
        }
      ]
    },
    {
      id: 'registry',
      title: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities breakdown by severity',
          category: 'Image',
          data: {
            type: 'progress',
            total: 1470,
            segments: [
              { name: 'Critical', value: 9, color: '#8B0000' },
              { name: 'High', value: 150, color: '#ea4335' }
            ]
          }
        },
        {
          id: 'security-issues',
          name: 'Image Security Issues',
          text: '2 Total Images security analysis',
          category: 'Image',
          data: {
            type: 'progress',
            total: 2,
            segments: [
              { name: 'Critical', value: 2, color: '#8B0000' },
              { name: 'High', value: 2, color: '#ea4335' }
            ]
          }
        }
      ]
    }
  ]
};

interface DashboardStore {
  data: DashboardData;
  addWidget: (sectionId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (sectionId: string, widgetId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  data: initialData,
  addWidget: (sectionId, widget) =>
    set((state) => ({
      data: {
        ...state.data,
        sections: state.data.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                widgets: [
                  ...section.widgets,
                  { ...widget, id: `${Date.now()}-${Math.random()}` }
                ]
              }
            : section
        )
      }
    })),
  removeWidget: (sectionId, widgetId) =>
    set((state) => ({
      data: {
        ...state.data,
        sections: state.data.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                widgets: section.widgets.filter((w) => w.id !== widgetId)
              }
            : section
        )
      }
    }))
}));