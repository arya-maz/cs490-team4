//import React from 'react';
//import { render, screen } from "@testing-library/react";
//import {} from "./LoginRegister.jsx"
import { login, register } from '../AuthenticationAPI/AuthenAPI.jsx';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

//mock axios
const mock = new MockAdapter(axios);

//test suite: Login
describe("Captures Login info", () => {
  afterEach(() => {
    mock.reset(); // reset mock after each test
  });

  //test case 1
  it("Sends login credentials and receives success response", async () => {
    // Mock the /api/login endpoint
    mock.onPost("api/login").reply(200, { message: "Login successful"});

    // Call the handleLogin function
    const response = await login("Steph-Curry", "password123");

    // Behaviour assertion
    expect(response).toEqual({ message: "Login successful" });
  });

  //test case 2
  it("handles login error responce", async () => {
    // Mock the /api/login endpoint with an error
    mock.onPost("api/login").reply(401, { message: "Invalid credentials"});

    try {
      await login("Steph-Curry", "@4rings"); 
    } catch (error) {
      //behaviour assertion
      expect(error.response.data).toEqual({ message: "Invalid credentials"});
    }
  });

});

//test suite: Register
describe("Captures Register info", () => {
  afterEach(() => {
    mock.reset(); // reset mock after each test
  });
  
  //test case 1
  it("sends registration details and receives success response", async () => {
    // Mock the /api/register endpoint
    mock.onPost("/api/register").reply(201, { message: "Registration successful" });

    // Call the handleRegister function
    const response = await register("newuser", "test@example.com", "password123");

    // Behaviour assertion
    expect(response).toEqual({ message: "Registration successful" });
  });

  //test case 2
  it("handles registration error response", async () => {
    // Mock the /api/register endpoint with an error
    mock.onPost("/api/register").reply(400, { message: "Email already exists" });

    try {
      await register("newuser", "test@example.com", "password123");
    } catch (error) {
      // Behaviour assertion
      expect(error.response.data).toEqual({ message: "Email already exists" });
    }
  });
});