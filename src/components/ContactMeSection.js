import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const [submissionData, setSubmissionData] = useState({});
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const url_endpoint = "https://someendpoint.com/post/";
  useEffect(() => {
    // send only when the form was submitted.
    if (Object.keys(submissionData).length > 0) {
      submit(url_endpoint, submissionData);
    }
  }, [submissionData]);

  useEffect(() => {
    if (response !== undefined && response !== null) {
      onOpen(response.type, response.message);
      if (response.type == "success") {
        formik.resetForm();
      }
    }
  }, [response]);

  const formik = useFormik({
    initialValues: { firstName: "", email: "", type: "hireMe", comment: "" },
    onSubmit: (values) => {
      setSubmissionData({ ...values });
    },
    validationSchema: Yup.object({
      firstName: Yup.string().trim().required(),
      email: Yup.string().trim().email().required(),
      type: Yup.string().trim().required(),
      comment: Yup.string().trim().required(),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#4A5C6A"
      // backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form action="" onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.comment && formik.errors.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                backgroundColor="#CCD0CF"
                width="full"
                disabled={isLoading || !(formik.isValid && formik.dirty)}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
