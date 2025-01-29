import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';
import DestinationCard from '../components/DestinationCard';
import Navbar from './Navbar';
import axios from 'axios';

const DestinationsPage = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/destinations/');
                setDestinations(response.data);
            } catch (err) {
                setError('Failed to load destinations. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <Box>
            <Navbar />
            <Container sx={{ py: 5 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                    Explore Our Top Destinations in Nepal
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="h6" color="error" textAlign="center">
                        {error}
                    </Typography>
                ) : (
                    <Grid container spacing={4}>
                        {destinations.map((destination) => (
                            <Grid item xs={12} sm={6} md={4} key={destination.id}>
                                <DestinationCard destination={destination} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default DestinationsPage;
