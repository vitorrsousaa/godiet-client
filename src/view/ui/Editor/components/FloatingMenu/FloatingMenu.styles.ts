import { FloatingMenu as FloatingMenuComponent } from '@tiptap/react';
import styled from 'styled-components';

export const FloatingMenuWrapper = styled(FloatingMenuComponent)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  border-radius: 8px;

  overflow: hidden;
  border: 1px solid #ddd;
`;

export const FloatingMenuButton = styled.button`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #ddd;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2px;
    font-size: 12px;

    span:first-child {
      font-weight: 700;
    }

    span:last-child {
      color: #666;
    }
  }
`;
