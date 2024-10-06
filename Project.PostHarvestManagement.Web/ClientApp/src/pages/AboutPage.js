import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Typography, Container, Grid, Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
    },
    socialMedia: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    socialMediaIcon: {
        marginRight: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------

export default function AboutPage() {
    const classes = useStyles();

    return (
        <>
            <Helmet>
                <title>About | PostHarvestManagement</title>
            </Helmet>

            <Container>
                <Box py={4}>
                    <Typography variant="h4" gutterBottom>
                    About Our Post-Harvest Management website
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" paragraph>
                            Welcome to our Post-Harvest Management website! Our platform is designed to enhance post-harvest management in Sri Lanka through the integration of cutting-edge AI and data science technologies.
                            </Typography>
                            <Typography variant="body1" paragraph>
                            Recognizing the challenges faced by farmers—such as inefficiencies in storage, transportation, and market access—our mission is to minimize post-harvest losses and increase agricultural sustainability. 
                            </Typography>
                            <Typography variant="body1" paragraph>
                            By leveraging AI-driven solutions, we optimize storage conditions, streamline supply chain processes, and provide data-driven insights to improve decision-making for farmers. Our goal is to empower the agricultural community, improve food security, and contribute to the sustainable development of Sri Lanka's agricultural sector.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={process.env.PUBLIC_URL + "/assets/Logo.png"} alt="About" style={{ width: '100%', borderRadius: 4 }} />
                            {/* <img src={process.env.PUBLIC_URL + "/assets/farming.jpg"} alt="Post-Harvest Management" style={{ width: '100%', borderRadius: 4 }} /> */}

                        </Grid>
                    </Grid>
                </Box>

                <Box py={4}>
                    <Typography variant="h5" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions or inquiries, please feel free to contact us:
                    </Typography>
                    <Typography variant="body1">
                        <b>Email: PostHarvestManagement@gmail.com</b>
                    </Typography>
                    <Typography variant="body1">
                        <b>Phone: 066-2283122</b>
                    </Typography>
                </Box>

                <Box className={classes.socialMedia}>
                    <Link href="https://example.com/facebook" target="_blank" rel="noopener" className={classes.socialMediaIcon} style={{ width: '50px', height: '50px' }} >
                        <img src={process.env.PUBLIC_URL + "/assets/logo-facebookpng-32204.png"} alt="Facebook" />
                    </Link>
                    <Link href="https://example.com/twitter" target="_blank" rel="noopener" className={classes.socialMediaIcon} style={{ width: '50px', height: '50px' }}>
                        <img src={process.env.PUBLIC_URL + "/assets/logo-twitter-png-5860.png"} alt="Twitter" />
                    </Link>
                    <Link href="https://example.com/instagram" target="_blank" rel="noopener" className={classes.socialMediaIcon} style={{ width: '50px', height: '50px' }}>
                        <img src={process.env.PUBLIC_URL + "/assets/logo-ig-png-32464.png"} alt="Instagram" />
                    </Link>
                </Box>

            </Container>
        </>
    );
}
