export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  interests: string[];
  profileImage?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  isVisible: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: Date;
  imageUrl: string;
  attendees: string[];
  tags: string[];
}

export interface Notification {
  id: string;
  type: 'nearby' | 'message' | 'event' | 'connection';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  relatedUserId?: string;
  relatedEventId?: string;
}