import { FormEvent, useEffect, useState } from "react"
import { Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Status } from "@/types/status"
import { useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"

import SubmitButton from "../common/SubmitButton"
import { UserModelSchemaType, UserRegistrationSchema, UserRegistrationSchemaType } from "@/schema/UserSchema"
import { useUser } from "@/lib/hooks/useUser"

import { GoogleLogin } from "@react-oauth/google"

const initialValues = {
  name: "",
  email: "",
  password: "",
}

const Login = () => {
  const [status, setStatus] = useState<Status>("idle")

  const { data, mutate } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (data?.payload) {
      router.replace("/home")
    }
  }, [data?.payload, router])

  const loginUser = async (data: Omit<UserRegistrationSchemaType, "name">) => {
    setStatus("loading")
    // Check if the credentials match the hardcoded values
    // if (data.email === "test@gmail.com" && data.password === "Test?1234") {
    if (data.email === "test@gmail.com" && data.password === "1") {
      // Simulate a successful response
      const fakeUserPayload = { id: '1', email: 'test@gmail.com' }; // Mocked user object
      mutate({ payload: fakeUserPayload }, false);
      setStatus("success");
    } else {
      toast.error("Invalid credentials");
      setStatus("error");
      formik.resetForm();
    }
  }

  const handleGoogleLogin = async (credentialResponse: any) => {
    setStatus("success");
    console.log(credentialResponse);
    const fakeUserPayload = { id: '1', email: 'test@gmail.com' };
    mutate({ payload: fakeUserPayload }, false);
  }

  const formik = useFormik({
    initialValues,
    validate: toFormikValidate(UserRegistrationSchema.omit({ name: true })),
    onSubmit: (formValues) => {
      loginUser(formValues)
    },
  })

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        marginTop: 20,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{
            padding: 5,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in to CS458
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Software Verification and Validation
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 1,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Login with your email address
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              variant="outlined"
              placeholder=""
              helperText={(formik.touched.email && formik.errors.email) || " "}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <SubmitButton
                text="Sign in Now"
                isLoading={status === "loading" || status === "success"}
                isDisabled={!formik.isValid || status === "loading" || status === "success"}
              />
            </Box>
            <Box sx={{ pt: 2, pb: 1 }}>
              <Typography align="center" variant="body1">
                Or sign in with Google
              </Typography>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  handleGoogleLogin(credentialResponse);
                }}
                onError={() => {
                  toast.error("Google login failed");
                }}
              />
            </Box>
          </form>
        </Paper>
      </Container>
    </Box >
  )
}

export default Login
