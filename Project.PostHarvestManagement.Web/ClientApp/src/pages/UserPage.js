import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Stack, TextField, Box, Table, TableHead, TableBody, TableRow, TableCell, Button, MenuItem, Grid } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

export default function DonationRequestAdd() {
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const DonationRequestSchema = Yup.object().shape({
    farmerName: Yup.string().required('Farmer Name Required'),
    nic: Yup.string().required('NIC Required'),
    tpNumber: Yup.string().required('TP Number Required'),
    district: Yup.string().required('District Required'),
    fieldType: Yup.string().required('Field Type Required'),
    landExtent: Yup.string().required('Cultivatable Land Extent Required'),
    farmingPractice: Yup.string().required('Farming Practice Required'),
    technologiesUsed: Yup.string().required('Technologies Used Required'),
    irrigationMethod: Yup.string().required('Field Irrigation Method Required'),
    waterSource: Yup.string().required('Water Source Required'),
    collectionPointID: Yup.number().min(1, 'Please Select Collection Point').required('Collection Point Required'),
    cropTypeName: Yup.string().required('Crop Name Required'),
    transportType : Yup.string().required('Tranaport Rate Required'),
    cropCategory: Yup.string().required('Crop Category Required'),
    harvestedLocation: Yup.string().required('Harvested Location Required'),
    cropPrice: Yup.number().required('Crop Price Required').positive('Price must be a positive number'),
    registerNumber: Yup.string().required('Register Number Required'),
    registerDate: Yup.string().required('Register Date Required'),
  });

  const formik = useFormik({
    initialValues: {
      farmerName: '',
      nic: '',
      tpNumber: '',
      district: '',
      fieldType: '',
      landExtent: '',
      farmingPractice: '',
      technologiesUsed: '',
      irrigationMethod: '',
      waterSource: '',
      collectionPointID: 0,
      cropTypeName: '',
      transportType : '',
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
      farmerName:selectedRecord.farmerName,
      nic: selectedRecord.nic,
      tpNumber:selectedRecord.tpNumber ,
      district: selectedRecord.district,
      fieldType:selectedRecord.fieldType ,
      landExtent:selectedRecord.landExtent ,
      farmingPractice:selectedRecord.farmingPractice ,
      technologiesUsed: selectedRecord.technologiesUsed,
      irrigationMethod:selectedRecord.irrigationMethod ,
      waterSource:selectedRecord.waterSource ,
      collectionPointID: selectedRecord.collectionPointID,
      cropTypeName: selectedRecord.cropTypeName,
      transportType :selectedRecord.transportType,
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
          farmerName:selectedRecord.farmerName,
          nic: selectedRecord.nic,
          tpNumber:selectedRecord.tpNumber ,
          district: selectedRecord.district,
          fieldType:selectedRecord.fieldType ,
          landExtent:selectedRecord.landExtent ,
          farmingPractice:selectedRecord.farmingPractice ,
          technologiesUsed: selectedRecord.technologiesUsed,
          irrigationMethod:selectedRecord.irrigationMethod ,
          waterSource:selectedRecord.waterSource ,
          collectionPointID: selectedRecord.collectionPointID,
          cropTypeName: selectedRecord.cropTypeName,
          transportType :selectedRecord.transportType,
          cropCategory: selectedRecord.cropCategory,
          harvestedLocation: selectedRecord.harvestedLocation,
          cropPrice: selectedRecord.cropPrice,
          registerNumber: selectedRecord.registerNumber,
          registerDate: selectedRecord.registerDate,
        };

      const result = await axios.post('https://localhost:7211/api/FarmerRegistration/SaveFarmerRegistration', model);
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
        <title> FarmerRegistration | PostHarvestManagement </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Farmer Registration
        </Typography>
        <FormikProvider value={formik}>
          <ToastContainer position="bottom-right" pauseOnHover />
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                {/* Farmer Name */}
                <TextField
                  fullWidth
                  size="small"
                  label="Farmer Name *"
                  {...getFieldProps('farmerName')}
                  error={Boolean(touched.farmerName && errors.farmerName)}
                  helperText={touched.farmerName && errors.farmerName}
                />

                {/* NIC */}
                <TextField
                  fullWidth
                  size="small"
                  label="NIC *"
                  {...getFieldProps('nic')}
                  error={Boolean(touched.nic && errors.nic)}
                  helperText={touched.nic && errors.nic}
                />

                {/* TP Number */}
                <TextField
                  fullWidth
                  size="small"
                  label="TP Number *"
                  {...getFieldProps('tpNumber')}
                  error={Boolean(touched.tpNumber && errors.tpNumber)}
                  helperText={touched.tpNumber && errors.tpNumber}
                />

                {/* District Dropdown */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="District *"
                  value={values.district}
                  onChange={formik.handleChange}
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

                {/* Field Type */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Field Type *"
                  value={values.fieldType}
                  onChange={formik.handleChange}
                  {...getFieldProps('fieldType')}
                  error={Boolean(touched.fieldType && errors.fieldType)}
                  helperText={touched.fieldType && errors.fieldType}
                >
                  <MenuItem key={0} value={0}>Select Field Type</MenuItem>
                  <MenuItem value="Open Field">Open Field</MenuItem>
                  <MenuItem value="Poly Tunnel">Poly Tunnel</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Cultivatable Land Extent */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Cultivatable Land Extent *"
                  value={values.landExtent}
                  onChange={formik.handleChange}
                  {...getFieldProps('landExtent')}
                  error={Boolean(touched.landExtent && errors.landExtent)}
                  helperText={touched.landExtent && errors.landExtent}
                >
                  <MenuItem key={0} value={0}>Select Cultivatable Land Extent</MenuItem>
                  <MenuItem value="Acres">Acres</MenuItem>
                  <MenuItem value="Perches">Perches</MenuItem>
                  <MenuItem value="Sq.ft">Sq.ft</MenuItem>
                </TextField>

              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>


                {/* Farming Practice */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Farming Practice *"
                  value={values.farmingPractice}
                  onChange={formik.handleChange}
                  {...getFieldProps('farmingPractice')}
                  error={Boolean(touched.farmingPractice && errors.farmingPractice)}
                  helperText={touched.farmingPractice && errors.farmingPractice}
                >
                  <MenuItem key={0} value={0}>Select Farming Practice</MenuItem>
                  <MenuItem value="Conventional">Conventional</MenuItem>
                  <MenuItem value="Gap">Gap</MenuItem>
                  <MenuItem value="Bee Safe">Bee Safe</MenuItem>
                  <MenuItem value="Organic">Organic</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Technologies Used */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Technologies Used *"
                  value={values.technologiesUsed}
                  onChange={formik.handleChange}
                  {...getFieldProps('technologiesUsed')}
                  error={Boolean(touched.technologiesUsed && errors.technologiesUsed)}
                  helperText={touched.technologiesUsed && errors.technologiesUsed}
                >
                  <MenuItem key={0} value={0}>Select Technologies Used</MenuItem>
                  <MenuItem value="Irrigation">Irrigation</MenuItem>
                  <MenuItem value="Fertigation">Fertigation</MenuItem>
                  <MenuItem value="Sensors">Sensors</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Field Irrigation Method */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Field Irrigation Method *"
                  value={values.irrigationMethod}
                  onChange={formik.handleChange}
                  {...getFieldProps('irrigationMethod')}
                  error={Boolean(touched.irrigationMethod && errors.irrigationMethod)}
                  helperText={touched.irrigationMethod && errors.irrigationMethod}
                >
                  <MenuItem key={0} value={0}>Select Field Irrigation Method</MenuItem>
                  <MenuItem value="Drip<">Drip</MenuItem>
                  <MenuItem value="Sprinkler">Sprinkler</MenuItem>
                  <MenuItem value="Flood">Flood</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Water Source */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Water Source *"
                  value={values.waterSource}
                  onChange={formik.handleChange}
                  {...getFieldProps('waterSource')}
                  error={Boolean(touched.waterSource && errors.waterSource)}
                  helperText={touched.waterSource && errors.waterSource}
                >
                  <MenuItem key={0} value={0}>Select Water Source</MenuItem>
                  <MenuItem value="Agro-Well">Agro-Well</MenuItem>
                  <MenuItem value="Deep-Well">Deep-Well</MenuItem>
                  <MenuItem value="Canal Water">Canal Water</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

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

                {/* Crop Name */}
                <TextField
                  fullWidth
                  size="small"
                  label="Crop Name *"
                  {...getFieldProps('cropTypeName')}
                  error={Boolean(touched.cropTypeName && errors.cropTypeName)}
                  helperText={touched.cropTypeName && errors.cropTypeName}
                />


              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Transport Type */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Transport Type *"
                  value={values.transportType}
                  onChange={formik.handleChange}
                  {...getFieldProps('transportType')}
                  error={Boolean(touched.transportType && errors.transportType)}
                  helperText={touched.transportType && errors.transportType}
                >
                  <MenuItem value="Lorry">Lorry</MenuItem>
                  <MenuItem value="Bus">Bus</MenuItem>
                  <MenuItem value="Threewheel">Threewheel</MenuItem>
                  <MenuItem value="Bicycle">Bicycle</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Crop Category */}
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
                  <MenuItem key={0} value={0}>
                    Select Crop Category
                  </MenuItem>
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
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Farmer Name</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>TP Number</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Field Type</TableCell>
                  <TableCell>Land Extent</TableCell>
                  <TableCell>Farming Practice</TableCell>
                  <TableCell>Technologies Used</TableCell>
                  <TableCell>Irrigation Method</TableCell>
                  <TableCell>Water Source</TableCell>
                  <TableCell>Collection Point</TableCell>
                  <TableCell>Crop Name</TableCell>
                  <TableCell>Transport Type</TableCell>
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
                    <TableCell>{row.farmerName}</TableCell>
                    <TableCell>{row.nic}</TableCell>
                    <TableCell>{row.tpNumber}</TableCell>
                    <TableCell>{row.district}</TableCell>
                    <TableCell>{row.fieldType}</TableCell>
                    <TableCell>{row.landExtent}</TableCell>
                    <TableCell>{row.farmingPractice}</TableCell>
                    <TableCell>{row.technologiesUsed}</TableCell>
                    <TableCell>{row.irrigationMethod}</TableCell>
                    <TableCell>{row.waterSource}</TableCell>
                    <TableCell>{collectionTypes.find((type) => type.collectionPointID === row.collectionPointID)?.collectionPointName}</TableCell>
                    <TableCell>{row.cropTypeName}</TableCell>
                    <TableCell>{row.transportType}</TableCell>
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
          </Box>

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
