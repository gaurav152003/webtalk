import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload()

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="20px">
      <FormControl id="email" isRequired>
        <FormLabel fontFamily="'Segoe UI', sans-serif" fontSize="md" fontWeight="semibold">
          Email Address
        </FormLabel>
        <Input
          value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            fontFamily="'Segoe UI', sans-serif"
            fontSize="sm"
            borderRadius="md"
            borderColor="gray.400"
            _placeholder={{ color: "gray.500", fontStyle: "italic" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
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

      <Button
        colorScheme="blue"
        width="100%"
        mt={2}
        onClick={submitHandler}
        isLoading={loading}
        fontFamily="'Segoe UI', sans-serif"
        fontWeight="medium"
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
        fontFamily="'Segoe UI', sans-serif"
        fontWeight="medium"
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;
