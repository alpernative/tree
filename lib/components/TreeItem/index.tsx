import { CSSProperties, Component } from 'react';

import { DraggableProvidedDraggableProps, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Any } from 'lib/types';
import { isSamePath } from 'lib/utils/path';
import { sameProps } from 'lib/utils/react';

import { Props, TreeDraggableProvided } from './TreeItem-types';

export type DraggableProvidedProps = DraggableProvidedDraggableProps & {
  style?: CSSProperties;
};

export default class TreeItem extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      !sameProps(this.props, nextProps, ['item', 'provided', 'snapshot', 'onCollapse', 'onExpand', 'style']) ||
      !isSamePath(this.props.path, nextProps.path)
    );
  }

  patchDraggableProps = (
    draggableProps: DraggableProvidedDraggableProps,
    snapshot: DraggableStateSnapshot,
  ): DraggableProvidedProps => {
    const { path, offsetPerLevel, style } = this.props;

    const transitions =
      draggableProps.style && draggableProps.style.transition ? [draggableProps.style.transition] : [];
    if (snapshot.dropAnimation) {
      transitions.push(`padding-left ${snapshot.dropAnimation.duration}s ${snapshot.dropAnimation.curve}`);
    }
    const transition = transitions.join(', ');

    return {
      ...draggableProps,
      style: {
        ...draggableProps.style,
        paddingLeft: (path.length - 1) * offsetPerLevel,
        // TODO: remove any
        transition: transition as Any,
        ...style,
      },
    };
  };

  render() {
    const { item, path, onExpand, onCollapse, renderItem, provided, snapshot, itemRef } = this.props;
    const innerRef = (el: HTMLElement | null) => {
      itemRef(item.id, el);
      provided.innerRef(el);
    };

    const finalProvided: TreeDraggableProvided = {
      draggableProps: this.patchDraggableProps(provided.draggableProps, snapshot),
      dragHandleProps: provided.dragHandleProps,
      innerRef,
    };

    return renderItem({
      item,
      depth: path.length - 1,
      onExpand: ItemId => onExpand(ItemId, path),
      onCollapse: ItemId => onCollapse(ItemId, path),
      provided: finalProvided,
      snapshot,
    });
  }
}
