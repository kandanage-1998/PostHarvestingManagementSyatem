import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Stack, TextField, Box, Table, TableHead, TableBody, TableRow, TableCell, Button, MenuItem } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

export default function DonationRequestAdd() {
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
  }, []);

  async function getCollectionPointsForTheDropDown() {
    const result = await axios.get('https://localhost:7211/api/CollectionPoint/GetCollectionPointsForTheDropDown');
    setCollectionTypes(result.data.data);
  }

  function handleEdit(index) {
    setIsEditMode(true);
    setEditIndex(index);
    const selectedRecord = tableData[index];
    setValues({
      collectionPointID: selectedRecord.collectionPointID,
      cropTypeName: selectedRecord.cropTypeName,
      cropCategory: selectedRecord.cropCategory,
      harvestedLocation: selectedRecord.harvestedLocation,
      cropPrice: selectedRecord.cropPrice,
      registerNumber: selectedRecord.registerNumber,
      registerDate: selectedRecord.registerDate,
    });
  }

  async function handleSave() {
    if (editIndex !== null) {
      const selectedRecord = tableData[editIndex]; // Access the selected record
      let model = {
        collectionPointID: selectedRecord.collectionPointID,
        cropTypeName: selectedRecord.cropTypeName,
        cropCategory: selectedRecord.cropCategory,
        harvestedLocation: selectedRecord.harvestedLocation,
        cropPrice: selectedRecord.cropPrice,
        registerNumber: selectedRecord.registerNumber,
        registerDate: selectedRecord.registerDate,
      };
      console.log('Model Data:', model); // Correctly defined model

      const result = await axios.post('https://localhost:7211/api/CropRegistration/SaveCropRegistration', model);
      if (result.data.statusCode === "Error") {
        toast.error(result.data.message);
        return;
      } else {
        toast.success(result.data.message);
        setIsEditMode(false);
        setEditIndex(null);
      }
    } else {
      toast.error("No record selected for saving!");
    }
  }

  return (
    <Box>
      <Helmet>
        <title> CropRegistration | PostHarvestManagement </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crop Registration
        </Typography>
        <FormikProvider value={formik}>
          <ToastContainer position="bottom-right" pauseOnHover />
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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

                <TextField
                  fullWidth
                  size="small"
                  label="Crop Name *"
                  {...getFieldProps('cropTypeName')}
                  error={Boolean(touched.cropTypeName && errors.cropTypeName)}
                  helperText={touched.cropTypeName && errors.cropTypeName}
                />

                {/* Crop Category Dropdown */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Crop Category *"
                  value={values.cropCategory}
                  onChange={formik.handleChange}
                  {...getFieldProps('cropCategory')}
                  error={Boolean(touched.cropCategory && errors.cropCategory)}
                  helperText={touched.cropCategory && errors.cropCategory}
                >
                  <MenuItem key={0} value={0}>Select Crop Category</MenuItem>
                  <MenuItem value="Vegetable">Vegetable</MenuItem>
                  <MenuItem value="Fruit">Fruit</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  size="small"
                  label="Harvested Location *"
                  {...getFieldProps('harvestedLocation')}
                  error={Boolean(touched.harvestedLocation && errors.harvestedLocation)}
                  helperText={touched.harvestedLocation && errors.harvestedLocation}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Crop Price Per 1Kg Rs.*"
                  type="number"
                  {...getFieldProps('cropPrice')}
                  error={Boolean(touched.cropPrice && errors.cropPrice)}
                  helperText={touched.cropPrice && errors.cropPrice}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Register Number *"
                  {...getFieldProps('registerNumber')}
                  error={Boolean(touched.registerNumber && errors.registerNumber)}
                  helperText={touched.registerNumber && errors.registerNumber}
                />

                <TextField
                  fullWidth
                  size="small"
                  id="date"
                  label="Register Date *"
                  type="date"
                  {...getFieldProps('registerDate')}
                  error={Boolean(touched.registerDate && errors.registerDate)}
                  helperText={touched.registerDate && errors.registerDate}
                />
              </Stack>
            </Stack>
            <br />
            <Box>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button type="submit" color="secondary" variant="contained">
                  {isEditMode ? 'Update' : 'Submit'}
                </Button>
              </Stack>
            </Box>
          </Form>

          <br />
          <Typography variant="h5">Submitted Data</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Collection Point</TableCell>
                <TableCell>Crop Name</TableCell>
                <TableCell>Crop Category</TableCell>
                <TableCell>Harvested Location</TableCell>
                <TableCell>Crop Price Per 1Kg Rs.</TableCell>
                <TableCell>Register Number</TableCell>
                <TableCell>Register Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{collectionTypes.find((type) => type.collectionPointID === row.collectionPointID)?.collectionPointName}</TableCell>
                  <TableCell>{row.cropTypeName}</TableCell>
                  <TableCell>{row.cropCategory}</TableCell>
                  <TableCell>{row.harvestedLocation}</TableCell>
                  <TableCell>{row.cropPrice}</TableCell>
                  <TableCell>{row.registerNumber}</TableCell>
                  <TableCell>{row.registerDate}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {isEditMode && (
            <Box mt={2}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="contained" color="secondary" onClick={handleSave}>
                  Save Edited Data
                </Button>
              </Stack>
            </Box>
          )}
        </FormikProvider>
      </Container>
    </Box>
  );
}
