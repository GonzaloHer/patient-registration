import { useState } from "react";

interface Patient {
  id: number;
  full_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  document_photo: string;
}

interface Props {
  patient: Patient;
}

export default function PatientCard({ patient }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg shadow-2xl overflow-hidden">
      <div className="h-36 md:h-40">
        <img
          src={`data:image/jpeg;base64,${patient.document_photo}`}
          alt="Document"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 relative">
        <h3 className="text-lg md:text-xl mb-2">{patient.full_name}</h3>
        {expanded && (
          <div className="text-sm text-slate-500 space-y-1">
            <p>Email: {patient.email}</p>
            <p>
              Phone: {patient.phone_country_code} {patient.phone_number}
            </p>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 text-sm"
        >
          {expanded ? "Hide details" : "View details"}
        </button>
      </div>
    </div>
  );
}
