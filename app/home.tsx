import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Posts mejorados con más datos
const initialPosts = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Ariel Faivisovich',
      avatar: 'https://i.pravatar.cc/150?img=12',
      verified: true,
    },
    content: '¡Hola comunidad! Este es mi primer post en esta increíble plataforma. Estoy emocionado de compartir mis ideas con todos ustedes. 🚀',
    date: new Date('2025-07-01T10:00:00'),
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Coder Jane',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: false,
    },
    content: '¿Alguien conoce buenas librerías para React Native? Estoy trabajando en un proyecto y necesito algunas recomendaciones. 💻',
    date: new Date('2025-07-01T09:45:00'),
    likes: 15,
    comments: 12,
    shares: 2,
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Tech Guru',
      avatar: 'https://i.pravatar.cc/150?img=8',
      verified: true,
    },
    content: 'Acabé de terminar un proyecto increíble con TypeScript y React Native. La productividad que ofrece el tipado estático es impresionante. 🔥',
    date: new Date('2025-07-01T09:30:00'),
    likes: 42,
    comments: 18,
    shares: 7,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  const currentUser = {
    id: 'u1',
    name: 'Ariel Faivisovich',
    avatar: 'https://i.pravatar.cc/150?img=12',
    verified: true,
  };

  const onPublish = async () => {
    if (!newPost.trim()) return;

    setIsPosting(true);
    
    // Simular delay de publicación
    setTimeout(() => {
      const post = {
        id: Date.now().toString(),
        user: currentUser,
        content: newPost.trim(),
        date: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
      };

      setPosts([post, ...posts]);
      setNewPost('');
      setIsPosting(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  const PostItem = ({ item }: { item: any }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes);

    const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{item.user.name}</Text>
              {item.user.verified && (
                <Ionicons name="checkmark-circle" size={16} color="#1DA1F2" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.postTime}>{formatTime(item.date)}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.postContent}>{item.content}</Text>

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons 
              name={liked ? "heart" : "heart-outline"} 
              size={20} 
              color={liked ? "#e91e63" : "#666"} 
            />
            <Text style={[styles.actionText, liked && styles.likedText]}>{likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="repeat-outline" size={20} color="#666" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => router.push('/profile')}>
                <Image source={{ uri: currentUser.avatar }} style={styles.headerAvatar} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Inicio</Text>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="white" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          keyboardVerticalOffset={80}
          style={{ flex: 1 }}
        >
          {/* Create Post */}
          <View style={styles.createPostContainer}>
            <Image source={{ uri: currentUser.avatar }} style={styles.createPostAvatar} />
            <View style={styles.createPostInput}>
              <TextInput
                placeholder="¿Qué estás pensando?"
                value={newPost}
                onChangeText={setNewPost}
                multiline
                style={styles.textInput}
                placeholderTextColor="#999"
              />
              <View style={styles.createPostActions}>
                <View style={styles.postOptions}>
                  <TouchableOpacity style={styles.postOption}>
                    <Ionicons name="image-outline" size={20} color="#667eea" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postOption}>
                    <Ionicons name="location-outline" size={20} color="#667eea" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postOption}>
                    <Ionicons name="happy-outline" size={20} color="#667eea" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={[styles.publishButton, (!newPost.trim() || isPosting) && styles.publishButtonDisabled]} 
                  onPress={onPublish}
                  disabled={!newPost.trim() || isPosting}
                >
                  <LinearGradient
                    colors={(!newPost.trim() || isPosting) ? ['#ccc', '#999'] : ['#667eea', '#764ba2']}
                    style={styles.publishGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.publishText}>
                      {isPosting ? 'Publicando...' : 'Publicar'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Posts Feed */}
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem item={item} />}
            contentContainerStyle={styles.feedContainer}
            showsVerticalScrollIndicator={false}
            refreshing={false}
            onRefresh={() => {}}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerGradient: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4757',
  },
  createPostContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  createPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  createPostInput: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 40,
    marginBottom: 12,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postOptions: {
    flexDirection: 'row',
    gap: 16,
  },
  postOption: {
    padding: 8,
  },
  publishButton: {
    borderRadius: 20,
  },
  publishButtonDisabled: {
    opacity: 0.5,
  },
  publishGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  feedContainer: {
    paddingBottom: 100,
  },
  postContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  postTime: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    minWidth: 60,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  likedText: {
    color: '#e91e63',
  },
});