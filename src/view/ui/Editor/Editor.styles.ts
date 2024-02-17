import styled from 'styled-components';

export const EditorWrapper = styled.div`
  .outlined-none {
    outline: none;
  }

  .tiptap p.is-empty::before,
  h1.is-empty::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
