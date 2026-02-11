import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabList, Tab, TabPanel } from "@/components/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "pill"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tab size",
    },
    defaultValue: {
      control: "text",
      description: "Default active tab (uncontrolled)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default (underline variant)
export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" {...args}>
      <TabList>
        <Tab value="tab1">Account</Tab>
        <Tab value="tab2">Password</Tab>
        <Tab value="tab3">Settings</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p className="text-gray-600">Manage your account details and preferences.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p className="text-gray-600">Update your password and security settings.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p className="text-gray-600">Configure application settings and notifications.</p>
      </TabPanel>
    </Tabs>
  ),
};

// Underline variant
export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="underline">
      <TabList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Analytics</Tab>
        <Tab value="tab3">Reports</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p className="text-gray-600">Overview content goes here.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p className="text-gray-600">Analytics data and charts.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p className="text-gray-600">Generated reports and exports.</p>
      </TabPanel>
    </Tabs>
  ),
};

// Pill variant
export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="pill">
      <TabList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Analytics</Tab>
        <Tab value="tab3">Reports</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p className="text-gray-600">Overview content with pill style tabs.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p className="text-gray-600">Analytics data with pill style tabs.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p className="text-gray-600">Reports section with pill style tabs.</p>
      </TabPanel>
    </Tabs>
  ),
};

// Small size
export const Small: Story = {
  render: () => (
    <Tabs defaultValue="tab1" size="sm">
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p className="text-gray-600 text-sm">Small tab content.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p className="text-gray-600 text-sm">Second tab content.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p className="text-gray-600 text-sm">Third tab content.</p>
      </TabPanel>
    </Tabs>
  ),
};

// Large size
export const Large: Story = {
  render: () => (
    <Tabs defaultValue="tab1" size="lg">
      <TabList>
        <Tab value="tab1">Dashboard</Tab>
        <Tab value="tab2">Members</Tab>
        <Tab value="tab3">Billing</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p className="text-gray-600">Dashboard overview with large tabs.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p className="text-gray-600">Team members and roles.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p className="text-gray-600">Billing and subscription details.</p>
      </TabPanel>
    </Tabs>
  ),
};

// With disabled tab
export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Active</Tab>
        <Tab value="tab2" disabled>
          Disabled
        </Tab>
        <Tab value="tab3">Another Active</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p className="text-gray-600">This tab is active and clickable.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p className="text-gray-600">You should not be able to see this.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p className="text-gray-600">This tab is also active and clickable.</p>
      </TabPanel>
    </Tabs>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">Underline variant</p>
        <Tabs defaultValue="tab1" variant="underline">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">
            <p className="text-gray-600">Underline variant content.</p>
          </TabPanel>
          <TabPanel value="tab2">
            <p className="text-gray-600">Second tab.</p>
          </TabPanel>
          <TabPanel value="tab3">
            <p className="text-gray-600">Third tab.</p>
          </TabPanel>
        </Tabs>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Pill variant</p>
        <Tabs defaultValue="tab1" variant="pill">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">
            <p className="text-gray-600">Pill variant content.</p>
          </TabPanel>
          <TabPanel value="tab2">
            <p className="text-gray-600">Second tab.</p>
          </TabPanel>
          <TabPanel value="tab3">
            <p className="text-gray-600">Third tab.</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ),
};
