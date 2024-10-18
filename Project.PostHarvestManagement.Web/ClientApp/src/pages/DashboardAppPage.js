import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const theme = useTheme();

  const [userId, setUserId] = useState(null);
  const [donationTypeLegnth, setDonationTypeLegnth] = useState(0);
  const [donorLegnth, setDonorLegnth] = useState(0);
  const [seekerLegnth, setSeekerLegnth] = useState(0);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);
  }, []);

  useEffect(() => {
    GetAllDonationTypeLength();
    GetAllDonorLength();
    GetAllSeekerLength();
  }, []);

  async function GetAllDonationTypeLength() {
    const result = await axios.get('https://localhost:7211/api/DonationType/GetAllDonationTypeLength');
    setDonationTypeLegnth(result.data.data.length)
    return;
  }

  async function GetAllDonorLength() {
    const result = await axios.get('https://localhost:7211/api/Donor/GetAllDonorLength');
    setDonorLegnth(result.data.data.length)
    return;
  }

  async function GetAllSeekerLength() {
    const result = await axios.get('https://localhost:7211/api/Seeker/GetAllSeekerLength');
    setSeekerLegnth(result.data.data.length)
    return;
  }
  return (
    <>
      <Helmet>
        <title> Dashboard | PostHarvestManagement </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Crops" total={donorLegnth} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Farmers" total={seekerLegnth} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Collection Points" total={1} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Sellers" total={donationTypeLegnth} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/10/2024',
                '02/10/2024',
                '03/10/2024',
                '04/10/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
              ]}
              chartData={[
                {
                  name: 'Farmers',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Sellers',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'North Western', value: 10 },
                { label: 'Western', value: 20 },
                { label: 'Central', value: 30 },
                { label: 'North Central', value: 40 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Harvesting Rates "
              subheader="(+43%) than last month"
              chartData={[
                // { label: 'Eastern Province', value: 400 },
                { label: 'Eastern Province', value: 430 },
                { label: 'Sabaragamuwa Province', value: 448 },
                { label: 'Western Province ', value: 470 },
                { label: 'Southern Province', value: 540 },
                { label: 'Uva Province', value: 580 },
                { label: 'Northern Province', value: 690 },
                { label: 'North Western Province', value: 1100 },
                { label: 'Central Province', value: 1200 },
                { label: 'North Central Province', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Harvesting Types Types"
              chartLabels={['Farmers', 'Sellers', 'Crops', 'Administration']}
              chartData={[
                { name: 'Auguest', data: [80, 50, 30, 40] },
                { name: 'Septhember', data: [20, 30, 40, 80] },
                { name: 'October', data: [44, 76, 78, 13] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Donation Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Kidney Donation Request',
                  'Blood Donation Request',
                  'Hair Donation Request',
                  'Blood Availability',
                  'Donation Campaingn'
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Donate 100 Kidneys to patients' },
                { id: '2', label: 'Gather the best community in the donation area' },
                { id: '3', label: 'Help needy patients to recover from their illnesses' },
                { id: '4', label: 'Donate 100,000 Money ' },
                { id: '5', label: 'Spread the system around the country' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
