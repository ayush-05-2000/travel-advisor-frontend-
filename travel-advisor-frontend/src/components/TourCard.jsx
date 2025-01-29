import React from "react";
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from "@mui/material";

const TourCard = ({ tour }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia component="img" height="200" image={tour.image} alt={tour.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight="bold">
          {tour.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tour.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained">
          Book Now
        </Button>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default TourCard;
