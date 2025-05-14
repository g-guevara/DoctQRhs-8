"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { styles } from "@/styles/doctqr-styles";
import { title } from "@/components/primitives";

export default function DoctQRPage() {
  return (
    <div className="doctqr-container w-full">
      {/* Header Start */}


      {/* Intro Section - FIXED: Section takes full width but content stays contained */}
      <section className="w-full py-20" style={{ backgroundColor: "#c8e2fe" }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                            <h2 className={`${title({ color: "blue" })} mb-4`}>
                              Carry Your Medical Info Everywhere
                            </h2>
              </div>
              <p className="text-lg mb-6">All that information and much more in one place.</p>
              <div className="flex gap-4">
                <Link href="/Sign_in">
                  <Button color="primary" size="lg">Sign in</Button>
                </Link>
                <Link href="/Log_in">
                  <Button color="primary" size="lg">Log in</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image 
                src="/img/hand4.PNG" 
                alt="Hand holding a card with QR code" 
                width={400} 
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="service" className="w-full py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Uses of <u>DOCTQR</u></h2>
            <p className="text-gray-600 mt-2">
              Multiple ways to facilitate the communication of your medical record
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/doc3.png" 
                  alt="Medical icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Medical Consultations</h4>
              <p className="text-gray-600 text-center">
                New doctor? No problem. With DoctQR your new doctor will get everything they need by scanning the code
              </p>
            </div>
            
            {/* Service Card 2 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/emergency.PNG" 
                  alt="Emergency icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Emergency</h4>
              <p className="text-gray-600 text-center">
                In difficult situations, DoctQR can provide your medical information instantly
              </p>
            </div>
            
            {/* Service Card 3 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/trip (1).png" 
                  alt="Trip icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Trips</h4>
              <p className="text-gray-600 text-center">
                Transporting special foods and medications can be complicated. DoctQR will give the necessary seriousness to the situation.
              </p>
            </div>
            
            {/* Service Card 4 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/backpack2.PNG" 
                  alt="School icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">School</h4>
              <p className="text-gray-600 text-center">
                Some children forget the names of the medications they need. With DoctQR it will be easier to make their special condition known
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="intro" className="w-full py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-center md:text-left">About</h2>
              </div>
              <p className="text-gray-600">

  <strong>DoctQR</strong> is an exciting and innovative solution that transforms how we access and share medical information — all through a simple, scannable QR code. Whether youre managing a chronic condition, have allergies, or simply want to be prepared for emergencies, <strong>DoctQR</strong> empowers you to make your essential medical data instantly available when it matters most. Our platform was created with one clear mission: to make health information accessible, fast, and reliable — anytime, anywhere.
  <br/><br/>
  With just a quick scan, first responders, doctors, or even bystanders can access critical health details that could save lives. Best of all, <strong>DoctQR</strong> is completely <strong>free for life</strong> and designed to work seamlessly across the globe. Because everyone deserves safe and accessible healthcare — no matter where they are.


              </p>
            </div>
            <div className="flex justify-center">
              <Image 
                src="/img/wallet2.PNG" 
                alt="Wallet with QR code" 
                width={400} 
                height={300}

              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center">
            <ul className="flex flex-wrap justify-center gap-6 mb-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Sign_in" className="text-gray-600 hover:text-black">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/Log_in" className="text-gray-600 hover:text-black">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/Terms_and_conditions" className="text-gray-600 hover:text-black">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-600 hover:text-black">
                  How it works
                </Link>
              </li>
            </ul>
            <p className="text-gray-500 text-sm">Contact: doctqr.contact@gmail.com</p>
            <p className="text-gray-500 text-sm">Copyright &copy; {new Date().getFullYear()} - <b>DoctQR.</b></p>
          </div>
        </div>
      </footer>
    </div>
  );
}