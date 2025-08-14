import { Bed, Bath, Ruler, MapPin } from 'lucide-react';
import { Property } from './PropertiesSidebar';

export const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
      {/* Property Image */}
      <div className="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-48" />
      
      {/* Property Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-foreground">{property.title}</h3>
          <span className="text-lg font-bold text-primary">
            ${property.price.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center mt-1 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{property.bedrooms} beds</span>
          </div>
          
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{property.bathrooms} baths</span>
          </div>
          
          <div className="flex items-center">
            <Ruler className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="px-4 pb-4">
        <button className="w-full py-2 text-sm font-medium rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};