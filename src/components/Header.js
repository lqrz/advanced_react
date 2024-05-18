import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link, color, keyframes } from "@chakra-ui/react";

const socials = [
  {
    id: 1,
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    id: 2,
    icon: faGithub,
    url: "https://github.com",
  },
  {
    id: 3,
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    id: 4,
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    id: 5,
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const StyleNavElements = ({ children, margin }) => {
  // modifies the style props of the children params.
  const newStyle = {
    marginLeft: `${margin}px`,
  };
  return (
    <>
      {React.Children.map(children, (c, ix) => {
        return React.cloneElement(c, {
          style: {
            ...c.props.style,
            ...(ix > 0 ? newStyle : {}),
          },
        });
      })}
    </>
  );
};

function usePrevious(val) {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref.current;
}

const Header = () => {
  const [click, setClick] = useState("");
  const [scrollPosition, setScrollPosition] = useState({});

  const previousScrollPosition = usePrevious(scrollPosition);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    handleClick(click)();
    return () => setClick("");
  }, [click]);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  // subscribe to scrolling.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translation =
    previousScrollPosition !== undefined &&
    scrollPosition - previousScrollPosition > 0
      ? "-200px"
      : "0px";

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={`translateY(${translation})`}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={999}
      // ref={ref}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <StyleNavElements margin="20">
              {socials.map((x) => (
                <a key={x.id} href={x.url} target="_blank">
                  <FontAwesomeIcon icon={x.icon} size="2x" />
                </a>
              ))}
            </StyleNavElements>
          </nav>
          <nav>
            <HStack spacing={8}>
              <Link onClick={() => setClick("projects")}>Projects</Link>
              <Link onClick={() => setClick("contactme")}>Contact me</Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
