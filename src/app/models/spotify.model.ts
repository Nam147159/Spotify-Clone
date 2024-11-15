// Interface chung cho các liên kết bên ngoài (dùng chung cho album và artist)
export interface ExternalUrls {
    spotify: string;
  }
  
  // Interface cho hình ảnh (dùng chung cho album và artist)
  export interface Image {
    height: number;
    url: string;
    width: number;
  }
  
  // Interface cho Artist (có thể dùng trong album hoặc để lưu trữ dữ liệu artist)
  export interface Artist {
    external_urls: ExternalUrls;
    followers?: Followers;  // Tùy chọn, chỉ có trong dữ liệu artist
    genres?: string[];       // Tùy chọn, chỉ có trong dữ liệu artist
    href: string;
    id: string;
    images?: Image[];        // Tùy chọn, chỉ có trong dữ liệu artist
    name: string;
    popularity?: number;     // Tùy chọn, chỉ có trong dữ liệu artist
    type: string;
    uri: string;
  }
  
  // Interface cho thông tin Followers (chỉ có trong artist)
  export interface Followers {
    href: string | null;
    total: number;
  }
  
  // Interface cho Album (đã định nghĩa ở trên nhưng bổ sung thêm trường `artists`)
  export interface Album {
    album_type: string;
    artists: Artist[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  