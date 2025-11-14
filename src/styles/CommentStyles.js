import styled from 'styled-components';

export const CommentWrapper = styled.div`
  margin-left: ${props => {
    const depth = props.$depth || 0;
    if (depth === 0) return '0px';
    if (depth === 1) return '40px';
    if (depth === 2) return '80px';
    if (depth === 3) return '120px';
    if (depth >= 4) return '140px';
    return '0px';
  }};
  margin-top: 8px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  
  @media (max-width: 768px) {
    margin-left: ${props => {
      const depth = props.$depth || 0;
      if (depth === 0) return '0px';
      if (depth === 1) return '15px';
      if (depth === 2) return '32px';
      if (depth === 3) return '40px';
      if (depth >= 4) return '50px';
      return '0px';
    }};
  }
`;

export const CommentHeader = styled.div`
  font-size: 8pt;
  color: ${props => props.theme.colors.tertiary};
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-wrap: wrap;
`;

export const Upvote = styled.span`
  cursor: pointer;
  font-size: 10px;
  color: ${props => props.theme.colors.tertiary};
  margin-right: 4px;
  user-select: none;
`;

export const CommentAuthor = styled.a`
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  font-weight: normal;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const CommentTime = styled.span`
  color: ${props => props.theme.colors.tertiary};
`;

export const Separator = styled.span`
  color: ${props => props.theme.colors.tertiary};
  margin: 0 2px;
`;

export const CollapseLink = styled.a`
  color: ${props => props.theme.colors.tertiary};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const NextLink = styled.a`
  color: ${props => props.theme.colors.tertiary};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const CommentContent = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 9pt;
  line-height: 1.5;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  p {
    margin: 8px 0;
  }

  a {
    color: ${props => props.theme.colors.link};
    text-decoration: underline;
    word-break: break-all;
    
    &:hover {
      color: ${props => props.theme.colors.linkHover};
    }
  }

  pre {
    background-color: ${props => props.theme.colors.cardBackground};
    padding: 10px;
    overflow-x: auto;
    margin: 10px 0;
    max-width: 100%;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    word-break: break-all;
  }
`;

export const CommentFooter = styled.div`
  font-size: 8pt;
  margin-top: 5px;
`;

export const ReplyLink = styled.a`
  color: ${props => props.theme.colors.tertiary};
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

export const CollapsedInfo = styled.div`
  color: ${props => props.theme.colors.tertiary};
  font-size: 8pt;
  font-style: italic;
`;

export const RepliesContainer = styled.div`
  margin-top: 5px;
`;

export const DeletedComment = styled.div`
  color: ${props => props.theme.colors.tertiary};
  font-style: italic;
  font-size: 8pt;
  padding: 5px 0;
`;

export const CommentListWrapper = styled.div`
  padding: 10px 0;
  overflow-x: auto;
`;

export const LoadingComment = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const NoComments = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

