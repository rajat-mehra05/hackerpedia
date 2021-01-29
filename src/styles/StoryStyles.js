import styled from "styled-components";

export const StoryWrapper = styled.section`
  font-family: "Verdana", sans-serif;
  padding: 10px 0 5px 15px;
  /*  border-top: 0.5px solid #cccccc; */
  color: grey;
  background-color: #eee;
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
    color: #2e2e2c;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const StoryMeta = styled.div`
font-size: 0.756rem;
display: flex;
flex-wrap: wrap;
  > span:first-child {
    margin-right: 6px;
  }
  > span:not(:first-child):before {
    content: '•'
    margin: 0 7px;
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
  color: ${(props) => props.color};
`;
