import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react';
import styled from 'styled-components';

export const BubbleMenuWrapper = styled(BubbleMenuComponent)`
  background-color: #fff;
  display: flex;
  flex-direction: row;

  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const BubbleMenuButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  & + button {
    border-left: 1px solid #ccc;
  }

  &:hover {
    background-color: #ddd;
  }

  &.isActive {
    color: '#59BD5A';

    svg {
      color: #59bd5a;
    }
  }
`;
