import React, { useState } from "react";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Step Labels
const steps = ["Select Destination", "Select Places", "Generate Itinerary"];

// Hardcoded Destinations & Places
const destinations = {
  1: {
    id: 1,
    name: "Kathmandu",
    description: "Capital city of Nepal, rich in culture and heritage.",
    places: [
      { id: "p1", name: "Swayambhunath Stupa" },
      { id: "p2", name: "Pashupatinath Temple" },
      { id: "p3", name: "Kathmandu Durbar Square" }
    ]
  },
  2: {
    id: 2,
    name: "Pokhara",
    description: "A picturesque city known for its serene lakes and adventure sports.",
    places: [
      { id: "p4", name: "Phewa Lake" },
      { id: "p5", name: "Sarangkot" },
      { id: "p6", name: "Davis Falls" }
    ]
  }
};

// Hardcoded Itinerary Data
const itineraries = {
  1: `
    Day 1: Arrival in Kathmandu
    - Visit Kathmandu Durbar Square
    - Explore local street food
    - Evening walk around Thamel

    Day 2: Cultural Exploration
    - Morning visit to Swayambhunath Stupa
    - Afternoon at Pashupatinath Temple
    - Relax at Garden of Dreams in the evening
    `,
  2: `
    Day 1: Welcome to Pokhara
    - Relax at Phewa Lake
    - Explore Lakeside Market

    Day 2: Adventure & Sightseeing
    - Early morning sunrise at Sarangkot
    - Visit Davis Falls
    - Boating at Phewa Lake
    `
};

const ItineraryPage = () => {
  const { destinationId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [budget, setBudget] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [itinerary, setItinerary] = useState("");

  // Get the destination details from hardcoded data
  const destination = destinations[destinationId] || null;
  const places = destination ? destination.places : [];

  const handleCheckboxChange = (place) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.includes(place)
        ? prevSelected.filter((p) => p !== place)
        : [...prevSelected, place]
    );
  };

  const handleNext = () => {
    if (activeStep === 0 && (!budget || !numPeople)) {
      alert("Please enter budget and number of people.");
      return;
    }
    if (activeStep === 1 && selectedPlaces.length === 0) {
      alert("Please select at least one place.");
      return;
    }

    setActiveStep((prev) => prev + 1);

    if (activeStep === 1) {
      // Hardcoded itinerary for Step 3
      setItinerary(itineraries[destinationId] || "No itinerary available.");
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

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
    switch (step) {
      case 0:
        return (
          <Box textAlign="center">
            <Typography variant="h6" mb={2}>
              Selected Destination: <strong>{destination?.name}</strong>
            </Typography>
            <Typography variant="body1">{destination?.description}</Typography>
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
        return itinerary ? (
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
                      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        {dayTitle.trim()}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {activities.map((activity, i) => (
                          <Typography key={i} component="li" variant="body2" sx={{ fontSize: "1rem" }}>
                            {activity.trim()}
                          </Typography>
                        ))}
                      </Box>
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
