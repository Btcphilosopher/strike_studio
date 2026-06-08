export interface Project {
  id: string;
  title: string;
  location: string;
  country: string;
  year: string;
  area: string;
  client: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  methodology: string[];
  materials: string[];
}
