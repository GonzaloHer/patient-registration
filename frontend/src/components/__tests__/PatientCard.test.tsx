import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import PatientCard from "../PatientCard";
import { Patient } from "../../types/Patient";

const patient: Patient = {
  id: 1,
  full_name: "John Doe",
  email: "johndoe@gmail.com",
  phone_country_code: "+598",
  phone_number: "12345678",
  document_photo: "data:image/jpeg;base64,base64image==",
};

describe("PatientCard", () => {
  test("renders patient name and photo", () => {
    render(<PatientCard patient={patient} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByAltText("Document")).toBeInTheDocument();
  });

  test("shows more details when expanded", () => {
    render(<PatientCard patient={patient} />);
    fireEvent.click(screen.getByText("View details"));

    expect(screen.getByText((t) => t.includes("johndoe@gmail.com"))).toBeInTheDocument();
    expect(screen.getByText((t) => t.includes("+598 12345678"))).toBeInTheDocument();
  });
});
