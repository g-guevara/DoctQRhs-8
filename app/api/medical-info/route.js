// File: app/api/medical-info/route.js
import { randomUUID } from 'crypto';
import dbConnect from '../../../models/db';
import User from '../../../models/User';
import MedicalInfo from '../../../models/MedicalInfo';

// GET handler to check if medical info exists for the user
export async function GET(req) {
  try {
    await dbConnect();
    
    // For demo purposes - in production, get user ID from session/token
    // This is just a placeholder - you should implement proper auth
    const userId = "demo-user-id";
    
    // Check if medical info exists
    const medicalInfo = await MedicalInfo.findOne({ userId });
    
    return new Response(
      JSON.stringify({ 
        exists: !!medicalInfo,
        publicUrl: medicalInfo ? `/view/${medicalInfo.publicId}` : null
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error fetching medical info:', error);
    return new Response(
      JSON.stringify({ error: 'Error retrieving medical information' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// POST handler to save medical info
export async function POST(req) {
  try {
    await dbConnect();
    
    // Parse request body
    const medicalInfo = await req.json();
    
    // For demo purposes - in production, get user ID from session/token
    // This is just a placeholder - you should implement proper auth
    const userId = "demo-user-id";
    
    // Generate a public ID if needed
    const publicId = randomUUID();
    
    // Return success
    return new Response(
      JSON.stringify({ 
        message: 'Medical information saved successfully',
        publicUrl: `/view/${publicId}`
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error saving medical info:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error saving medical information',
        details: error.message
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}