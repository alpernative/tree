export type ItemId = string | number;

export interface TreeData<TData = Any> {
  rootId: ItemId;
  items: Record<ItemId, TreeItem<TData>>;
}

export type Any = any; // eslint-disable-line

export type TreeItemData = Any;

export type TreeItem<TData = Any> = {
  id: ItemId;
  children: ItemId[];
  hasChildren?: boolean;
  isExpanded?: boolean;
  isChildrenLoading?: boolean;
  data?: TData;
};

export type FlattenedTree = FlattenedItem[];

export type Path = number[];

export type FlattenedItem = {
  item: TreeItem;
  path: Path;
};

export type TreeSourcePosition = {
  parentId: ItemId;
  index: number;
};

export type TreeDestinationPosition = {
  parentId: ItemId;
  index?: number;
};
