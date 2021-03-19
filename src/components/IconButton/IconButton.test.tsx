import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { IconEnums } from '../types';

import IconButton from '.';

jest.mock('../../assets/img/circle.svg', () => ({
  ReactComponent: 'IconCircle'
}));
jest.mock('../../assets/img/circleCheck.svg', () => ({
  ReactComponent: 'IconCircleCheck'
}));
jest.mock('../../assets/img/trash.svg', () => ({
  ReactComponent: 'IconTrash'
}));

describe('IconButton', () => {
  let props: any;

  beforeEach(() => {
    props = {
      iconName: IconEnums.Circle,
      tooltip: 'some tooltip',
      testId: 'some testid',
      onClick: jest.fn()
    };
  });

  describe('actions', () => {
    it('triggers onClick', () => {
      const wrapper = renderer.create(<IconButton {...props} />);

      act(() => {
        wrapper.root.props.onClick();
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('renders()', () => {
    it('an icon circle button by default', () => {
      props.iconName = '';
      const wrapper = renderer.create(<IconButton {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <button
          className="icon-button"
          data-testid="some testid"
          onClick={[MockFunction]}
          title="some tooltip"
          type="button"
        >
          <IconCircle />
        </button>
      `);
    });

    it('an icon circle button', () => {
      const wrapper = renderer.create(<IconButton {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <button
          className="icon-button"
          data-testid="some testid"
          onClick={[MockFunction]}
          title="some tooltip"
          type="button"
        >
          <IconCircle />
        </button>
      `);
    });

    it('an icon circle check button', () => {
      props.iconName = IconEnums.CircleCheck;
      const wrapper = renderer.create(<IconButton {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <button
          className="icon-button"
          data-testid="some testid"
          onClick={[MockFunction]}
          title="some tooltip"
          type="button"
        >
          <IconCircleCheck />
        </button>
      `);
    });

    it('an icon trash button', () => {
      props.iconName = IconEnums.Trash;
      const wrapper = renderer.create(<IconButton {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <button
          className="icon-button"
          data-testid="some testid"
          onClick={[MockFunction]}
          title="some tooltip"
          type="button"
        >
          <IconTrash />
        </button>
      `);
    });
  });
});
