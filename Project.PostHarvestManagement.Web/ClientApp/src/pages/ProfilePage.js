import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1),
    },
    name: {
        fontWeight: 'bold',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    subtitle: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
    },
    content: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    inputField: {
        marginBottom: theme.spacing(2),
    },
}));

export default function WeatherForecast() {
    const classes = useStyles();
    const [location, setLocation] = useState('Dambulla'); // Default location
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Get your OpenWeatherMap API key and set it here
    const apiKey = 'your_actual_openweathermap_api_key'; // Replace with your OpenWeatherMap API key

    // Function to fetch weather data
    const fetchWeatherData = async (city) => {
        try {
            setLoading(true);
            setError(''); // Clear any previous errors

            // Fetch current weather
            const weatherResult = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            
            // Fetch forecast data
            const forecastResult = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

            // Set the weather and forecast data
            setWeatherData(weatherResult.data);
            setForecastData(forecastResult.data.list.filter((_, index) => index % 8 === 0)); // Daily forecast
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Failed to fetch weather data. Please check the location or try again later.');
            setLoading(false);
        }
    };

    // Fetch the initial weather data for the default location on component mount
    useEffect(() => {
        fetchWeatherData(location);
    }, []);

    // Handle form submission for fetching weather data of a selected location
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (location) {
            fetchWeatherData(location);
        }
    };

    return (
        <div className={classes.root}>
            {/* Input form for location selection */}
            <form onSubmit={handleFormSubmit}>
                <TextField
                    label="Enter Your Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={classes.inputField}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Click Get Weather Forecast
                </Button>
            </form>

            {/* Show loading message */}
            {loading && (
                <Typography variant="h6" align="center">
                    Loading...
                </Typography>
            )}

            {/* Show error message if any */}
            {error && (
                <Typography variant="h6" color="error" align="center">
                    {error}
                </Typography>
            )}

            {/* Show weather and forecast data after loading */}
            {!loading && !error && weatherData && (
                <Grid container spacing={3}>
                    {/* Current Weather Section */}
                    <Grid item xs={12} md={4} align="center">
                        <Avatar alt="Weather Icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} className={classes.avatar} />
                        <Typography variant="h5" component="h1" className={classes.name}>
                            {weatherData.name}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            {weatherData.weather[0].description}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            {weatherData.main.temp}°C (Feels like {weatherData.main.feels_like}°C)
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            Wind: {weatherData.wind.speed} km/h | Humidity: {weatherData.main.humidity}%
                        </Typography>
                    </Grid>

                    {/* Forecast Section */}
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" component="h2" align="center">
                                5 Day Forecast
                            </Typography>
                            <div className={classes.content}>
                                {forecastData.map((day, index) => (
                                    <div key={index} className="forecast-day">
                                        <Typography variant="body1">
                                            {new Date(day.dt_txt).toLocaleDateString()} - {day.weather[0].description}
                                        </Typography>
                                        <Typography variant="body1">
                                            Temp: {day.main.temp}°C | Humidity: {day.main.humidity}%
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

