import { ReactNode } from 'react';

import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableProvidedDragHandleProps,
  DraggingStyle,
} from '@hello-pangea/dnd';

import { ItemId, Path, TreeItem, Any } from 'lib/src/types';

import { DraggableProvidedProps } from '.';

export type TreeDraggingStyle = DraggingStyle & {
  paddingLeft: number;
  transition: 'none' | string;
};

export type DragActionType = null | 'mouse' | 'key' | 'touch';

export type RenderItemParams<TData = Any> = {
  item: TreeItem<TData>;
  depth: number;
  onExpand: (ItemId: ItemId) => void;
  onCollapse: (ItemId: ItemId) => void;
  provided: TreeDraggableProvided;
  snapshot: DraggableStateSnapshot;
};

export type TreeDraggableProvided = {
  draggableProps: DraggableProvidedProps;
  // will be null if the draggable is disabled
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  // The following props will be removed once we move to react 16
  innerRef: (el: HTMLElement | null) => void;
};

export type Props = {
  item: TreeItem;
  path: Path;
  onExpand: (ItemId: ItemId, path: Path) => void;
  onCollapse: (ItemId: ItemId, path: Path) => void;
  renderItem: (item: RenderItemParams) => ReactNode;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  itemRef: (ItemId: ItemId, element: HTMLElement | null) => void;
  offsetPerLevel: number;
  style?: React.CSSProperties;
};
