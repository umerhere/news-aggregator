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
import {Article} from './../../types'
import {  dateFormatter } from './helper'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface NewsCardProps {
  newsData: Array<Article> | null;
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

export default function NewsCard({newsData}: NewsCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {
        newsData && newsData.length > 0 && newsData.map((article, index) => {
          return article.author && <div style={{margin: '15px 0'}} key={index}> <Card sx={{ maxWidth: 500  }}>
          
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {article.author.charAt(0).toUpperCase()}
              </Avatar>
            }
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
              <p><span>Author: </span>{article.author}</p>
              <p><span>Source: </span>{article.source.name}</p>
              </>
            }
          />
          {article.urlToImage && <CardMedia
            component="img"
            height="194"
            image={article.urlToImage}
            alt="Paella dish"
          />}
          <CardContent>
          </CardContent>
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
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography variant="body2" color="text.secondary">
              {article.content}
            </Typography>
            </CardContent>
          </Collapse>
        </Card>
          </div>
         }
         )
     }
    </>
    
    
  );
}
