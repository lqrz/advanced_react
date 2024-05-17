import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack backgroundColor="#ffffff" borderRadius="xl" color="black">
      <Image src={imageSrc} borderRadius="xl" />
      <VStack padding="5">
        <Heading color="black" alignSelf="start" size="sm">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray">
          {description}
        </Text>
        <HStack alignSelf="start">
          <Text fontSize="sm">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
