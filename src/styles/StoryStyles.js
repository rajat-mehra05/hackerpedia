import styled from "styled-components";

export const StoryWrapper = styled.section`
  font-family: "Verdana", sans-serif;
  padding: 10px 0 5px 15px;
  color: ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.cardBackground};
  transition: background-color 0.3s ease, color 0.3s ease;
  &:first-of-type {
    border-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const StoryTitle = styled.h1`
  margin-bottom: 2.5px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  text-decoration: none;
  a {
    color: ${props => props.theme.colors.link};
    text-decoration: none;
    transition: color 0.3s ease;
  }
  a:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors.linkHover};
  }
`;

export const StoryMeta = styled.div`
  font-size: 0.756rem;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  
  > span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  > span:not(:first-child):before {
    content: '|';
    color: ${props => props.theme.colors.tertiary};
  }
`;

export const StoryMetaElement = styled.span`
  a {
    margin-left: 4px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  font-weight: normal;
  color: ${(props) => props.theme.colors.tertiary};
  transition: color 0.3s ease;
`;

export const UpvoteIcon = styled.i`
  font-size: 20px;
  margin-top: 7px;
  padding: 0px;
  margin-right: 5px;
  color: ${props => props.theme.colors.secondary};
  transition: color 0.3s ease;
`;

export const DomainLink = styled.a`
  color: ${props => props.theme.colors.domainLink};
  transition: color 0.3s ease;
`;

export const UserLink = styled.a`
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
  transition: color 0.3s ease;
`;

export const CommentsLink = styled.a`
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
  transition: color 0.3s ease;
`;
