// components/PropertiesSidebar.tsx
"use client";

import { useState } from 'react';
// import { PropertyCard } from '@/components/PropertyCard';
import { X, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from './PropertyCard';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

const PropertiesSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample properties data - replace with your actual data
  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury Waterfront Villa",
      location: "Bali, Indonesia",
      price: 1200000,
      bedrooms: 5,
      bathrooms: 6,
      area: 4500,
      image: "/property1.jpg"
    },
    {
      id: "2",
      title: "Modern City Apartment",
      location: "New York, USA",
      price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: "/property2.jpg"
    },
    {
      id: "3",
      title: "Mountain Retreat Cabin",
      location: "Aspen, Colorado",
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      image: "/property3.jpg"
    },
    {
      id: "4",
      title: "Beachfront Paradise",
      location: "Maldives",
      price: 2200000,
      bedrooms: 6,
      bathrooms: 7,
      area: 5200,
      image: "/property4.jpg"
    }
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 right-0 z-40 transform -translate-y-1/2 bg-btn-bg text-btn-text p-3 rounded-l-lg shadow-lg hover:bg-primary transition-all duration-300 group"
      >
        <div className="flex items-center">
          <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Properties</span>
        </div>
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-background shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Available Properties
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          
          {/* Property List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-border bg-grid">
            <Button className="w-full bg-btn-bg text-btn-text hover:bg-primary">
              View All Properties
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default PropertiesSidebar;