export interface Property {
  id: number;
  price_amount: string;
  area_sqm: string;
  bedrooms: number;
  bathrooms: number;
  listing_type: string;
  coverimageurl: string | null;
  is_approved: boolean;
  status: string;
  available_from: string;
  additional_information: {
    en: {
      title: string;
      address: string;
    };
    ar: {
      title: string;
      address: string;
    };
  };
}

export interface Pagination {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
export const emptyPagination: Pagination = {
  currentPage: 1,
  limit: 0,
  totalCount: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
};

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: {
    data: T[];
    pagination: Pagination;
  };
}
