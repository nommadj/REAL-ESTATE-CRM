
export enum PropertyType {
  Land = 'Land',
  House = 'House',
  Apartment = 'Apartment',
}

export enum ProjectStatus {
  Active = 'Active',
  Completed = 'Completed',
  Upcoming = 'Upcoming',
}

export enum Currency {
  KES = 'KES',
  USD = 'USD',
}

export enum UserRole {
  Agent = 'Real Estate Agent',
  Developer = 'Developer',
  Company = 'Property Company',
  Broker = 'Realty Broker',
}

export enum TaskStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Completed = 'Completed',
}

export interface Inventory {
  total: number;
  available: number;
  sold: number;
  booked: number;
  pending: number;
}

export interface Project {
  id: string;
  name: string;
  propertyType: PropertyType;
  location: string;
  developer: string;
  description: string;
  status: ProjectStatus;
  inventory: Inventory;
  averagePrice: number; // Stored in KES
  commissionPercentage: number;
  imageUrl: string;
}

export interface TeamMember {
    id: string;
    name: string;
    avatarUrl: string;
    dealsClosed: number;
    leadsConverted: number;
    totalCommissionEarned: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatarUrl: string;
  dealsClosed: number;
  totalCommissionEarned: number; // Stored in KES
  leadsConverted: number;
  team?: TeamMember[];
}

export interface Company {
  name: string;
  logoUrl: string;
}

export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
    source: string;
    assignedTo: string;
    lastContacted: string;
}

export interface Task {
    id?: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
    assignedTo: string; // User ID
}