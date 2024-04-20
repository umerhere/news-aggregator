import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Article } from './../../types';
import { dateFormatter } from './helper';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface NewsCardProps {
  newsData: Article[] | null;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewsCard({ newsData }: NewsCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(10);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // useCallback is used here to prevent the handleScroll function from being recreated on every render, which would cause the useEffect hook to re-run unnecessarily.
  const handleScroll = React.useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setVisibleCount((prevCount) =>
      Math.min(
        prevCount + 10,
        newsData && newsData.length ? newsData.length : 10
      )
    );
  }, [newsData]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {newsData &&
        newsData.length > 0 &&
        newsData.slice(0, visibleCount).map((article, index) => {
          return (
            <div style={{ margin: '15px 0' }} key={index}>
              {' '}
              <Card sx={{ maxWidth: 500 }}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={article.title}
                  subheader={
                    <>
                      <p>{article.description}</p>
                      <p>{dateFormatter(article.publishedAt)}</p>
                      <p>
                        <span>Source: </span>
                        {article.source.name}
                      </p>
                    </>
                  }
                />
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    height="194"
                    image={article.urlToImage}
                    alt="Paella dish"
                  />
                )}
                <CardContent></CardContent>
                <CardActions disableSpacing>
                  Show Content
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {article.content}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          );
        })}
    </>
  );
}
