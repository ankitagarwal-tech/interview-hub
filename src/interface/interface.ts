export interface IUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date | undefined;
  };


  export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
  }

  export interface ICartItem extends IProduct {
    quantity: number;
  }

  export interface IPaginationProps{
    maxPageNumber: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }