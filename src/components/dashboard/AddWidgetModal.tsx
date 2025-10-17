import { useState, useEffect } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Widget } from '@/types/dashboard';

interface AddWidgetModalProps {
  open: boolean;
  onClose: () => void;
  onAddWidget: (widget: Omit<Widget, 'id'>) => void;
  initialCategory?: string;
}

export const AddWidgetModal = ({
  open,
  onClose,
  onAddWidget,
  initialCategory
}: AddWidgetModalProps) => {
  const [activeTab, setActiveTab] = useState(initialCategory || 'CSPM');
  const [selectedWidgetType, setSelectedWidgetType] = useState<string>('');

  const [cloudAccountsData, setCloudAccountsData] = useState({
    connected: '',
    notConnected: ''
  });

  const [riskAssessmentData, setRiskAssessmentData] = useState({
    failed: '',
    warning: '',
    notAvailable: '',
    passed: ''
  });

  const [imageRiskData, setImageRiskData] = useState({
    critical: '',
    high: '',
    medium: ''
  });

  const [imageSecurityData, setImageSecurityData] = useState({
    critical: '',
    high: '',
    medium: '',
    low: ''
  });

  const [cwppCustomData, setCwppCustomData] = useState({
    title: '',
    message: ''
  });

  useEffect(() => {
    if (initialCategory) {
      setActiveTab(initialCategory);
    }
  }, [initialCategory]);

  const resetForm = () => {
    setSelectedWidgetType('');
    setCloudAccountsData({ connected: '', notConnected: '' });
    setRiskAssessmentData({ failed: '', warning: '', notAvailable: '', passed: '' });
    setImageRiskData({ critical: '', high: '', medium: '' });
    setImageSecurityData({ critical: '', high: '', medium: '', low: '' });
    setCwppCustomData({ title: '', message: '' });
  };

  const handleConfirm = () => {
    let widget: Omit<Widget, 'id'> | null = null;

    if (selectedWidgetType === 'cloud-accounts') {
      const connected = parseInt(cloudAccountsData.connected) || 0;
      const notConnected = parseInt(cloudAccountsData.notConnected) || 0;
      const total = connected + notConnected;

      widget = {
        name: 'Cloud Accounts',
        text: 'Connected and Not Connected accounts overview',
        category: 'CSPM',
        widgetType: 'cloud-accounts',
        data: {
          type: 'donut',
          total,
          segments: [
            { name: 'Connected', value: connected, color: '#4285f4' },
            { name: 'Not Connected', value: notConnected, color: '#e8eaed' }
          ]
        }
      };
    } else if (selectedWidgetType === 'risk-assessment') {
      const failed = parseInt(riskAssessmentData.failed) || 0;
      const warning = parseInt(riskAssessmentData.warning) || 0;
      const notAvailable = parseInt(riskAssessmentData.notAvailable) || 0;
      const passed = parseInt(riskAssessmentData.passed) || 0;
      const total = failed + warning + notAvailable + passed;

      widget = {
        name: 'Cloud Account Risk Assessment',
        text: 'Security risk distribution across cloud accounts',
        category: 'CSPM',
        widgetType: 'risk-assessment',
        data: {
          type: 'donut',
          total,
          segments: [
            { name: 'Failed', value: failed, color: '#ea4335' },
            { name: 'Warning', value: warning, color: '#fbbc04' },
            { name: 'Not available', value: notAvailable, color: '#e8eaed' },
            { name: 'Passed', value: passed, color: '#34a853' }
          ]
        }
      };
    } else if (selectedWidgetType === 'image-risk') {
      const critical = parseInt(imageRiskData.critical) || 0;
      const high = parseInt(imageRiskData.high) || 0;
      const medium = parseInt(imageRiskData.medium) || 0;
      const total = critical + high + medium;

      widget = {
        name: 'Image Risk Assessment',
        text: `${total} Total Vulnerabilities breakdown by severity`,
        category: 'Image',
        widgetType: 'image-risk',
        data: {
          type: 'progress',
          total,
          segments: [
            { name: 'Critical', value: critical, color: '#8B0000' },
            { name: 'High', value: high, color: '#ea4335' },
            { name: 'Medium', value: medium, color: '#fbbc04' }
          ]
        }
      };
    } else if (selectedWidgetType === 'image-security') {
      const critical = parseInt(imageSecurityData.critical) || 0;
      const high = parseInt(imageSecurityData.high) || 0;
      const medium = parseInt(imageSecurityData.medium) || 0;
      const low = parseInt(imageSecurityData.low) || 0;
      const total = critical + high + medium + low;

      widget = {
        name: 'Image Security Issues',
        text: `${total} Total Images security analysis`,
        category: 'Image',
        widgetType: 'image-security',
        data: {
          type: 'progress',
          total,
          segments: [
            { name: 'Critical', value: critical, color: '#8B0000' },
            { name: 'High', value: high, color: '#ea4335' },
            { name: 'Medium', value: medium, color: '#fbbc04' },
            { name: 'Low', value: low, color: '#34a853' }
          ]
        }
      };
    } else if (selectedWidgetType === 'cwpp-custom') {
      widget = {
        name: cwppCustomData.title,
        text: cwppCustomData.message,
        category: 'CWPP',
        widgetType: 'cwpp-custom'
      };
    }

    if (widget) {
      onAddWidget(widget);
      resetForm();
      onClose();
    }
  };

  const renderWidgetForm = () => {
    switch (selectedWidgetType) {
      case 'cloud-accounts':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Cloud Accounts</h4>
            <div>
              <Label htmlFor="connected">Connected</Label>
              <Input
                id="connected"
                type="number"
                min="0"
                value={cloudAccountsData.connected}
                onChange={(e) => setCloudAccountsData(prev => ({ ...prev, connected: e.target.value }))}
                placeholder="Enter number of connected accounts"
              />
            </div>
            <div>
              <Label htmlFor="notConnected">Not Connected</Label>
              <Input
                id="notConnected"
                type="number"
                min="0"
                value={cloudAccountsData.notConnected}
                onChange={(e) => setCloudAccountsData(prev => ({ ...prev, notConnected: e.target.value }))}
                placeholder="Enter number of not connected accounts"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total: {(parseInt(cloudAccountsData.connected) || 0) + (parseInt(cloudAccountsData.notConnected) || 0)}
            </p>
          </div>
        );

      case 'risk-assessment':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Cloud Account Risk Assessment</h4>
            <div>
              <Label htmlFor="failed">Failed</Label>
              <Input
                id="failed"
                type="number"
                min="0"
                value={riskAssessmentData.failed}
                onChange={(e) => setRiskAssessmentData(prev => ({ ...prev, failed: e.target.value }))}
                placeholder="Enter number of failed checks"
              />
            </div>
            <div>
              <Label htmlFor="warning">Warning</Label>
              <Input
                id="warning"
                type="number"
                min="0"
                value={riskAssessmentData.warning}
                onChange={(e) => setRiskAssessmentData(prev => ({ ...prev, warning: e.target.value }))}
                placeholder="Enter number of warnings"
              />
            </div>
            <div>
              <Label htmlFor="notAvailable">Not Available</Label>
              <Input
                id="notAvailable"
                type="number"
                min="0"
                value={riskAssessmentData.notAvailable}
                onChange={(e) => setRiskAssessmentData(prev => ({ ...prev, notAvailable: e.target.value }))}
                placeholder="Enter number of not available"
              />
            </div>
            <div>
              <Label htmlFor="passed">Passed</Label>
              <Input
                id="passed"
                type="number"
                min="0"
                value={riskAssessmentData.passed}
                onChange={(e) => setRiskAssessmentData(prev => ({ ...prev, passed: e.target.value }))}
                placeholder="Enter number of passed checks"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total: {(parseInt(riskAssessmentData.failed) || 0) + (parseInt(riskAssessmentData.warning) || 0) + (parseInt(riskAssessmentData.notAvailable) || 0) + (parseInt(riskAssessmentData.passed) || 0)}
            </p>
          </div>
        );

      case 'image-risk':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Image Risk Assessment</h4>
            <div>
              <Label htmlFor="critical-risk">Critical</Label>
              <Input
                id="critical-risk"
                type="number"
                min="0"
                value={imageRiskData.critical}
                onChange={(e) => setImageRiskData(prev => ({ ...prev, critical: e.target.value }))}
                placeholder="Enter critical vulnerabilities"
              />
            </div>
            <div>
              <Label htmlFor="high-risk">High</Label>
              <Input
                id="high-risk"
                type="number"
                min="0"
                value={imageRiskData.high}
                onChange={(e) => setImageRiskData(prev => ({ ...prev, high: e.target.value }))}
                placeholder="Enter high vulnerabilities"
              />
            </div>
            <div>
              <Label htmlFor="medium-risk">Medium</Label>
              <Input
                id="medium-risk"
                type="number"
                min="0"
                value={imageRiskData.medium}
                onChange={(e) => setImageRiskData(prev => ({ ...prev, medium: e.target.value }))}
                placeholder="Enter medium vulnerabilities"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total Vulnerabilities: {(parseInt(imageRiskData.critical) || 0) + (parseInt(imageRiskData.high) || 0) + (parseInt(imageRiskData.medium) || 0)}
            </p>
          </div>
        );

      case 'image-security':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Image Security Issues</h4>
            <div>
              <Label htmlFor="critical-sec">Critical</Label>
              <Input
                id="critical-sec"
                type="number"
                min="0"
                value={imageSecurityData.critical}
                onChange={(e) => setImageSecurityData(prev => ({ ...prev, critical: e.target.value }))}
                placeholder="Enter critical issues"
              />
            </div>
            <div>
              <Label htmlFor="high-sec">High</Label>
              <Input
                id="high-sec"
                type="number"
                min="0"
                value={imageSecurityData.high}
                onChange={(e) => setImageSecurityData(prev => ({ ...prev, high: e.target.value }))}
                placeholder="Enter high issues"
              />
            </div>
            <div>
              <Label htmlFor="medium-sec">Medium</Label>
              <Input
                id="medium-sec"
                type="number"
                min="0"
                value={imageSecurityData.medium}
                onChange={(e) => setImageSecurityData(prev => ({ ...prev, medium: e.target.value }))}
                placeholder="Enter medium issues"
              />
            </div>
            <div>
              <Label htmlFor="low-sec">Low</Label>
              <Input
                id="low-sec"
                type="number"
                min="0"
                value={imageSecurityData.low}
                onChange={(e) => setImageSecurityData(prev => ({ ...prev, low: e.target.value }))}
                placeholder="Enter low issues"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total Vulnerabilities: {(parseInt(imageSecurityData.critical) || 0) + (parseInt(imageSecurityData.high) || 0) + (parseInt(imageSecurityData.medium) || 0) + (parseInt(imageSecurityData.low) || 0)}
            </p>
          </div>
        );

      case 'cwpp-custom':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">CWPP Widget</h4>
            <div>
              <Label htmlFor="cwpp-title">Widget Title</Label>
              <Input
                id="cwpp-title"
                value={cwppCustomData.title}
                onChange={(e) => setCwppCustomData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter widget title"
              />
            </div>
            <div>
              <Label htmlFor="cwpp-message">Message</Label>
              <Textarea
                id="cwpp-message"
                value={cwppCustomData.message}
                onChange={(e) => setCwppCustomData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter message (e.g., No Graph data available!)"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getWidgetTypeOptions = (category: string) => {
    switch (category) {
      case 'CSPM':
        return [
          { value: 'cloud-accounts', label: 'Cloud Accounts' },
          { value: 'risk-assessment', label: 'Cloud Account Risk Assessment' }
        ];
      case 'Image':
        return [
          { value: 'image-risk', label: 'Image Risk Assessment' },
          { value: 'image-security', label: 'Image Security Issues' }
        ];
      case 'CWPP':
        return [
          { value: 'cwpp-custom', label: 'Custom CWPP Widget' }
        ];
      case 'Ticket':
        return [];
      default:
        return [];
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-primary">Add Widget</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <p className="text-sm text-muted-foreground">
            Personalise your dashboard by adding the following widget
          </p>

          <Tabs value={activeTab} onValueChange={(val) => {
            setActiveTab(val);
            setSelectedWidgetType('');
          }}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="CSPM">CSPM</TabsTrigger>
              <TabsTrigger value="CWPP">CWPP</TabsTrigger>
              <TabsTrigger value="Image">Image</TabsTrigger>
              <TabsTrigger value="Ticket">Ticket</TabsTrigger>
            </TabsList>

            <TabsContent value="CSPM" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Widget Type</Label>
                <RadioGroup value={selectedWidgetType} onValueChange={setSelectedWidgetType}>
                  {getWidgetTypeOptions('CSPM').map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {selectedWidgetType && renderWidgetForm()}
            </TabsContent>

            <TabsContent value="CWPP" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Widget Type</Label>
                <RadioGroup value={selectedWidgetType} onValueChange={setSelectedWidgetType}>
                  {getWidgetTypeOptions('CWPP').map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {selectedWidgetType && renderWidgetForm()}
            </TabsContent>

            <TabsContent value="Image" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Widget Type</Label>
                <RadioGroup value={selectedWidgetType} onValueChange={setSelectedWidgetType}>
                  {getWidgetTypeOptions('Image').map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {selectedWidgetType && renderWidgetForm()}
            </TabsContent>

            <TabsContent value="Ticket" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">No widget types available for this category</p>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleConfirm}
              className="w-full"
              disabled={!selectedWidgetType}
            >
              Confirm
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
