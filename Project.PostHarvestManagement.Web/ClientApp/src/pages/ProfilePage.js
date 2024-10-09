import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Stack, TextField, Box, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

export default function DonationRequestAdd() {
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [location, setLocation] = useState(''); // State for location input

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
      setTableData([...tableData, values]);
      formik.resetForm();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    getCollectionPointsForTheDropDown();
  }, []);

  async function getCollectionPointsForTheDropDown() {
    const result = await axios.get('https://localhost:7211/api/CollectionPoint/GetCollectionPointsForTheDropDown');
    setCollectionTypes(result.data.data);
  }

  async function handleSearchWeather() {
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
  }

  return (
    <Box>
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
                  <Typography variant="h6">Weather Forecast for {weatherData.location.name}, {weatherData.location.country}</Typography>
                  <Typography>Temperature: {weatherData.current.tempC} °C</Typography>
                  <Typography>Condition: {weatherData.current.condition.text}</Typography>
                  <Typography>Humidity: {weatherData.current.humidity} %</Typography>
                  <Typography>Wind: {weatherData.current.windKph} kph from {weatherData.current.windDir}</Typography>
                  <Typography>Pressure: {weatherData.current.pressureMb} mb</Typography>
                  <Typography>Precipitation: {weatherData.current.precipMm} mm</Typography>
                  <Typography>Visibility: {weatherData.current.visKm} km</Typography>
                  <Typography>UV Index: {weatherData.current.uv}</Typography>
                </Box>
              )}

              {/* Form Fields */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Other form fields go here */}
              </Stack>
            </Stack>
            <br />
          </Form>
        </FormikProvider>
      </Container>
    </Box>
  );
}
