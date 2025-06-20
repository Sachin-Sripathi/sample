import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Bell } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import UserAvatar from '@/components/UserAvatar';
import { Notification } from '@/types/user';

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'nearby',
    title: 'New Connection Opportunity',
    message: 'Alex Johnson is within 5 meters of you. You share interests in Hiking and Photography.',
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    read: false,
    relatedUserId: '1',
  },
  {
    id: '2',
    type: 'connection',
    title: 'Connection Request Accepted',
    message: 'Sarah Williams accepted your connection request.',
    timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
    read: true,
    relatedUserId: '2',
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'Michael Chen sent you a message: "Hi, I noticed we both enjoy cooking. Would love to chat!"',
    timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    read: false,
    relatedUserId: '3',
  },
  {
    id: '4',
    type: 'event',
    title: 'Upcoming Event',
    message: 'Local Tech Meetup is happening tomorrow at 6PM. You and 5 connections are attending.',
    timestamp: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
    read: true,
    relatedEventId: '1',
  },
  {
    id: '5',
    type: 'nearby',
    title: 'Someone Nearby Shares Your Interests',
    message: 'Jane Smith is near you and shares your interest in Art.',
    timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
    read: true,
    relatedUserId: '4',
  },
];

// User data for avatar display
const users: Record<string, { name: string; profileImage?: string }> = {
  '1': {
    name: 'Alex Johnson',
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
  },
  '2': {
    name: 'Sarah Williams',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  },
  '3': {
    name: 'Michael Chen',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
  '4': {
    name: 'Jane Smith',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  const getNotificationIcon = (type: string) => {
    // In a real app, you'd use different icons for different notification types
    return <Bell size={24} color={Colors.primary.main} />;
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        item.read ? styles.readNotification : styles.unreadNotification,
      ]}
      onPress={() => markAsRead(item.id)}
    >
      {item.relatedUserId ? (
        <UserAvatar
          size={48}
          imageUrl={users[item.relatedUserId]?.profileImage}
          name={users[item.relatedUserId]?.name || 'User'}
        />
      ) : (
        <View style={styles.iconContainer}>
          {getNotificationIcon(item.type)}
        </View>
      )}
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
      </View>
      
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.secondary.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary.dark,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  listContent: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  readNotification: {
    backgroundColor: Colors.background.paper,
  },
  unreadNotification: {
    backgroundColor: Colors.primary.light + '30', // 30% opacity
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  notificationTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.grey[600],
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary.main,
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});