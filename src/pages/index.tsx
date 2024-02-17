import Head from "next/head"
import Login from "@/components/auth/Login"
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  return (
    <>
      {/* <GoogleOAuthProvider clientId="620842454232-1gn4c0ri5jdk2e5eu3sr6oi7snlg0sr9.apps.googleusercontent.com" > */}
      <Head>
        <title>CS458 Software Verification and Validation</title>
      </Head>
      <Login />
      {/* </GoogleOAuthProvider> */}
    </>
  )
}
