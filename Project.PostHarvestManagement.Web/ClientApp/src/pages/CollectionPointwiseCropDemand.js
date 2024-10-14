import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Stack, TextField, Box, Button, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

export default function CollectionPointwiseCropDemand() {
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [crops, setCrops] = useState([]);
  const [cropData, setCropData] = useState([]);  // State to store the API response

  // Validation Schema
  const DonationRequestSchema = Yup.object().shape({
    collectionPointID: Yup.number().min(1, 'Please Select Collection Point').required('Collection Point Required'),
    cropTypeID: Yup.string(),
    startDate: Yup.string().required('Start Date Required'),
    endDate: Yup.string().required('End Date Required'),
  });

  const formik = useFormik({
    initialValues: {
      collectionPointID: 0,
      cropTypeID: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
    validationSchema: DonationRequestSchema,
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values);

      let model = {
        collectionPointID: values.collectionPointID,
        cropTypeID: values.cropTypeID === 0 ? null : values.cropTypeID, // handle optional cropTypeID
        startDate: values.startDate,
        endDate: values.endDate,
      };
      console.log('Submitting ', model);

      try {
        // Call the API with the selected parameters
        const result = await axios.get('https://localhost:7211/api/CropDemand/GetCropDemandCollectionPointWise', model);
        
        // Check for errors in the response
        if (result.data.statusCode === "Error") {
          toast.error(result.data.message);
          return;
        } else {
          toast.success(result.data.message);
          setCropData(result.data.data); // Store the API response in cropData state
          toast.success('Data fetched successfully!');
        }
      } catch (error) {
        // Catch and log any error during the API call
        console.error('Error during API call:', error);
        toast.error('An error occurred while fetching the data.');
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  useEffect(() => {
    getCollectionPointsForTheDropDown();
    GetAllCropsForTheDropDown();
  }, []);

  async function getCollectionPointsForTheDropDown() {
    try {
      const result = await axios.get('https://localhost:7211/api/CollectionPoint/GetCollectionPointsForTheDropDown');
      setCollectionTypes(result.data.data);
    } catch (error) {
      console.error('Error fetching collection points:', error);
    }
  }

  async function GetAllCropsForTheDropDown() {
    try {
      const result = await axios.get('https://localhost:7211/api/Crop/GetAllCropsForTheDropDown');
      setCrops(result.data.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  }

  return (
    <Box>
      <Helmet>
        <title>Crop Demand Supply Wise | PostHarvestManagement</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crop Demand Supply Wise Report
        </Typography>
        <FormikProvider value={formik}>
          <ToastContainer position="bottom-right" pauseOnHover />
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Collection Point Dropdown */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Collection Point *"
                  value={values.collectionPointID}
                  onChange={formik.handleChange}
                  {...getFieldProps('collectionPointID')}
                  error={Boolean(touched.collectionPointID && errors.collectionPointID)}
                  helperText={touched.collectionPointID && errors.collectionPointID}
                >
                  <MenuItem key={0} value={0}>
                    Select Collection Point
                  </MenuItem>
                  {collectionTypes.map((item) => (
                    <MenuItem key={item.collectionPointID} value={item.collectionPointID}>
                      {item.collectionPointName}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Crop Name Dropdown */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Crop Name (Optional)"
                  value={values.cropTypeID}
                  onChange={formik.handleChange}
                  {...getFieldProps('cropTypeID')}
                  error={Boolean(touched.cropTypeID && errors.cropTypeID)}
                  helperText={touched.cropTypeID && errors.cropTypeID}
                >
                  <MenuItem key={0} value={0}>
                    Select Crop Name
                  </MenuItem>
                  {crops.map((item) => (
                    <MenuItem key={item.cropTypeID} value={item.cropTypeID}>
                      {item.cropTypeName}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Start Date */}
                <TextField
                  fullWidth
                  size="small"
                  label="Select Start Date"
                  type="date"
                  {...getFieldProps('startDate')}
                  error={Boolean(touched.startDate && errors.startDate)}
                  helperText={touched.startDate && errors.startDate}
                />

                {/* End Date */}
                <TextField
                  fullWidth
                  size="small"
                  label="Select End Date"
                  type="date"
                  {...getFieldProps('endDate')}
                  error={Boolean(touched.endDate && errors.endDate)}
                  helperText={touched.endDate && errors.endDate}
                />
              </Stack>
            </Stack>

            <br />
            <Box>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Search
                </Button>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>

        {/* Displaying data in Material UI Table */}
        <Box mt={5}>
          {cropData.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Crop Type Name</TableCell>
                    <TableCell>Crop Category</TableCell>
                    <TableCell>Harvested Location</TableCell>
                    <TableCell>Crop Price</TableCell>
                    <TableCell>Collection Point Name</TableCell>
                    <TableCell>Register Number</TableCell>
                    <TableCell>Register Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cropData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.cropTypeName}</TableCell>
                      <TableCell>{row.cropCategory}</TableCell>
                      <TableCell>{row.harvestedLocation}</TableCell>
                      <TableCell>{row.cropPrice}</TableCell>
                      <TableCell>{row.collectionPointName}</TableCell>
                      <TableCell>{row.registerNumber}</TableCell>
                      <TableCell>{new Date(row.registerDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Box>
  );
}
