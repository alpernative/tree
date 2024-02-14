import { ComponentProps, FC, useState } from 'react';

import styled from '@emotion/styled';
import { Meta, StoryObj } from '@storybook/react';

import Tree, {
  moveItemOnTree,
  mutateTree,
  ItemId,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
  RenderItemParams,
} from 'lib/src';

import { ITEM_HEIGHT, TreeItem } from './TreeItem';
import { virtualTree } from './__mocks__/virtualTree';

const StyledVirtualTreeWrapper = styled.div<{ isVirtualizationEnabled: boolean }>`
  height: ${({ isVirtualizationEnabled }) => (isVirtualizationEnabled ? '100vh' : '100%')};
  border: 1px solid #ededed;
  border-radius: 8px;
  margin: 24px;
  width: 256px;
  padding: 24px;
  max-width: 500px;
`;

const renderItem = ({ ...props }: RenderItemParams) => {
  return <TreeItem {...props} />;
};

export const TreeStory: FC<ComponentProps<typeof Tree>> = ({ tree, isVirtualizationEnabled, ...props }) => {
  const [treeData, setTreeData] = useState<TreeData>(tree);

  const onExpand = (ItemId: ItemId) => {
    setTreeData(mutateTree(treeData, ItemId, { isExpanded: true }));
  };

  const onCollapse = (ItemId: ItemId) => {
    setTreeData(mutateTree(treeData, ItemId, { isExpanded: false }));
  };

  const onDragEnd = (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
    if (!destination) return;

    const newTree = moveItemOnTree(treeData, source, destination);
    setTreeData(newTree);
  };

  return (
    <StyledVirtualTreeWrapper isVirtualizationEnabled={isVirtualizationEnabled}>
      <Tree
        {...props}
        tree={treeData}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        isDragEnabled
        isVirtualizationEnabled={isVirtualizationEnabled}
      />
    </StyledVirtualTreeWrapper>
  );
};

const meta: Meta<typeof TreeStory> = {
  title: 'Library/Tree',
  component: TreeStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tree: { control: 'object' },
    isDragEnabled: { control: 'boolean' },
    isVirtualizationEnabled: { control: 'boolean' },
    offsetPerLevel: { control: 'number' },
    virtualItemHeight: { control: 'number' },
    isNestingEnabled: { control: 'boolean' },
    onCollapse: { action: 'onCollapse' },
    onExpand: { action: 'onExpand' },
    onDragEnd: { action: 'onDragEnd' },
    onDragStart: { action: 'onDragStart' },
  },
  args: {
    isDragEnabled: true,
    isNestingEnabled: false,
    offsetPerLevel: 36,
    tree: virtualTree,
    renderItem,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const VirtualTree: Story = {
  args: {
    isVirtualizationEnabled: true,
    isDragEnabled: true,
    isNestingEnabled: false,
    offsetPerLevel: 36,
    virtualItemHeight: ITEM_HEIGHT,
    tree: virtualTree,
    renderItem,
  },
};
