import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { Search, ArrowLeft, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Event } from '@/types/user';
import UserAvatar from '@/components/UserAvatar';

// Sample events data
const sampleEvents: Event[] = [
  {
    id: '1',
    name: 'Local Tech Meetup',
    description: 'Join us for an evening of tech talks, networking, and refreshments. This month\'s theme is mobile app development.',
    location: 'Tech Hub Downtown, 123 Main St',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    imageUrl: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    attendees: ['1', '2', '3'],
    tags: ['Tech', 'Networking', 'Development'],
  },
  {
    id: '2',
    name: 'Morning Hiking Group',
    description: 'Early morning hike to catch the sunrise. All experience levels welcome. Bring water and comfortable shoes.',
    location: 'Mountain Park Trailhead, North Entrance',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    imageUrl: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
    attendees: ['1', '4'],
    tags: ['Hiking', 'Outdoors', 'Fitness'],
  },
  {
    id: '3',
    name: 'Photography Workshop',
    description: 'Learn composition techniques and editing skills in this hands-on workshop. Bring your own camera.',
    location: 'Art Center Gallery, 456 Oak St',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    imageUrl: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg',
    attendees: ['2', '5'],
    tags: ['Photography', 'Art', 'Learning'],
  },
  {
    id: '4',
    name: 'Cooking Class: Italian Cuisine',
    description: 'Learn to make authentic Italian pasta from scratch, along with sauces and appetizers.',
    location: 'Culinary Institute, 789 Elm St',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    imageUrl: 'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg',
    attendees: ['3', '6'],
    tags: ['Cooking', 'Food', 'Italian'],
  },
];

// Sample users for attendees
const sampleUsers = {
  '1': { name: 'Alex Johnson', profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg' },
  '2': { name: 'Sarah Williams', profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' },
  '3': { name: 'Michael Chen', profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
  '4': { name: 'Jane Smith', profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
  '5': { name: 'David Brown', profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg' },
  '6': { name: 'Emily Davis', profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
};

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userAttending, setUserAttending] = useState<Record<string, boolean>>({});
  
  // All unique tags from events
  const allTags = Array.from(new Set(events.flatMap(event => event.tags)));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleAttending = (eventId: string) => {
    setUserAttending(prev => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const filteredEvents = events.filter(event => {
    // Filter by search query
    const searchMatch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected tags
    const tagMatch = selectedTags.length === 0 || 
      event.tags.some(tag => selectedTags.includes(tag));
    
    return searchMatch && tagMatch;
  });

  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => setSelectedEvent(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      <View style={styles.eventCardContent}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
        <Text style={styles.eventLocation} numberOfLines={1}>{item.location}</Text>
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.attendeesContainer}>
          <Text style={styles.attendeesText}>{item.attendees.length} attending</Text>
          <View style={styles.avatarGroup}>
            {item.attendees.slice(0, 3).map((userId, index) => (
              <View key={userId} style={[styles.avatarContainer, { marginLeft: index > 0 ? -10 : 0 }]}>
                <UserAvatar
                  size={24}
                  imageUrl={sampleUsers[userId]?.profileImage}
                  name={sampleUsers[userId]?.name || 'User'}
                />
              </View>
            ))}
            {item.attendees.length > 3 && (
              <View style={[styles.avatarContainer, { marginLeft: -10 }]}>
                <View style={styles.moreAttendees}>
                  <Text style={styles.moreAttendeesText}>+{item.attendees.length - 3}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (selectedEvent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.eventDetailHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedEvent(null)}
          >
            <ArrowLeft color={Colors.text.primary} size={24} />
          </TouchableOpacity>
          <Text style={styles.eventDetailTitle}>Event Details</Text>
        </View>
        
        <FlatList
          data={[]} // No data needed, just using for the scrollable container
          ListHeaderComponent={() => (
            <View style={styles.eventDetailContainer}>
              <Image source={{ uri: selectedEvent.imageUrl }} style={styles.eventDetailImage} />
              
              <View style={styles.eventInfoContainer}>
                <Text style={styles.eventDetailName}>{selectedEvent.name}</Text>
                <Text style={styles.eventDetailDate}>{formatDate(selectedEvent.date)}</Text>
                <Text style={styles.eventDetailLocation}>{selectedEvent.location}</Text>
                
                <View style={styles.tagsContainer}>
                  {selectedEvent.tags.map((tag, index) => (
                    <View key={index} style={styles.tagChip}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.divider} />
                
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.eventDescription}>{selectedEvent.description}</Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.attendeesTitle}>Attendees ({selectedEvent.attendees.length})</Text>
                <View style={styles.attendeesList}>
                  {selectedEvent.attendees.map(userId => (
                    <View key={userId} style={styles.attendeeItem}>
                      <UserAvatar
                        size={36}
                        imageUrl={sampleUsers[userId]?.profileImage}
                        name={sampleUsers[userId]?.name || 'User'}
                      />
                      <Text style={styles.attendeeName}>{sampleUsers[userId]?.name}</Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.attendButton,
                    userAttending[selectedEvent.id] ? styles.attendingButton : {},
                  ]}
                  onPress={() => toggleAttending(selectedEvent.id)}
                >
                  <Text style={styles.attendButtonText}>
                    {userAttending[selectedEvent.id] ? 'Attending' : 'Attend Event'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderItem={() => null}
          contentContainerStyle={styles.eventDetailScroll}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color={Colors.grey[500]} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X color={Colors.grey[500]} size={20} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      <View style={styles.tagsScrollContainer}>
        <FlatList
          data={allTags}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tagButton,
                selectedTags.includes(item) ? styles.tagButtonSelected : {},
              ]}
              onPress={() => toggleTag(item)}
            >
              <Text
                style={[
                  styles.tagButtonText,
                  selectedTags.includes(item) ? styles.tagButtonTextSelected : {},
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsScrollContent}
        />
      </View>
      
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found</Text>
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
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: Colors.background.paper,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.light,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
  tagsScrollContainer: {
    backgroundColor: Colors.background.paper,
    paddingBottom: 16,
  },
  tagsScrollContent: {
    paddingHorizontal: 16,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.light,
    marginRight: 8,
  },
  tagButtonSelected: {
    backgroundColor: Colors.primary.main,
  },
  tagButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  tagButtonTextSelected: {
    color: Colors.text.white,
  },
  eventsList: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  eventCardContent: {
    padding: 16,
  },
  eventName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  eventDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary.main,
    marginBottom: 4,
  },
  eventLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagChip: {
    backgroundColor: Colors.secondary.light,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.primary,
  },
  attendeesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatarContainer: {
    zIndex: 1,
  },
  moreAttendees: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.grey[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreAttendeesText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
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
  // Event detail styles
  eventDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
  },
  backButton: {
    marginRight: 16,
  },
  eventDetailTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  eventDetailScroll: {
    paddingBottom: 24,
  },
  eventDetailContainer: {
    backgroundColor: Colors.background.default,
  },
  eventDetailImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventInfoContainer: {
    padding: 16,
  },
  eventDetailName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  eventDetailDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary.main,
    marginBottom: 4,
  },
  eventDetailLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grey[300],
    marginVertical: 16,
  },
  descriptionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  eventDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  attendeesTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  attendeesList: {
    marginBottom: 24,
  },
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendeeName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  attendButton: {
    backgroundColor: Colors.primary.main,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  attendingButton: {
    backgroundColor: Colors.success.main,
  },
  attendButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text.white,
  },
});