"use client";

import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider,
  Spinner,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { title } from "@/components/primitives";

interface MedicalInfo {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  language?: string;
  isOrganDonor?: boolean;
  isPregnant?: boolean | null;
  medications?: string[];
  allergies?: string[];
  emergencyContacts?: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  conditions?: string[];
  height?: number;
  weight?: number;
  bloodType?: string;
  additionalNotes?: string;
}

export default function MedicalInfoPage() {
  // Use the useParams hook to get the id
  const params = useParams();
  const id = params?.id as string;
  
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      if (!id) {
        setError("Invalid ID");
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/medical-info/${id}`);
        
        if (!response.ok) {
          throw new Error("Medical information not found");
        }
        
        const data = await response.json();
        setMedicalInfo(data);
      } catch (err) {
        setError("Unable to load medical information. The link may be invalid or expired.");
        console.error("Error fetching medical info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalInfo();
  }, [id]);
  
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[70vh]">
        <Spinner size="lg" label="Loading medical information..." />
      </div>
    );
  }

  if (error || !medicalInfo) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-8">
        <Card className="w-full">
          <CardBody className="p-8 text-center">
            <h2 className="text-2xl font-bold text-danger mb-4">Information Not Found</h2>
            <p className="text-gray-600">{error || "Medical information not available"}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="bg-red-600 text-white p-3 rounded-t-lg text-center mb-4">
        <h1 className="text-xl font-bold">MEDICAL INFORMATION</h1>
        <p className="text-sm">EMERGENCY USE ONLY</p>
      </div>
      
      {/* Patient Basic Information Card - Compact Design */}
      <Card className="w-full mb-4 shadow-sm">
        <CardHeader className="bg-blue-50 py-2 px-4">
          <h2 className="text-xl font-bold">Patient: {medicalInfo.firstName} {medicalInfo.lastName}</h2>
        </CardHeader>
        <CardBody className="px-4 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            {medicalInfo.birthDate && (
              <div>
                <p className="text-gray-500 font-medium">Date of Birth</p>
                <p>{medicalInfo.birthDate}</p>
              </div>
            )}
            
            {medicalInfo.bloodType && (
              <div>
                <p className="text-gray-500 font-medium">Blood Type</p>
                <p className="font-bold text-red-600">{medicalInfo.bloodType}</p>
              </div>
            )}
            
            {medicalInfo.height && (
              <div>
                <p className="text-gray-500 font-medium">Height</p>
                <p>{medicalInfo.height} cm</p>
              </div>
            )}
            
            {medicalInfo.weight && (
              <div>
                <p className="text-gray-500 font-medium">Weight</p>
                <p>{medicalInfo.weight} kg</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {medicalInfo.isOrganDonor && (
              <Chip color="primary" size="sm" variant="flat">Organ Donor</Chip>
            )}
            
            {medicalInfo.isPregnant === true && (
              <Chip color="warning" size="sm" variant="flat">Pregnant</Chip>
            )}
            
            {medicalInfo.language && (
              <Chip color="default" size="sm" variant="flat">Language: {medicalInfo.language}</Chip>
            )}
          </div>
        </CardBody>
      </Card>
      
      {/* Critical Medical Info in a 2-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Allergies - Simplified */}
        <Card className="w-full shadow-sm">
          <CardHeader className="bg-red-50 py-2 px-4">
            <h2 className="text-lg font-bold text-red-600">Allergies</h2>
          </CardHeader>
          <CardBody className="px-4 py-3">
            {medicalInfo.allergies && medicalInfo.allergies.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {medicalInfo.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No allergies listed</p>
            )}
          </CardBody>
        </Card>
        
        {/* Medical Conditions - Simplified */}
        <Card className="w-full shadow-sm">
          <CardHeader className="bg-purple-50 py-2 px-4">
            <h2 className="text-lg font-bold text-purple-600">Medical Conditions</h2>
          </CardHeader>
          <CardBody className="px-4 py-3">
            {medicalInfo.conditions && medicalInfo.conditions.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {medicalInfo.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No medical conditions listed</p>
            )}
          </CardBody>
        </Card>
      </div>
      
      {/* Medications - Simplified */}
      <Card className="w-full mb-4 shadow-sm">
        <CardHeader className="bg-blue-50 py-2 px-4">
          <h2 className="text-lg font-bold text-blue-600">Current Medications</h2>
        </CardHeader>
        <CardBody className="px-4 py-3">
          {medicalInfo.medications && medicalInfo.medications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {medicalInfo.medications.map((medication, index) => (
                <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                  {medication}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No medications listed</p>
          )}
        </CardBody>
      </Card>
      
      {/* Emergency Contacts - Table format for better compactness */}
      <Card className="w-full mb-4 shadow-sm">
        <CardHeader className="bg-amber-50 py-2 px-4">
          <h2 className="text-lg font-bold text-amber-600">Emergency Contacts</h2>
        </CardHeader>
        <CardBody className="px-2 py-2">
          {medicalInfo.emergencyContacts && medicalInfo.emergencyContacts.length > 0 ? (
            <Table 
              aria-label="Emergency contacts"
              classNames={{
                table: "min-w-full",
                th: "text-xs bg-default-100",
                td: "py-2 text-sm"
              }}
              removeWrapper
            >
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>RELATIONSHIP</TableColumn>
                <TableColumn>PHONE</TableColumn>
              </TableHeader>
              <TableBody>
                {medicalInfo.emergencyContacts.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.relationship}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-sm p-2">No emergency contacts listed</p>
          )}
        </CardBody>
      </Card>
      
      {/* Additional Notes - Only if present */}
      {medicalInfo.additionalNotes && (
        <Card className="w-full mb-4 shadow-sm">
          <CardHeader className="bg-gray-50 py-2 px-4">
            <h2 className="text-lg font-bold">Additional Information</h2>
          </CardHeader>
          <CardBody className="px-4 py-3">
            <p className="text-sm whitespace-pre-line">{medicalInfo.additionalNotes}</p>
          </CardBody>
        </Card>
      )}
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Medical information provided by DoctQR</p>
        <p>This information was shared by the patient for emergency purposes</p>
      </div>
    </div>
  );
}