"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";

export default function CardUIChakra({
  imageUri,
  heading,
  text,
  footerText,
  // ------------------------
  cardProps,
  cardBodyProps,
  imageProps,
  stackProps,
  headingProps,
  textProps,
  cardFooterProps,
  footerTextProps,
}) {
  return (
    <Card {...cardProps}>
      <CardBody { ...cardBodyProps}>
        {imageUri && <Image
          src={imageUri}
          {...imageProps}
        />}
        <Stack {...stackProps}>
          <Heading {...headingProps}>{heading}</Heading>
          <Text { ...textProps}>{text}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter {...cardFooterProps}>
        <Text {...footerTextProps}>
          {footerText}
        </Text>
      </CardFooter>
    </Card>
  );
}
