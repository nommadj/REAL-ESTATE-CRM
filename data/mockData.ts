
import { type Project, type User, type Company, type Lead, PropertyType, ProjectStatus, UserRole, type TeamMember, type Task, TaskStatus } from '../types';

export const MOCK_COMPANY: Company = {
  name: 'Elite Realty Group',
  logoUrl: 'https://picsum.photos/seed/realtylogo/100/100',
};

// Create a single source of truth for users
const user1: User = {
  id: 'user-1',
  name: 'Jane Doe',
  role: UserRole.Company,
  email: 'jane.doe@eliterealty.com',
  avatarUrl: 'https://picsum.photos/seed/useravatar/200/200',
  dealsClosed: 12,
  totalCommissionEarned: 12500000,
  leadsConverted: 25,
};

const user2: User = {
  id: 'user-2',
  name: 'Mike Ross',
  role: UserRole.Agent,
  email: 'mike.ross@eliterealty.com',
  avatarUrl: 'https://picsum.photos/seed/user2/200/200',
  dealsClosed: 8,
  totalCommissionEarned: 8200000,
  leadsConverted: 18,
};

const user3: User = {
  id: 'user-3',
  name: 'Harvey Specter',
  role: UserRole.Agent,
  email: 'harvey.specter@eliterealty.com',
  avatarUrl: 'https://picsum.photos/seed/user3/200/200',
  dealsClosed: 15,
  totalCommissionEarned: 15100000,
  leadsConverted: 22,
};

const user4: User = {
  id: 'user-4',
  name: 'Rachel Zane',
  role: UserRole.Agent,
  email: 'rachel.zane@eliterealty.com',
  avatarUrl: 'https://picsum.photos/seed/user4/200/200',
  dealsClosed: 10,
  totalCommissionEarned: 9800000,
  leadsConverted: 20,
};

const user5: User = {
    id: 'user-5',
    name: 'Louis Litt',
    role: UserRole.Broker,
    email: 'louis.litt@eliterealty.com',
    avatarUrl: 'https://picsum.photos/seed/user5/200/200',
    dealsClosed: 5,
    totalCommissionEarned: 6000000,
    leadsConverted: 15,
};

// All users for leaderboard
export const MOCK_ALL_USERS: User[] = [user1, user2, user3, user4, user5];

// Team members for user1
const teamForUser1: TeamMember[] = [user2, user3, user4].map(({ id, name, avatarUrl, dealsClosed, leadsConverted, totalCommissionEarned }) => ({
    id, name, avatarUrl, dealsClosed, leadsConverted, totalCommissionEarned
}));


export const MOCK_USER: User = {
  ...user1,
  team: teamForUser1
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Riverside Luxury Apartments',
    propertyType: PropertyType.Apartment,
    location: 'Riverside, Nairobi',
    developer: 'Urban Living Developers',
    description: 'A stunning collection of modern apartments with premium amenities and breathtaking views of the city skyline.',
    status: ProjectStatus.Active,
    inventory: {
      total: 120,
      available: 40,
      sold: 65,
      booked: 10,
      pending: 5,
    },
    averagePrice: 15000000,
    commissionPercentage: 3.5,
    imageUrl: 'https://picsum.photos/seed/riverside/800/600',
  },
  {
    id: 'proj-2',
    name: 'Kitisuru Gardens',
    propertyType: PropertyType.House,
    location: 'Kitisuru, Nairobi',
    developer: 'Green Scape Homes',
    description: 'Exclusive gated community featuring 4 and 5 bedroom villas with private gardens and state-of-the-art security.',
    status: ProjectStatus.Active,
    inventory: {
      total: 50,
      available: 12,
      sold: 30,
      booked: 5,
      pending: 3,
    },
    averagePrice: 65000000,
    commissionPercentage: 4.0,
    imageUrl: 'https://picsum.photos/seed/kitisuru/800/600',
  },
  {
    id: 'proj-3',
    name: 'Lavington Prime Plots',
    propertyType: PropertyType.Land,
    location: 'Lavington, Nairobi',
    developer: 'Capital Investments Ltd.',
    description: 'Serviced 1/2 acre plots in a prime, serene location, perfect for building your dream home.',
    status: ProjectStatus.Completed,
    inventory: {
      total: 20,
      available: 2,
      sold: 18,
      booked: 0,
      pending: 0,
    },
    averagePrice: 80000000,
    commissionPercentage: 5.0,
    imageUrl: 'https://picsum.photos/seed/lavington/800/600',
  },
  {
    id: 'proj-4',
    name: 'Westlands Tower',
    propertyType: PropertyType.Apartment,
    location: 'Westlands, Nairobi',
    developer: 'Sky High Properties',
    description: 'A new icon in the Westlands skyline, offering luxurious living and commercial spaces. Launching soon.',
    status: ProjectStatus.Upcoming,
    inventory: {
      total: 200,
      available: 200,
      sold: 0,
      booked: 0,
      pending: 0,
    },
    averagePrice: 25000000,
    commissionPercentage: 3.0,
    imageUrl: 'https://picsum.photos/seed/westlands/800/600',
  },
];

export const MOCK_LEADS: Lead[] = [
    { id: 'lead-1', name: 'John Kamau', phone: '+254712345678', email: 'j.kamau@example.com', status: 'New', source: 'Website', assignedTo: 'user-1', lastContacted: '2023-10-26' },
    { id: 'lead-2', name: 'Mary Wanjiku', phone: '+254723456789', email: 'm.wanjiku@example.com', status: 'Contacted', source: 'Referral', assignedTo: 'user-2', lastContacted: '2023-10-25' },
    { id: 'lead-3', name: 'Peter Otieno', phone: '+254734567890', email: 'p.otieno@example.com', status: 'Qualified', source: 'Social Media', assignedTo: 'user-3', lastContacted: '2023-10-24' },
    { id: 'lead-4', name: 'Asha Mohammed', phone: '+254745678901', email: 'a.mohammed@example.com', status: 'Lost', source: 'Walk-in', assignedTo: 'user-4', lastContacted: '2023-10-20' },
];

export const MOCK_TASKS: Task[] = [
    {
        id: 'task-1',
        title: 'Follow up with John Kamau',
        description: 'Call John to discuss the Riverside apartments. He seemed very interested.',
        dueDate: '2024-08-15',
        status: TaskStatus.ToDo,
        assignedTo: 'user-2',
    },
    {
        id: 'task-2',
        title: 'Prepare presentation for Kitisuru Gardens',
        description: 'Create a new presentation highlighting the key features and recent price updates.',
        dueDate: '2024-08-10',
        status: TaskStatus.InProgress,
        assignedTo: 'user-3',
    },
    {
        id: 'task-3',
        title: 'Finalize paperwork for Lavington plot sale',
        description: 'Client has paid the deposit, need to complete the final sales agreement.',
        dueDate: '2024-08-05',
        status: TaskStatus.Completed,
        assignedTo: 'user-4',
    },
    {
        id: 'task-4',
        title: 'Schedule a site visit for Mary Wanjiku',
        description: 'She wants to see the 3-bedroom units at Riverside.',
        dueDate: '2024-08-12',
        status: TaskStatus.ToDo,
        assignedTo: 'user-2',
    },
];


export const EXCHANGE_RATE_KES_USD = 148.50;