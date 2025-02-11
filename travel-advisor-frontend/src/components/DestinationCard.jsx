import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DestinationCard = ({ destination }) => {
    const navigate = useNavigate(); // React Router hook

    const handleViewDetails = () => {
        navigate(`/itinerary/${destination.id}`); // Navigate to Itinerary Page with ID
    };

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3, overflow: "hidden", height: "100%" }}>
            <CardMedia
                component="img"
                height="200"
                image={destination.image} // Use hardcoded images
                alt={destination.name}
            />
            <CardContent sx={{ bgcolor: "background.paper", p: 2, height: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        <LocationOnIcon fontSize="small" /> {destination.country}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                        {destination.name}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{
                            mt: 1,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3, // Limit to 3 lines
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {destination.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                        Best Season: {destination.best_season}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ textTransform: "none", fontWeight: "bold", mt: 2 }}
                    onClick={handleViewDetails} // Navigate to Itinerary Page
                >
                    Create Plans
                </Button>
            </CardContent>
        </Card>
    );
};

export default DestinationCard;
