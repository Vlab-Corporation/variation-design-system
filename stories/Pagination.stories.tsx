import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@/components/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      control: "number",
      description: "Current page (1-based)",
    },
    totalPages: {
      control: "number",
      description: "Total number of pages",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    siblingCount: {
      control: "number",
      description: "Number of sibling pages shown around current",
    },
    showEdges: {
      control: "boolean",
      description: "Show first/last buttons",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default (interactive)
export const Default: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(1);
      return (
        <Pagination page={page} totalPages={10} onChange={setPage} />
      );
    };
    return <Component />;
  },
};

// Small size
export const Small: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(1);
      return (
        <Pagination page={page} totalPages={10} size="sm" onChange={setPage} />
      );
    };
    return <Component />;
  },
};

// Medium size
export const Medium: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(1);
      return (
        <Pagination page={page} totalPages={10} size="md" onChange={setPage} />
      );
    };
    return <Component />;
  },
};

// Large size
export const Large: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(1);
      return (
        <Pagination page={page} totalPages={10} size="lg" onChange={setPage} />
      );
    };
    return <Component />;
  },
};

// With edge buttons (first/last)
export const WithEdges: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(5);
      return (
        <Pagination
          page={page}
          totalPages={20}
          showEdges
          onChange={setPage}
        />
      );
    };
    return <Component />;
  },
};

// Custom sibling count
export const SiblingCount2: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(10);
      return (
        <Pagination
          page={page}
          totalPages={20}
          siblingCount={2}
          onChange={setPage}
        />
      );
    };
    return <Component />;
  },
};

// Few pages (no ellipsis needed)
export const FewPages: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(1);
      return (
        <Pagination page={page} totalPages={3} onChange={setPage} />
      );
    };
    return <Component />;
  },
};

// Many pages with edges
export const ManyPagesWithEdges: Story = {
  render: () => {
    const Component = () => {
      const [page, setPage] = useState(25);
      return (
        <Pagination
          page={page}
          totalPages={50}
          showEdges
          siblingCount={2}
          onChange={setPage}
        />
      );
    };
    return <Component />;
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => {
    const Component = () => {
      const [smPage, setSmPage] = useState(3);
      const [mdPage, setMdPage] = useState(3);
      const [lgPage, setLgPage] = useState(3);
      return (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Small</p>
            <Pagination
              page={smPage}
              totalPages={10}
              size="sm"
              onChange={setSmPage}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Medium</p>
            <Pagination
              page={mdPage}
              totalPages={10}
              size="md"
              onChange={setMdPage}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Large</p>
            <Pagination
              page={lgPage}
              totalPages={10}
              size="lg"
              onChange={setLgPage}
            />
          </div>
        </div>
      );
    };
    return <Component />;
  },
};
