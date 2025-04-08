import { render, screen, fireEvent } from "@testing-library/react";
import AddPatientModal from "../AddPatientModal";
import "@testing-library/jest-dom";

describe("AddPatientModal", () => {
  it("renders modal with form fields", () => {
    render(<AddPatientModal onClose={() => {}} onPatientAdded={() => {}} />);

    expect(screen.getByText("Add Patient")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });

  it("shows validation messages on submit with empty fields", () => {
    render(<AddPatientModal onClose={() => {}} onPatientAdded={() => {}} />);
    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Only letters allowed")).toBeInTheDocument();
    expect(screen.getByText("Only @gmail.com allowed")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    expect(screen.getByText("Only .jpg images allowed")).toBeInTheDocument();
  });
});
