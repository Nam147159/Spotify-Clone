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
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  // Các trường chỉ có ở full artist data
  followers?: {
    href: string | null;
    total: number;
  };
  genres?: string[];
  images?: Image[];
  popularity?: number;
}

// Interface cho Album (đã định nghĩa ở trên nhưng bổ sung thêm trường `artists`)
export interface Album {
  album_type: string;
  artists: Artist[]; // Sử dụng lại Artist interface nhưng sẽ không có các trường optional
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
