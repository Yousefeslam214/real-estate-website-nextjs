"use client";

import { Home, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoopingScrollList from "../LoopingScrollList";
import PropertiesCard from "./PropertiesCard";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}


export const PropertiesSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 right-0 z-40 transform -translate-y-1/2 bg-btn-bg text-btn-text p-3 rounded-l-lg shadow-lg hover:bg-primary transition-all duration-300 group">
        <div className="flex items-center">
          <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Properties</span>
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-background shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
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
              aria-label="Close sidebar">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Auto-scrolling content */}
          <LoopingScrollList>
            <PropertiesCard
                />
          </LoopingScrollList>

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
