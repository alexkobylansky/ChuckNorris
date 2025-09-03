declare interface MainProps {
  getQuery(): void;
  pushToFavourites(     index: number,     id: string): void;
  categoryButton: any;
  queryCategory: any;
  setValue: any;
  setCategoryButton: React.Dispatch<React.SetStateAction<string>>;
  setQueryCategory: any;
  result: any;
  favourites: any;
  toggleAsideState: any;
  asideState: any;
}

declare interface IResult {
  id: string;
  value: string;
  categories: string[];
  updated_at: string;
  url: string;
}

declare interface CategorySelectButtonProps {
  name: string;
  value: string;
  active: boolean;
  setCategoryButton: React.Dispatch<React.SetStateAction<string>>;
}

declare interface ResultBlockItemProps {
  id: string;
  category: string[];
  value: string;
  lastUpdate: string;
  url: string;
  index: number;
  pushToFavourites (index: number, id: string): void;
  favourites: any[];
}

declare interface FavouriteBlockItemProps {
  url: string;
  value: string;
  category: string[];
  id: string;
  lastUpdate: string;
  removeFromFavourites(id: string): void;
}

declare interface AsideProps {
  favourites: any;
  removeFromFavourites(id: string): void;
  toggleAsideState(): void;
  asideState: boolean
}