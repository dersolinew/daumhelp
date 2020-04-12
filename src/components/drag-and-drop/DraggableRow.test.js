import { findDraggableElement } from './DraggableRow';

describe('DraggableRow', () => {
  describe('findDraggableElement', () => {
    it('when element itself is draggable should return itself', () => {
      // given
      let fakeDraggableElement = {
        tagName: 'tr',
        getAttribute: () => 'true'
      };

      // when
      let element = findDraggableElement(fakeDraggableElement);

      // then
      expect(element).toBe(fakeDraggableElement);
    });

    it('when element parent is draggable should return parent', () => {
      // given
      let fakeDraggableElement = {
        tagName: 'tr',
        getAttribute: () => 'true'
      };
      let fakeNonDraggableElement = {
        tagName: 'td',
        getAttribute: () => undefined,
        parentElement: fakeDraggableElement
      };

      // when
      let element = findDraggableElement(fakeNonDraggableElement);

      // then
      expect(element).toBe(fakeDraggableElement);
    });

    it('when element is body should return undefined', () => {
      // given
      let fakeNonDraggableElement = {
        tagName: 'body',
      };

      // when
      let element = findDraggableElement(fakeNonDraggableElement);

      // then
      expect(element).toBeUndefined();
    });
  });
});