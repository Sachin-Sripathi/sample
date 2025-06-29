import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Send, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import UserAvatar from '@/components/UserAvatar';
import { Conversation, Message, User } from '@/types/user';

// Sample users data
const sampleUsers: Record<string, User> = {
  '1': {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    bio: 'Hiking enthusiast and coffee lover',
    interests: ['Hiking', 'Coffee', 'Photography'],
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    isVisible: true,
  },
  '2': {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    bio: 'Tech developer with a passion for music',
    interests: ['Coding', 'Music', 'Travel'],
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    isVisible: true,
  },
  '3': {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    bio: 'Foodie exploring new cuisines',
    interests: ['Food', 'Cooking', 'Travel'],
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    isVisible: true,
  },
};

// Sample conversations data
const sampleConversations: Conversation[] = [
  {
    id: '1',
    participants: ['currentUser', '1'],
    lastMessage: {
      content: 'I saw you like hiking! Any recommendations for trails?',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      senderId: '1',
    },
    unreadCount: 1,
  },
  {
    id: '2',
    participants: ['currentUser', '2'],
    lastMessage: {
      content: 'Would love to chat more about the latest tech trends!',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      senderId: 'currentUser',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participants: ['currentUser', '3'],
    lastMessage: {
      content: 'That new restaurant downtown is amazing, we should go!',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000), // 1 day ago
      senderId: '3',
    },
    unreadCount: 2,
  },
];

// Sample messages data
const sampleMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1-1',
      senderId: '1',
      receiverId: 'currentUser',
      content: 'Hi there! I noticed we both enjoy hiking.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      read: true,
    },
    {
      id: '1-2',
      senderId: 'currentUser',
      receiverId: '1',
      content: 'Hey! Yes, I love hiking. Been doing it for years!',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60000), // 1.5 hours ago
      read: true,
    },
    {
      id: '1-3',
      senderId: '1',
      receiverId: 'currentUser',
      content: 'That\'s awesome! Do you have any favorite trails?',
      timestamp: new Date(Date.now() - 1 * 60 * 60000), // 1 hour ago
      read: true,
    },
    {
      id: '1-4',
      senderId: 'currentUser',
      receiverId: '1',
      content: 'I really like the trails at Mount Tamalpais. The views are incredible.',
      timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      read: true,
    },
    {
      id: '1-5',
      senderId: '1',
      receiverId: 'currentUser',
      content: 'I saw you like hiking! Any recommendations for trails?',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      read: false,
    },
  ],
  '2': [
    {
      id: '2-1',
      senderId: '2',
      receiverId: 'currentUser',
      content: 'Hello! I see you\'re into coding too.',
      timestamp: new Date(Date.now() - 5 * 60 * 60000), // 5 hours ago
      read: true,
    },
    {
      id: '2-2',
      senderId: 'currentUser',
      receiverId: '2',
      content: 'Yes! I\'m currently learning React Native. How about you?',
      timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
      read: true,
    },
    {
      id: '2-3',
      senderId: '2',
      receiverId: 'currentUser',
      content: 'I work with Python mostly, but interested in mobile development too.',
      timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
      read: true,
    },
    {
      id: '2-4',
      senderId: 'currentUser',
      receiverId: '2',
      content: 'Would love to chat more about the latest tech trends!',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      read: true,
    },
  ],
  '3': [
    {
      id: '3-1',
      senderId: '3',
      receiverId: 'currentUser',
      content: 'Hi! I noticed we both love food and cooking.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
      read: true,
    },
    {
      id: '3-2',
      senderId: 'currentUser',
      receiverId: '3',
      content: 'Absolutely! I\'ve been trying to perfect my pasta-making skills lately.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 days ago
      read: true,
    },
    {
      id: '3-3',
      senderId: '3',
      receiverId: 'currentUser',
      content: 'Fresh pasta is amazing! I learned a great carbonara recipe recently.',
      timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60000), // 1.5 days ago
      read: true,
    },
    {
      id: '3-4',
      senderId: 'currentUser',
      receiverId: '3',
      content: 'I\'d love to hear about it! Maybe we can swap recipes sometime.',
      timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60000), // 1.2 days ago
      read: true,
    },
    {
      id: '3-5',
      senderId: '3',
      receiverId: 'currentUser',
      content: 'That sounds great! Also, have you tried that new Italian place downtown?',
      timestamp: new Date(Date.now() - 1.1 * 24 * 60 * 60000), // 1.1 days ago
      read: false,
    },
    {
      id: '3-6',
      senderId: '3',
      receiverId: 'currentUser',
      content: 'That new restaurant downtown is amazing, we should go!',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000), // 1 day ago
      read: false,
    },
  ],
};

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState(sampleConversations);
  const [messages, setMessages] = useState(sampleMessages);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      return `${days}d`;
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const otherUserId = conversations
      .find(c => c.id === selectedConversation)
      ?.participants.find(p => p !== 'currentUser') || '';

    const newMessage: Message = {
      id: `${selectedConversation}-${messages[selectedConversation].length + 1}`,
      senderId: 'currentUser',
      receiverId: otherUserId,
      content: messageText.trim(),
      timestamp: new Date(),
      read: false,
    };

    // Update messages
    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...prev[selectedConversation], newMessage],
    }));

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                content: messageText.trim(),
                timestamp: new Date(),
                senderId: 'currentUser',
              },
              unreadCount: 0,
            }
          : conv
      )
    );

    setMessageText('');
  };

  const handleOpenConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);

    // Mark all messages as read
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    setMessages(prev => ({
      ...prev,
      [conversationId]: prev[conversationId].map(msg => 
        msg.receiverId === 'currentUser' ? { ...msg, read: true } : msg
      ),
    }));
  };

  const getOtherUserFromConversation = (conversation: Conversation) => {
    const otherUserId = conversation.participants.find(p => p !== 'currentUser');
    return otherUserId ? sampleUsers[otherUserId] : null;
  };

  const renderConversationItem = ({ item }: { item: Conversation }) => {
    const otherUser = getOtherUserFromConversation(item);
    if (!otherUser) return null;

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => handleOpenConversation(item.id)}
      >
        <UserAvatar
          size={56}
          imageUrl={otherUser.profileImage}
          name={otherUser.name}
          showBorder={item.unreadCount > 0}
        />
        
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.userName}>{otherUser.name}</Text>
            <Text style={styles.timeText}>
              {item.lastMessage ? formatTime(item.lastMessage.timestamp) : ''}
            </Text>
          </View>
          
          <View style={styles.messagePreviewContainer}>
            <Text 
              style={[
                styles.messagePreview,
                item.unreadCount > 0 && styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {item.lastMessage?.content || ''}
            </Text>
            
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isSender = item.senderId === 'currentUser';
    const user = isSender ? { name: 'You' } : sampleUsers[item.senderId];

    return (
      <View style={[
        styles.messageContainer,
        isSender ? styles.sentMessageContainer : styles.receivedMessageContainer,
      ]}>
        {!isSender && (
          <UserAvatar
            size={32}
            imageUrl={sampleUsers[item.senderId].profileImage}
            name={sampleUsers[item.senderId].name}
          />
        )}
        
        <View style={[
          styles.messageBubble,
          isSender ? styles.sentMessageBubble : styles.receivedMessageBubble,
        ]}>
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    );
  };

  if (selectedConversation) {
    const otherUserId = conversations
      .find(c => c.id === selectedConversation)
      ?.participants.find(p => p !== 'currentUser') || '';
    const otherUser = sampleUsers[otherUserId];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedConversation(null)}
          >
            <ArrowLeft color={Colors.text.primary} size={24} />
          </TouchableOpacity>
          
          <UserAvatar
            size={40}
            imageUrl={otherUser.profileImage}
            name={otherUser.name}
          />
          
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{otherUser.name}</Text>
            <Text style={styles.chatHeaderStatus}>Online</Text>
          </View>
        </View>
        
        <FlatList
          data={messages[selectedConversation]}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={false}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !messageText.trim() && styles.disabledSendButton,
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send color={messageText.trim() ? Colors.primary.main : Colors.grey[400]} size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations yet</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
    backgroundColor: Colors.background.paper,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  conversationsList: {
    padding: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: Colors.background.paper,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.grey[600],
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagePreview: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    flex: 1,
  },
  unreadMessage: {
    fontFamily: 'Poppins-Medium',
    color: Colors.text.primary,
  },
  unreadBadge: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.text.white,
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
  // Chat view styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
    backgroundColor: Colors.background.paper,
  },
  backButton: {
    marginRight: 16,
  },
  chatHeaderInfo: {
    marginLeft: 12,
  },
  chatHeaderName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  chatHeaderStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.success.main,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sentMessageBubble: {
    backgroundColor: Colors.primary.main,
    borderBottomRightRadius: 4,
  },
  receivedMessageBubble: {
    backgroundColor: Colors.background.paper,
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.white,
  },
  receivedMessageText: {
    color: Colors.text.primary,
  },
  messageTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.text.white + '99', // 60% opacity
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background.paper,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[300],
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background.light,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 120,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledSendButton: {
    opacity: 0.6,
  },
});