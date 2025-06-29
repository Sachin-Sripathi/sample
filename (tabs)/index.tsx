import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import UserAvatar from '@/components/UserAvatar';
import CustomButton from '@/components/CustomButton';

// Sample nearby users for demo
const nearbyUsers = [
  {
    id: '1',
    name: 'Alex Johnson',
    bio: 'Hiking enthusiast and coffee lover',
    interests: ['Hiking', 'Coffee', 'Photography'],
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    location: {
      latitude: 37.7855,
      longitude: -122.4071,
    },
  },
  {
    id: '2',
    name: 'Sarah Williams',
    bio: 'Tech developer with a passion for music',
    interests: ['Coding', 'Music', 'Travel'],
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    location: {
      latitude: 37.7861,
      longitude: -122.4055,
    },
  },
  {
    id: '3',
    name: 'Michael Chen',
    bio: 'Foodie exploring new cuisines',
    interests: ['Food', 'Cooking', 'Travel'],
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    location: {
      latitude: 37.7870,
      longitude: -122.4065,
    },
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      try {
        // Use mock location for web because browser location might be less precise
        if (Platform.OS === 'web') {
          setLocation({
            coords: {
              latitude: 37.7858,
              longitude: -122.4064,
              altitude: null,
              accuracy: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
            timestamp: Date.now(),
          });
        } else {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
      } catch (error) {
        setErrorMsg('Could not fetch location');
        console.error(error);
        
        // Fallback location
        setLocation({
          coords: {
            latitude: 37.7858,
            longitude: -122.4064,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
      }
    })();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleMarkerPress = (user: any) => {
    setSelectedUser(user);
  };

  const handleConnect = () => {
    // In a real app, this would send a connection request
    setSelectedUser(null);
    alert(`Connection request sent to ${selectedUser.name}`);
  };

  const closeUserPreview = () => {
    setSelectedUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <UserAvatar
          size={40}
          imageUrl={user?.profileImage}
          name={user?.name || 'User'}
        />
        <Text style={styles.title}>Meet + Connect</Text>
        <View style={styles.visibilityContainer}>
          <Text style={styles.visibilityLabel}>Visible</Text>
          <Switch
            trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
            thumbColor={isVisible ? Colors.primary.main : Colors.grey[500]}
            ios_backgroundColor={Colors.grey[300]}
            onValueChange={toggleVisibility}
            value={isVisible}
          />
        </View>
      </View>
      
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : !location ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {/* 5-meter interaction radius */}
            <Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={100} // Increased for visibility in demo
              fillColor="rgba(111, 150, 143, 0.2)"
              strokeColor={Colors.primary.main}
              strokeWidth={1}
            />
            
            {/* Nearby users */}
            {isVisible && nearbyUsers.map((nearbyUser) => (
              <Marker
                key={nearbyUser.id}
                coordinate={nearbyUser.location}
                onPress={() => handleMarkerPress(nearbyUser)}
              >
                <View style={styles.markerContainer}>
                  <UserAvatar
                    size={36}
                    imageUrl={nearbyUser.profileImage}
                    name={nearbyUser.name}
                    showBorder
                  />
                </View>
              </Marker>
            ))}
          </MapView>
          
          {selectedUser && (
            <View style={styles.userPreview}>
              <View style={styles.userPreviewHeader}>
                <UserAvatar
                  size={48}
                  imageUrl={selectedUser.profileImage}
                  name={selectedUser.name}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{selectedUser.name}</Text>
                  <Text style={styles.userBio} numberOfLines={1}>{selectedUser.bio}</Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={closeUserPreview}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.interestsContainer}>
                <Text style={styles.interestsLabel}>Interests:</Text>
                <View style={styles.interestTags}>
                  {selectedUser.interests.map((interest: string, index: number) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestTagText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <CustomButton
                title="Connect"
                onPress={handleConnect}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.primary.main,
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.error.main,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPreview: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  userPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  userBio: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.grey[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.text.primary,
    lineHeight: 28,
    textAlign: 'center',
  },
  interestsContainer: {
    marginBottom: 16,
  },
  interestsLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: Colors.secondary.light,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestTagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.primary,
  },
});