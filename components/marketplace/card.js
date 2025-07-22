import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Stack } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard({product}) {
  return (
    <Card sx={{ width: "100%" }}>

      <Stack 
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          right: 0,
          width:"100%"
        }}>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon sx={{color:"lightgray"}} /> */}
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Stack>

      <CardMedia
        component="img"
        height="194"
        sx={{objectFit:"contain"}}
        image={product.MainPhoto}
        alt={product.name}
      />

      <CardContent>

        <Typography variant="h5">
          {product.Name}
        </Typography>
        <Typography variant="h5">
          {product["Brand Name"]}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.Description}
        </Typography>


        {/* <Stack direction="row" spacing={2} sx={{paddingTop:2}}>
          <Typography variant="h6" gutterBottom sx={{textDecoration:"line-through"}}>
            $45.66
          </Typography>

          <Typography variant="h6" gutterBottom>
            $45.66
          </Typography>
        </Stack>*/}

        <Typography variant="h6" gutterBottom sx={{paddingTop:2}}>
            {product.Category} | {product.ParentCategory}
        </Typography> 

        {/* <Button variant="contained" sx={{width:"100%", marginTop:2}}>Add To Cart</Button> */}

      </CardContent>
      
    </Card>
  );
}