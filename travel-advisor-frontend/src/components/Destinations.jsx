import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import DestinationCard from '../components/DestinationCard';
import Navbar from './Navbar';

// Hardcoded Destinations Data
const destinations = [
    {
        id: 1,
        name: "Kathmandu",
        country: "Nepal",
        description: "Capital city of Nepal, rich in culture and heritage.",
        best_season: "Spring & Autumn",
        image: "/kathmandu.jpg"
    },
    {
        id: 2,
        name: "Pokhara",
        country: "Nepal",
        description: "A picturesque city known for its serene lakes, adventure sports, and stunning Himalayan views.",
        best_season: "Spring & Autumn",
        image: "/pokhara.jpg"
    },
    {
        id: 3,
        name: "Chitwan National Park",
        country: "Nepal",
        description: "A UNESCO World Heritage site famous for its rich biodiversity, jungle safaris, and the rare one-horned rhinoceros.",
        best_season: "Winter & Spring",
        image: "/chitwan.jpg"
    },
    {
        id: 4,
        name: "Lumbini",
        country: "Nepal",
        description: "The birthplace of Lord Buddha and an important pilgrimage site for Buddhists.",
        best_season: "Autumn & Winter",
        image: "/lumbini.jpg"
    },
    {
        id: 5,
        name: "Everest Base Camp",
        country: "Nepal",
        description: "One of the most famous trekking destinations in the world, offering breathtaking views of Mount Everest.",
        best_season: "Spring & Autumn",
        image: "/mount-everest.jpg"
    },
    {
        id: 6,
        name: "Bandipur",
        country: "Nepal",
        description: "A charming hilltop town with preserved Newari architecture and stunning mountain views.",
        best_season: "Spring & Winter",
        image: "/bandipur.jpg"
    }
];

const DestinationsPage = () => {
    return (
        <Box>
            <Navbar />
            <Container sx={{ py: 5 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                    Explore Our Top Destinations in Nepal
                </Typography>

                <Grid container spacing={4}>
                    {destinations.map((destination) => (
                        <Grid item xs={12} sm={6} md={4} key={destination.id}>
                            <DestinationCard destination={destination} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default DestinationsPage;
