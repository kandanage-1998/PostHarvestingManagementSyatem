import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Stack, TextField, Box, Button, MenuItem, Grid, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

export default function DonationRequestAdd() {
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [farmers, setFarmers] = useState([]); // For farmer dropdown
  const [tableData, setTableData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectionType, setSelectionType] = useState('farmer'); // 'farmer' or 'crop'

  const DonationRequestSchema = Yup.object().shape({
    farmerName: Yup.string().when('selectionType', {
      is: 'farmer',
      then: Yup.string().required('Farmer Required'),
    }),
    cropCategory: Yup.string().when('selectionType', {
      is: 'crop',
      then: Yup.string().required('Crop Category Required'),
    }),
    cropTypeName: Yup.string().when('selectionType', {
      is: 'crop',
      then: Yup.string().required('Crop Required'),
    }),
    startDate: Yup.string().required('Start Date Required'),
    endDate: Yup.string().required('End Date Required'),
    collectionPointID: Yup.number().min(1, 'Please Select Collection Point').required('Collection Point Required'),
    district: Yup.string().required('District Required'),
  });

  const formik = useFormik({
    initialValues: {
      farmerName: '',
      cropCategory: '',
      cropTypeName: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      collectionPointID: 0,
      district: '',
    },
    validationSchema: DonationRequestSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        const updatedData = [...tableData];
        updatedData[editIndex] = values;
        setTableData(updatedData);
        setIsEditMode(false);
        setEditIndex(null);
      } else {
        setTableData([...tableData, values]);
      }
      formik.resetForm();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values, setValues } = formik;

  useEffect(() => {
    getCollectionPointsForTheDropDown();
    getFarmersForTheDropDown();
  }, []);

  async function getCollectionPointsForTheDropDown() {
    const result = await axios.get('https://localhost:7211/api/CollectionPoint/GetCollectionPointsForTheDropDown');
    setCollectionTypes(result.data.data);
  }

  async function getFarmersForTheDropDown() {
    // Fetch farmers for the 'Farmer wise' selection
    const result = await axios.get('https://localhost:7211/api/Farmer/GetFarmersForTheDropDown');
    setFarmers(result.data.data);
  }

  function handleCropOrFarmerWise(event) {
    setSelectionType(event.target.value);
  }

  return (
    <Box>
      <Helmet>
        <title>Crop Demand Supply Wise | PostHarvestManagement </title>
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
                
               {/* Collection Point */}
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

              {/* District */}
              <TextField
                select
                fullWidth
                size="small"
                label="District *"
                {...getFieldProps('district')}
                error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
              >

                <MenuItem key={0} value="">
                    Select District
                  </MenuItem>
                  <MenuItem value="Colombo">Colombo</MenuItem>
                  <MenuItem value="Gampaha">Gampaha</MenuItem>
                  <MenuItem value="Kaluthara">Kaluthara</MenuItem>
                  <MenuItem value="Kandy">Kandy</MenuItem>
                  <MenuItem value="Matale">Matale</MenuItem>
                  <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
                  <MenuItem value="Kegalle">Kegalle</MenuItem>
                  <MenuItem value="Ratnapura">Ratnapura</MenuItem>
                  <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
                  <MenuItem value="Polonnaruwa">Polonnaruwa</MenuItem>
                  <MenuItem value="Puttalam">Puttalam</MenuItem>
                  <MenuItem value="Kurunegala">Kurunegala</MenuItem>
                  <MenuItem value="Jaffna">Jaffna</MenuItem>
                  <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
                  <MenuItem value="Mannar">Mannar</MenuItem>
                  <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
                  <MenuItem value="Vavuniya">Vavuniya</MenuItem>
                  <MenuItem value="Hambantota">Hambantota</MenuItem>
                  <MenuItem value="Matara">Matara</MenuItem>
                  <MenuItem value="Galle">Galle</MenuItem>
                  <MenuItem value="Badulla">Badulla</MenuItem>
                  <MenuItem value="Monaragala">Monaragala</MenuItem>
                  <MenuItem value="Trincomalee">Trincomalee</MenuItem>
                  <MenuItem value="Batticaloa">Batticaloa</MenuItem>
                  <MenuItem value="Ampara">Ampara</MenuItem>
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

              <Stack direction="row" spacing={2}>
                {/* Radio Buttons for Selection Type */}
                <RadioGroup row value={selectionType} onChange={handleCropOrFarmerWise}>
                  <FormControlLabel value="farmer" control={<Radio />} label="Farmer wise" />
                  <FormControlLabel value="crop" control={<Radio />} label="Crop wise" />
                </RadioGroup>
              </Stack>

              {selectionType === 'farmer' ? (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {/* Farmer wise Selection */}
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Farmer *"
                    {...getFieldProps('farmerName')}
                    error={Boolean(touched.farmerName && errors.farmerName)}
                    helperText={touched.farmerName && errors.farmerName}
                  >
                    <MenuItem key={0} value="">
                      Select Farmer
                    </MenuItem>
                    {farmers.map((farmer) => (
                      <MenuItem key={farmer.id} value={farmer.name}>
                        {farmer.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              ) : (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {/* Crop wise Selection */}
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Crop Category *"
                    {...getFieldProps('cropCategory')}
                    error={Boolean(touched.cropCategory && errors.cropCategory)}
                    helperText={touched.cropCategory && errors.cropCategory}
                  >
                    <MenuItem value="Vegetable">Vegetable</MenuItem>
                    <MenuItem value="Fruit">Fruit</MenuItem>
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Crop *"
                    {...getFieldProps('cropTypeName')}
                    error={Boolean(touched.cropTypeName && errors.cropTypeName)}
                    helperText={touched.cropTypeName && errors.cropTypeName}
                  >
                    <MenuItem value="Potato">Potato</MenuItem>
                    <MenuItem value="Carrot">Carrot</MenuItem>
                    <MenuItem value="Tomato">Tomato</MenuItem>
                  </TextField>
                </Stack>
              )}

              
            </Stack>

            <br />
            <Box>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button type="submit" color="secondary" variant="contained">
                  {isEditMode ? 'Update' : 'Search'}
                </Button>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Box>
  );
}
