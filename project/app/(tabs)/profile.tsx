import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { CreditCard as Edit2, Check, X, Bell, Lock, LogOut } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import UserAvatar from '@/components/UserAvatar';
import CustomButton from '@/components/CustomButton';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || '');
  const [interestsText, setInterestsText] = useState(user?.interests.join(', ') || '');
  
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };
  
  const toggleLocationSharing = () => {
    setLocationSharing(prev => !prev);
  };
  
  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };
  
  const handleSaveBio = () => {
    setIsEditingBio(false);
  };
  
  const handleCancelBio = () => {
    setBioText(user?.bio || '');
    setIsEditingBio(false);
  };
  
  const handleSaveInterests = () => {
    setIsEditingInterests(false);
  };
  
  const handleCancelInterests = () => {
    setInterestsText(user?.interests.join(', ') || '');
    setIsEditingInterests(false);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <UserAvatar
              size={120}
              imageUrl={user?.profileImage}
              name={user?.name || 'User'}
              showBorder
              borderColor={Colors.primary.main}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit2 size={20} color={Colors.text.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bio</Text>
            {!isEditingBio ? (
              <TouchableOpacity onPress={() => setIsEditingBio(true)}>
                <Edit2 size={20} color={Colors.primary.main} />
              </TouchableOpacity>
            ) : (
              <View style={styles.editActions}>
                <TouchableOpacity style={styles.editActionButton} onPress={handleSaveBio}>
                  <Check size={20} color={Colors.success.main} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editActionButton} onPress={handleCancelBio}>
                  <X size={20} color={Colors.error.main} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {isEditingBio ? (
            <TextInput
              style={styles.bioInput}
              value={bioText}
              onChangeText={setBioText}
              multiline
              numberOfLines={4}
              placeholder="Write something about yourself..."
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.bioText}>{bioText || 'No bio provided'}</Text>
          )}
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Interests</Text>
            {!isEditingInterests ? (
              <TouchableOpacity onPress={() => setIsEditingInterests(true)}>
                <Edit2 size={20} color={Colors.primary.main} />
              </TouchableOpacity>
            ) : (
              <View style={styles.editActions}>
                <TouchableOpacity style={styles.editActionButton} onPress={handleSaveInterests}>
                  <Check size={20} color={Colors.success.main} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editActionButton} onPress={handleCancelInterests}>
                  <X size={20} color={Colors.error.main} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {isEditingInterests ? (
            <TextInput
              style={styles.interestsInput}
              value={interestsText}
              onChangeText={setInterestsText}
              placeholder="Separate interests with commas..."
            />
          ) : (
            <View style={styles.interestsContainer}>
              {interestsText.split(',').map((interest, index) => (
                interest.trim() ? (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestTagText}>{interest.trim()}</Text>
                  </View>
                ) : null
              ))}
              {!interestsText && (
                <Text style={styles.noInterestsText}>No interests provided</Text>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={Colors.primary.main} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
              thumbColor={notifications ? Colors.primary.main : Colors.grey[500]}
              ios_backgroundColor={Colors.grey[300]}
              onValueChange={toggleNotifications}
              value={notifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Lock size={20} color={Colors.primary.main} />
              </View>
              <View>
                <Text style={styles.settingText}>Visibility</Text>
                <Text style={styles.settingDescription}>Allow others to see your profile</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
              thumbColor={isVisible ? Colors.primary.main : Colors.grey[500]}
              ios_backgroundColor={Colors.grey[300]}
              onValueChange={toggleVisibility}
              value={isVisible}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Lock size={20} color={Colors.primary.main} />
              </View>
              <View>
                <Text style={styles.settingText}>Location Sharing</Text>
                <Text style={styles.settingDescription}>Share your location with nearby users</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: Colors.grey[300], true: Colors.primary.light }}
              thumbColor={locationSharing ? Colors.primary.main : Colors.grey[500]}
              ios_backgroundColor={Colors.grey[300]}
              onValueChange={toggleLocationSharing}
              value={locationSharing}
            />
          </View>
        </View>
        
        <View style={styles.logoutContainer}>
          <CustomButton
            title="Logout"
            variant="danger"
            onPress={logout}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
  scrollContent: {
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.background.paper,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary.main,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background.paper,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  sectionContainer: {
    backgroundColor: Colors.background.paper,
    marginTop: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  editActions: {
    flexDirection: 'row',
  },
  editActionButton: {
    marginLeft: 16,
  },
  bioText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  bioInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    backgroundColor: Colors.background.light,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: Colors.secondary.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestTagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
  },
  noInterestsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  interestsInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    backgroundColor: Colors.background.light,
    borderRadius: 8,
    padding: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.light + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  logoutContainer: {
    padding: 16,
    marginTop: 16,
  },
  logoutButton: {
    backgroundColor: Colors.error.main,
  },
});