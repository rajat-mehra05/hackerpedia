import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import styled from 'styled-components';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { getStory, getCommentsRecursive } from '../services/hnAPI';
import NavNews from '../NavigationBar/NavNews';
import CommentList from '../components/CommentList';
import mapTime from '../components/mapTime';
import {
  StoryMeta,
  StoryMetaElement,
  DomainLink,
  UserLink,
} from '../styles/StoryStyles';

const StyledContainer = styled(Container)`
  background-color: ${props => props.theme.colors.body} !important;
  min-height: 100vh;
  transition: background-color 0.3s ease;
  padding-bottom: 40px;
`;

const Breadcrumb = styled.div`
  padding: 15px 0;
  font-size: 0.9rem;
  
  button {
    background: none;
    border: none;
    color: ${props => props.theme.colors.link};
    cursor: pointer;
    text-decoration: underline;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.9rem;
    padding: 0;
    
    &:hover {
      color: ${props => props.theme.colors.linkHover};
    }
  }
`;

const StoryHeader = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

const StoryLink = styled.a`
  color: ${props => props.theme.colors.link};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 10px;
  
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors.linkHover};
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  flex-direction: column;
  gap: 20px;
`;

const ErrorMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const CommentCount = styled.div`
  padding: 15px 20px;
  color: ${props => props.theme.colors.secondary};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.9rem;
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: 4px;
  margin-bottom: 10px;
`;

const CommentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const storyData = await getStory(id);
        
        if (!storyData) {
          setError('Story not found');
          setLoading(false);
          return;
        }
        
        setStory(storyData);
        setLoading(false);
        
        if (storyData.kids && storyData.kids.length > 0) {
          setCommentsLoading(true);
          const commentsData = await getCommentsRecursive(storyData.kids);
          setComments(commentsData);
          setCommentsLoading(false);
        } else {
          setCommentsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story');
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <StyledContainer maxWidth="lg" component="main">
        <NavNews />
        <LoadingWrapper>
          <ClimbingBoxLoader color="#FC7310" loading={true} size={30} />
        </LoadingWrapper>
      </StyledContainer>
    );
  }

  if (error || !story) {
    return (
      <StyledContainer maxWidth="lg" component="main">
        <NavNews />
        <Breadcrumb>
          <button onClick={handleBack} aria-label="Go back">
            ← Back
          </button>
        </Breadcrumb>
        <ErrorMessage>{error || 'Story not found'}</ErrorMessage>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg" component="main">
      <NavNews />
      
      <Breadcrumb>
        <button onClick={handleBack} aria-label="Go back">
          ← Back
        </button>
      </Breadcrumb>

      <StoryHeader>
        <StoryLink
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {story.title}
        </StoryLink>
        {story.url && (
          <div style={{ marginBottom: '10px' }}>
            <DomainLink
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              ({story.url
                .replace('http://', '')
                .replace('https://', '')
                .split(/[/?#]/)[0]
                .replace('www.', '')})
            </DomainLink>
          </div>
        )}
        <StoryMeta>
          <span>
            <StoryMetaElement>
              {story.score} points
            </StoryMetaElement>
          </span>
          <span>
            <StoryMetaElement>
              by{" "}
              <UserLink
                href={`https://news.ycombinator.com/user?id=${story.by}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {story.by}
              </UserLink>
            </StoryMetaElement>
          </span>
          <span>
            <StoryMetaElement>
              {mapTime(story.time)} ago
            </StoryMetaElement>
          </span>
          <span>
            <StoryMetaElement>
              {story.descendants || 0} comments
            </StoryMetaElement>
          </span>
        </StoryMeta>
      </StoryHeader>

      {story.descendants > 0 && (
        <CommentCount>
          {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
        </CommentCount>
      )}

      <CommentList comments={comments} loading={commentsLoading} />
    </StyledContainer>
  );
};

export default CommentPage;

