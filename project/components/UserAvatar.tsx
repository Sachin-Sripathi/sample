import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface UserAvatarProps {
  size?: number;
  imageUrl?: string;
  name: string;
  showBorder?: boolean;
  borderColor?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  size = 48,
  imageUrl,
  name,
  showBorder = false,
  borderColor = Colors.primary.main,
}) => {
  // Get initials from name
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  const avatarSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const borderStyle = showBorder
    ? {
        borderWidth: 2,
        borderColor: borderColor,
      }
    : {};

  const textSize = {
    fontSize: size / 2.5,
  };

  return (
    <View style={[styles.container, avatarSize, borderStyle]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={[styles.initials, textSize]}>{getInitials(name)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: Colors.text.white,
    fontFamily: 'Poppins-Medium',
  },
});

export default UserAvatar;