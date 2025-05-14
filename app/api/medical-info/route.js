// File: app/api/medical-info/route.js
import { randomUUID } from 'crypto';
import dbConnect from '../../../models/db';
import User from '../../../models/User';
import MedicalInfo from '../../../models/MedicalInfo';

// GET handler to check if medical info exists for the user
export async function GET(req) {
  try {
    await dbConnect();
    console.log('Database connected in GET handler');
    
    // For demo purposes - in production, get user ID from session/token
    // This is just a placeholder - you should implement proper auth
    const userId = "demo-user-id";
    
    // Check if medical info exists
    const medicalInfo = await MedicalInfo.findOne({ userId });
    console.log('Medical info found:', !!medicalInfo);
    
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
      JSON.stringify({ error: 'Error retrieving medical information', details: error.message }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// POST handler to save medical info
export async function POST(req) {
  console.log('POST handler called');
  
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');
    
    // Parse request body
    const medicalInfoData = await req.json();
    console.log('Received medical info data:', JSON.stringify(medicalInfoData).substring(0, 100) + '...');
    
    // For demo purposes - in production, get user ID from session/token
    // This is just a placeholder - you should implement proper auth
    const userId = medicalInfoData.userId || "demo-user-id";
    console.log('Using userId:', userId);
    
    // Generate a public ID
    const publicId = randomUUID();
    console.log('Generated publicId:', publicId);
    
    try {
      // Check if MedicalInfo model is defined
      console.log('MedicalInfo model:', typeof MedicalInfo);
      
      // Check if a profile already exists for this user
      console.log('Checking for existing profile...');
      const existingProfile = await MedicalInfo.findOne({ userId });
      console.log('Existing profile found:', !!existingProfile);
      
      if (existingProfile) {
        // Update existing profile with new data
        console.log('Updating existing profile');
        Object.assign(existingProfile, medicalInfoData);
        existingProfile.updatedAt = new Date();
        
        try {
          await existingProfile.save();
          console.log('Profile updated successfully');
          
          return new Response(
            JSON.stringify({ 
              message: 'Medical information updated successfully',
              publicId: existingProfile.publicId,
              publicUrl: `/view/${existingProfile.publicId}`
            }), 
            { 
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        } catch (saveError) {
          console.error('Error saving existing profile:', saveError);
          throw saveError;
        }
      } else {
        // Create a new medical profile
        console.log('Creating new profile');
        try {
          const newProfile = new MedicalInfo({
            userId,
            publicId,
            ...medicalInfoData
          });
          
          console.log('New profile created, saving to database...');
          await newProfile.save();
          console.log('New profile saved successfully');
          
          return new Response(
            JSON.stringify({ 
              message: 'Medical information saved successfully',
              publicId: publicId,
              publicUrl: `/view/${publicId}`
            }), 
            { 
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        } catch (createError) {
          console.error('Error creating new profile:', createError);
          throw createError;
        }
      }
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Error saving medical info:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error saving medical information',
        details: error.message,
        stack: error.stack
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}