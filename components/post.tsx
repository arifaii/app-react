import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from './avatar';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type PostProps = {
  user: User;
  content: string;
  date: Date;
};

export default function Post({ user, content, date }: PostProps) {
  return (
    <View style={styles.post}>
      <Avatar uri={user.avatar} size={56} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.date}>
            {date.toLocaleDateString()} · {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 18,
    shadowColor: '#00000022',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  userName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1f2937',
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
  },
  text: {
    fontSize: 16,
    color: '#475569',
  },
});
