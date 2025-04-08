import { useState } from "react";

interface AddPatientModalProps {
  onClose: () => void;
  onPatientAdded: () => void;
}

export default function AddPatientModal({
  onClose,
  onPatientAdded,
}: AddPatientModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+598");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Required";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      newErrors.fullName = "Only letters allowed";
    }

    if (!email.trim()) {
      newErrors.email = "Required";
    } else if (!/@gmail\.com$/.test(email)) {
      newErrors.email = "Only @gmail.com allowed";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Required";
    }

    if (!file) {
      newErrors.file = "Required";
    } else if (file.type !== "image/jpeg") {
      newErrors.file = "Only .jpg images allowed";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("phone_country_code", countryCode);
    formData.append("phone_number", phoneNumber);
    formData.append("document_photo", file!);

    try {
      const response = await fetch("http://localhost:4000/patients", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        onPatientAdded();
        onClose();
      } else {
        alert("Error creating patient");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-slate-500 text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">Add Patient</h2>

        <div className="mb-4">
          <label htmlFor="fullName" className="block">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 flex gap-2">
          <div className="w-1/3">
            <label htmlFor="countryCode" className="block">
              Code
            </label>
            <input
              id="countryCode"
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-2/3">
            <label htmlFor="phoneNumber" className="block">
              Phone
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="documentPhoto" className="block">
            Document Photo (.jpg)
          </label>
          <input
            id="documentPhoto"
            type="file"
            accept="image/jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
