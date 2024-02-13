import { Path, TreeSourcePosition, TreeDestinationPosition, TreeData, FlattenedTree } from 'lib/src/types';
import { getDestinationPath, getSourcePath } from 'lib/src/utils/flat-tree';
import { getTreePosition } from 'lib/src/utils/tree';

import { DragState, VirtualItemStyle } from './Tree-types';

/*
    Translates a drag&drop movement from an index based position to a relative (parent, index) position
*/
export const calculateFinalDropPositions = (
  tree: TreeData,
  flattenedTree: FlattenedTree,
  dragState: DragState,
): {
  sourcePosition: TreeSourcePosition;
  destinationPosition?: TreeDestinationPosition;
} => {
  const { source, destination, combine, horizontalLevel } = dragState;
  const sourcePath: Path = getSourcePath(flattenedTree, source.index);
  const sourcePosition: TreeSourcePosition = getTreePosition(tree, sourcePath);

  if (combine) {
    return {
      sourcePosition,
      destinationPosition: {
        parentId: combine.draggableId,
      },
    };
  }

  if (!destination) {
    return { sourcePosition, destinationPosition: undefined };
  }

  const destinationPath: Path = getDestinationPath(flattenedTree, source.index, destination.index, horizontalLevel);
  const destinationPosition: TreeDestinationPosition = {
    ...getTreePosition(tree, destinationPath),
  };
  return { sourcePosition, destinationPosition };
};

export function getVirtualItemStyle({ provided, style, isDragging }: VirtualItemStyle): React.CSSProperties {
  const combined = {
    ...style,
    ...provided.draggableProps.style,
  };

  const marginBottom = 8;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : Number(combined.height) - marginBottom,
    marginBottom,
  };
  return withSpacing;
}
