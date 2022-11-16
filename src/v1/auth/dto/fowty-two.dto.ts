export class FortyTwoDto {
  id: number;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  usualFullName: string;
  usualFirstName: string | null;
  url: string;
  phone: 'hidden' | string;
  displayname: string;
  imageUrl: string;
  newImageUrl: string;
  campus: Campus[];
}
interface Campus {
  id: number;
  name: string;
  timeZone: string;
  language: {
    id: number;
    name: string;
    identifier: string;
    created_at: string;
    updated_at: string;
  };
  usersCount: number;
  vogsphereId: number;
  country: string;
  address: string;
  zip: string;
  city: string;
  website: string;
  facebook: string;
  twitter: string;
  active: boolean;
  emailExtension: string;
  defaultHiddenPhone: boolean;
}
