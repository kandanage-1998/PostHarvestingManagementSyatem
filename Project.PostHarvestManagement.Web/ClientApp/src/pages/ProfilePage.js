import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Stack, TextField, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

export default function DonationRequestAdd() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  const DonationRequestSchema = Yup.object().shape({
    collectionPointID: Yup.number().min(1, 'Please Select Collection Point').required('Collection Point Required'),
    cropTypeName: Yup.string().required('Crop Name Required'),
    cropCategory: Yup.string().required('Crop Category Required'),
    harvestedLocation: Yup.string().required('Harvested Location Required'),
    cropPrice: Yup.number().required('Crop Price Required').positive('Price must be a positive number'),
    registerNumber: Yup.string().required('Register Number Required'),
    registerDate: Yup.string().required('Register Date Required'),
  });

  const formik = useFormik({
    initialValues: {
      collectionPointID: 0,
      cropTypeName: '',
      cropCategory: '',
      harvestedLocation: '',
      cropPrice: '',
      registerNumber: '',
      registerDate: new Date().toISOString().split('T')[0],
    },
    validationSchema: DonationRequestSchema,
    onSubmit: (values) => {
      // Handle form submit
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleSearchWeather = async () => {
    if (!location) {
      toast.error('Please enter a location');
      return;
    }

    try {
      const result = await axios.get(`https://localhost:7211/api/WhetherForcast/GetAllLocations?City=${location}`);
      setWeatherData(result.data);
      toast.success('Weather data fetched successfully');
    } catch (error) {
      toast.error('Failed to fetch weather data');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/farming.jpg"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Helmet>
        <title> Weather Forecast | PostHarvestManagement </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Weather Forecast
        </Typography>
        <FormikProvider value={formik}>
          <ToastContainer position="bottom-right" pauseOnHover />
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* Weather Location Input */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button variant="contained" onClick={handleSearchWeather}>
                  Search
                </Button>
              </Stack>

              {/* Show weather data if available */}
              {weatherData && (
                <Box mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h2">{weatherData.current.tempC}°C</Typography>
                          <Typography variant="h6">{weatherData.current.condition.text}</Typography>
                          <Typography variant="body2">
                            Feels like: {weatherData.current.feelslikeC}°C
                          </Typography>
                          <Typography variant="body2">Humidity: {weatherData.current.humidity}%</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">Additional Details</Typography>
                          <Typography variant="body2">Wind: {weatherData.current.windKph} kph from {weatherData.current.windDir}</Typography>
                          <Typography variant="body2">Pressure: {weatherData.current.pressureMb} mb</Typography>
                          <Typography variant="body2">Precipitation: {weatherData.current.precipMm} mm</Typography>
                          <Typography variant="body2">Visibility: {weatherData.current.visKm} km</Typography>
                          <Typography variant="body2">UV Index: {weatherData.current.uv}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <img
                        src={process.env.PUBLIC_URL + "/assets/Login.png"}
                        alt="About"
                        style={{ width: '100%', borderRadius: 4 }}
                      />
                    </Grid>
                  </Grid>

                  {/* 10-day forecast section can go here if needed */}
                </Box>
              )}

              {/* Form Fields (if you have other fields below) */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Your form fields */}
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Box>
  );
}
