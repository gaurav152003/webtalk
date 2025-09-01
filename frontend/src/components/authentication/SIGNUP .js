import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload()
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "webtalk");
      data.append("cloud_name", "marvelll");
      fetch("https://api.cloudinary.com/v1_1/marvelll/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack spacing="15px">
      <FormControl id="first-name" isRequired>
        <FormLabel fontFamily="'Segoe UI', sans-serif" fontSize="md" fontWeight="semibold">
          Name
        </FormLabel>
        <Input
          placeholder="Enter Your Name"
          fontFamily="'Segoe UI', sans-serif"
          fontSize="sm"
          borderRadius="md"
          borderColor="gray.400"
          _placeholder={{ color: "gray.500", fontStyle: "italic" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel fontFamily="'Segoe UI', sans-serif" fontSize="md" fontWeight="semibold">
          Email Address
        </FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          fontFamily="'Segoe UI', sans-serif"
          fontSize="sm"
          borderRadius="md"
          borderColor="gray.400"
          _placeholder={{ color: "gray.500", fontStyle: "italic" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel fontFamily="'Segoe UI', sans-serif" fontSize="md" fontWeight="semibold">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            fontFamily="'Segoe UI', sans-serif"
            fontSize="sm"
            borderRadius="md"
            borderColor="gray.400"
            _placeholder={{ color: "gray.500", fontStyle: "italic" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="3rem" cursor="pointer">
            {show ? (
              <AiFillEyeInvisible onClick={handleClick} />
            ) : (
              <AiFillEye onClick={handleClick} />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel fontFamily="'Segoe UI', sans-serif" fontSize="md" fontWeight="semibold">
          Confirm Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            fontFamily="'Segoe UI', sans-serif"
            fontSize="sm"
            borderRadius="md"
            borderColor="gray.400"
            _placeholder={{ color: "gray.500", fontStyle: "italic" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="3rem" cursor="pointer">
            {show ? (
              <AiFillEyeInvisible onClick={handleClick} />
            ) : (
              <AiFillEye onClick={handleClick} />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel fontFamily="'Segoe UI', sans-serif" fontSize="md" fontWeight="semibold">
          Upload your Picture
        </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          fontFamily="'Segoe UI', sans-serif"
          fontSize="sm"
          borderRadius="md"
          borderColor="gray.400"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        mt={2}
        onClick={submitHandler}
        isLoading={picLoading}
        fontFamily="'Segoe UI', sans-serif"
        fontWeight="medium"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
