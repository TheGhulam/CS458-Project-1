import React, { useEffect, useState } from "react"
import { Button, Container, Paper, TextField, Typography } from "@mui/material"

const Home1 = () => {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        (error) => {
          console.error("Error getting user location:", error)
          setError("Error getting user location. Please enter latitude and longitude manually.")
        }
      )
    } else {
      setError("Geolocation is not supported by this browser.")
    }
  }, [])

  const calculateDistance = () => {
    if (latitude && longitude) {
      if (isNaN(latitude) || isNaN(longitude)) {
        setError("Invalid latitude or longitude. Please enter valid numbers.")
        return
      }

      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        setError("Latitude must be between -90 and 90, and longitude must be between -180 and 180.")
        return
      }

      const sunPosition = getSunPosition()
      const earthRadius = 6371 // in kilometers
      const sunRadius = 695700 // in kilometers
      const astronomicalUnit = 149.6e6 // in kilometers

      const dLat = deg2rad(sunPosition.latitude - latitude)
      const dLon = deg2rad(sunPosition.longitude - longitude)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(latitude)) * Math.cos(deg2rad(sunPosition.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = astronomicalUnit - earthRadius - sunRadius + earthRadius * c

      setDistance(distance)
      setError(null)
    } else {
      setError("Please enter latitude and longitude.")
    }
  }

  const getSunPosition = () => {
    // Calculate the position of the Sun based on the current date and time
    // For simplicity, let's assume a fixed position for the Sun
    return { latitude: 0, longitude: 0 }
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  return (
    <Paper
      sx={{
        flexGrow: 1,
        py: 5,
        marginTop: 10,
      }}
    >
      <Container maxWidth={false}>
        <Typography variant="h4" gutterBottom>
          Calculate Distance to Sun&apos;s Core
        </Typography>
        {error && (
          <Typography variant="body1" color="error" mb={2}>
            {error}
          </Typography>
        )}
        <TextField
          label="Latitude"
          value={latitude || ""}
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          value={longitude || ""}
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={calculateDistance}>
          Calculate Distance
        </Button>
        {distance && (
          <Typography variant="body1" mt={2}>
            The distance to the Sun&apos;s core is approximately {distance.toFixed(2)} kilometers.
          </Typography>
        )}
      </Container>
    </Paper>
  )
}

export default Home1