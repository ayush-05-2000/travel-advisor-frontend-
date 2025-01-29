import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  TextField
} from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import Navbar from "../components/Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const steps = ["Select Destination", "Select Places", "Generate Itinerary"];

const ItineraryPage = () => {
  const { destinationId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [destination, setDestination] = useState(null);
  const [budget, setBudget] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [fetchingItinerary, setFetchingItinerary] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/destinations/${destinationId}`);
        setDestination(response.data);
        setPlaces(response.data.places || []);
      } catch (err) {
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  // useEffect should be at the top level, NOT inside handleNext
  useEffect(() => {
    if (activeStep === 2) { // When Step 3 is active
      console.log("Step 3 Active - Calling API...");
      generateItinerary();
    }
  }, [activeStep]); // Runs whenever activeStep changes

  const handleCheckboxChange = (place) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.includes(place)
        ? prevSelected.filter((p) => p !== place)
        : [...prevSelected, place]
    );
  };

  const handleNext = async () => {
    console.log("Next button clicked. Active Step:", activeStep);

    if (activeStep === 0 && (!budget || !numPeople)) {
      alert("Please enter budget and number of people.");
      return;
    }

    if (activeStep === 1 && selectedPlaces.length === 0) {
      alert("Please select at least one place.");
      return;
    }



    setActiveStep((prev) => prev + 1);
  };


  const handleBack = () => setActiveStep((prev) => prev - 1);

  const generateItinerary = async () => {
    console.log("Generating itinerary...");
    setFetchingItinerary(true);

    const payload = selectedPlaces.map(place => place.name);

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/itineraries/generate-ai-itinerary/?budget=${budget}&num_people=${numPeople}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        const data = await response.json();
        console.log("Generated Itinerary:", data);

        setItinerary(data.itinerary);
    } catch (error) {
        console.error("Error generating itinerary:", error);
    } finally {
        setFetchingItinerary(false); // Stop loading after receiving response
    }
};








  const downloadPDF = () => {
    const pdfElement = document.getElementById("itinerary-content");
    html2canvas(pdfElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
      pdf.save("itinerary.pdf");
    });
  };

  const renderStepContent = (step) => {
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    switch (step) {
      case 0:
        return (
          <Box textAlign="center">
            <Typography variant="h6" mb={2}>
              Selected Destination: <strong>{destination?.name}</strong>
            </Typography>
            <Typography variant="body1">
              {typeof destination?.description === "string"
                ? destination.description
                : JSON.stringify(destination?.description)}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                label="Number of People"
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" mb={2}>
              Select Places to Visit in {destination?.name}
            </Typography>
            <FormGroup>
              {places.map((place) => (
                <FormControlLabel
                  key={place.id}
                  control={<Checkbox checked={selectedPlaces.includes(place)} onChange={() => handleCheckboxChange(place)} />}
                  label={place.name}
                />
              ))}
            </FormGroup>
          </Box>
        );
      case 2:
        return fetchingItinerary ? (
          <Box textAlign="center">
            <CircularProgress />
            <Typography variant="body1">Generating Itinerary...</Typography>
          </Box>
        ) : itinerary ? (
          <Box textAlign="center" id="itinerary-content">
            <Typography variant="h6" mb={2}>
              Proposed Itinerary
            </Typography>
            <Timeline align="left">
              {itinerary.split("\n\n").map((day, index) => {
                const [dayTitle, ...activities] = day.split("\n");
                return (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < itinerary.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6" fontWeight="bold">{dayTitle}</Typography>
                      {activities.map((activity, i) => (
                        <Typography key={i} variant="body2" sx={{ ml: 2 }}>
                          {activity}
                        </Typography>
                      ))}
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
            <Button variant="contained" color="secondary" onClick={downloadPDF} sx={{ mt: 3 }}>
              Download as PDF
            </Button>
          </Box>
        ) : (
          <Typography color="error">No itinerary available.</Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Navbar />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Nepal Itinerary Planner
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleBack} disabled={activeStep === 0} sx={{ mr: 2 }}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext} disabled={activeStep === steps.length - 1}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ItineraryPage;
