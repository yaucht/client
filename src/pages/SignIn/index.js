import React from "react";
import { useFormik } from "formik";
import { Label, Input } from "@rebass/forms";
import { Box, Heading, Flex, Button } from "rebass";
import axios from "axios";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { setAccessToken } from "../../store/reducers/app";

const SignIn = ({ dispatch, history }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const accessToken = (
          await axios.post("http://localhost:3160/authenticate", {
            username: values.username,
            password: values.password,
          })
        ).data;

        dispatch(setAccessToken(accessToken));
        dispatch(push("/"));
      } catch (e) {
        // TODO: Better
        alert("Authentication failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ p: 4 }}>
      <Flex alignItems="center" height="80vh" justifyContent="center">
        <Box
          as="form"
          disabled={formik.isSubmitting}
          onSubmit={formik.handleSubmit}
          width={[1, 3 / 4, 1 / 2]}
          maxWidth={300}
        >
          <Heading textAlign="center">YAUCHT</Heading>
          <Box py={1}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.username}
              required
              pattern="[\w\-.@#$%^&*]{2,255}"
            />
          </Box>
          <Box py={1}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              pattern="^\w{2,255}$"
            />
          </Box>

          <Box py={1}>
            <Button disabled={formik.isSubmitting} type="submit" width="100%">
              Sign In
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default connect()(SignIn);
