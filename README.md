![alpernative-tree](https://github.com/VirtualMetric/virtualmetric-dashboard/assets/55390822/423d110f-4a03-4d72-abd8-975bcb1b3ae8)

## AlperNative Tree

[`@alpernative/tree`](https://www.npmjs.com/package/@alpernative/tree) is a high-performance, customizable tree component for React. It provides a wide range of features, including virtualization, drag-and-drop, and nested drag-and-drop support.

## Features

- **High Performance**: [`@alpernative/tree`](https://www.npmjs.com/package/@alpernative/tree) is designed to handle large datasets with ease, providing smooth and responsive user experiences.
- **Customizable**: [`@alpernative/tree`](https://www.npmjs.com/package/@alpernative/tree) offers a wide range of customization options, allowing you to tailor the appearance and behavior of the tree to your specific needs.
- **Virtualization**: [`@alpernative/tree`](https://www.npmjs.com/package/@alpernative/tree) supports virtualization, enabling you to render only the visible portion of the tree, which can significantly improve performance when working with large datasets.
- **Drag and Drop**: [`@alpernative/tree`](https://www.npmjs.com/package/@alpernative/tree) provides built-in support for drag-and-drop operations, making it easy to rearrange tree nodes.
- **Nested Drag and Drop**: [`@alpernative/tree`](https://www.npmjs.com/package/@alpernative/tree) supports nested drag-and-drop operations, allowing you to move nodes within and between different levels of the tree.

## Getting Started

### Installation

```bash
npm install @alpernative/tree
```

or using yarn:

```bash
yarn add @alpernative/tree
```

### Basic Usage

We need to create `TreeItem.tsx` file to render the tree items

```jsx
import { FC, useState } from 'react';
import { AiOutlineFile, AiOutlineFolder, AiOutlineFolderOpen } from 'react-icons/ai';
import { RenderItemParams } from '@alpernative/tree';

export const TreeItem: FC<RenderItemParams> = ({ item, provided, onCollapse, onExpand }) => {
  const [isSelected, setIsSelected] = useState(false);

  const renderItemIcon = () => {
    // You can customize the your icons based on the item's properties
    if (!item.hasChildren) return <AiOutlineFile />;
    if (item.isExpanded) return <AiOutlineFolderOpen />;
    return <AiOutlineFolder />;
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => setIsSelected(value => !value)}
    >
      <div style={{ color: isSelected ? 'red' : 'gray' }}>
        {item.hasChildren && (item.isExpanded ? '>' : '<')}
        {renderItemIcon()}
        {item.data.title}
      </div>
    </div>
  );
};

```

Then we can use the `Tree` component in our `App.tsx` file

```jsx
import Tree from '@alpernative/tree';
import { FC, useState } from 'react';
import { TreeItem } from './TreeItem';

export const basicTreeData = {
  rootId: 'root',
  items: {
    root: {
      id: 'root',
      data: { title: 'Root' },
      children: ['item-0'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
    },
    'item-0': {
      id: 'item-0',
      data: {
        title: 'Item 0',
      },
      children: [
        'item-1',
        'item-2',
        'item-3',
        'item-4',
      ],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
    },
    'item-1': {
      id: 'item-1',
      data: {
        title: 'Item 1',
      },
      children: [],
      hasChildren: false,
      isExpanded: true,
      isChildrenLoading: false,
    },
    'item-2': {
      id: 'item-2',
      data: {
        title: 'Item 2',
      },
      children: [],
      hasChildren: false,
      isExpanded: true,
      isChildrenLoading: false,
    },
    'item-3': {
      id: 'item-3',
      data: {
        title: 'Item 3',
      },
      children: [],
      hasChildren: false,
      isExpanded: true,
      isChildrenLoading: false,
    },
    'item-4': {
      id: 'item-4',
      data: {
        title: 'Item 4',
      },
      children: [],
      hasChildren: false,
      isExpanded: true,
      isChildrenLoading: false,
    },
  },
};


export const App: FC = () => {
  const [treeData, setTreeData] = useState<TreeData>(basicTreeData);

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
    <div style={{ width: 200, height: 300 }}>
      <Tree
        tree={treeData}
        offsetPerLevel={19}
        renderItem={props => <TreeItem {...props} />}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        isNestingEnabled
        isDragEnabled
        virtualItemHeight={ITEM_HEIGHT}
        isVirtualizationEnabled
      />
    </div>
  );
};

```

## Examples

Looking for more examples? Check out the [Storybook](https://alpernative-tree.netlify.app/) for a wide range of use cases and customization options.

## Documentation

For full documentation, visit [Link to Documentation](https://tree.alpernative.vercel.app/).

## Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
