export interface Widget {
  id: string;
  name: string;
  text: string;
  category: 'CSPM' | 'CWPP' | 'Image' | 'Ticket';
  data?: ChartWidgetData;
}

export interface DashboardSection {
  id: string;
  title: string;
  widgets: Widget[];
}

export interface DashboardData {
  sections: DashboardSection[];
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface ChartWidgetData {
  type: 'donut' | 'progress';
  total: number;
  segments: ChartData[];
}