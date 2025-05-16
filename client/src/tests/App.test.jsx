import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import store from "../redux/store";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

// ✅ Reset Redux state before each test
beforeEach(() => {
  store.dispatch({ type: "auth/logout" });
});

// ✅ Helper to render components with Redux & Router context
const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("Login & Navbar Component Tests", () => {
  // 1. Test login heading renders
  it("renders login heading", () => {
    renderWithProviders(<Login />);
    const heading = screen.getByRole("heading", { name: /login/i });
    expect(heading).toBeInTheDocument();
  });

  // 2. Test input fields work
  it("allows input in login form", () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("user@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  // 3. Test login button is rendered
  it("renders login button", () => {
    renderWithProviders(<Login />);
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeInTheDocument();
  });

  // 4. Test Navbar shows user name when logged in
  it("shows user name in Navbar when logged in", () => {
    store.dispatch({
      type: "auth/login",
      payload: {
        name: "Ali",
        email: "ali@example.com",
        role: "car_owner",
      },
    });

    renderWithProviders(<Navbar />);
    const greeting = screen.getByText(/hi, ali/i);
    expect(greeting).toBeInTheDocument();
  });
});
