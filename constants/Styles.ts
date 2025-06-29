import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.default,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subheader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 24,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary.main,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.white,
  },
  buttonTextSecondary: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  textInput: {
    backgroundColor: Colors.background.light,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    marginVertical: 8,
    width: '100%',
  },
  card: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grey[300],
    marginVertical: 16,
  },
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background.default,
  },
  errorText: {
    color: Colors.error.main,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 4,
  },
});