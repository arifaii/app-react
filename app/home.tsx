import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Definición de tipos
type User = {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
};

type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
};

type Post = {
  id: string;
  user: User;
  content: string;
  date: Date;
  likes: number;
  comments: Comment[];
  shares: number;
};

// Datos de usuarios para generar posts aleatorios
const randomUsers: User[] = [
  { id: 'u4', name: 'María González', avatar: 'https://i.pravatar.cc/150?img=1', verified: false },
  { id: 'u5', name: 'Carlos Ruiz', avatar: 'https://i.pravatar.cc/150?img=3', verified: true },
  { id: 'u6', name: 'Ana Martínez', avatar: 'https://i.pravatar.cc/150?img=9', verified: false },
  { id: 'u7', name: 'Diego López', avatar: 'https://i.pravatar.cc/150?img=7', verified: true },
  { id: 'u8', name: 'Sofia Chen', avatar: 'https://i.pravatar.cc/150?img=4', verified: false },
];

// Posts aleatorios para simular refresh
const randomPosts = [
  "¡Acabo de terminar mi café matutino y estoy listo para conquistar el día! ☕️✨",
  "¿Alguien más siente que los lunes deberían ser opcionales? 😴",
  "Trabajando en un nuevo proyecto con Flutter. ¡La curva de aprendizaje vale la pena! 🚀",
  "Recomiendo este libro que estoy leyendo: 'Clean Code'. Cambiará tu forma de programar 📚",
  "¿Cuál es su framework favorito para desarrollo web? Estoy entre React y Vue 🤔",
];

// Posts iniciales
const initialPosts: Post[] = [
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
    comments: [],
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
    comments: [
      {
        id: 'c1',
        user: { name: 'Tech Expert', avatar: 'https://i.pravatar.cc/150?img=10' },
        content: 'Te recomiendo Expo, React Navigation y Reanimated!',
        date: new Date('2025-07-01T09:50:00'),
      }
    ],
    shares: 2,
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  
  const currentUser: User = {
    id: 'u1',
    name: 'Ariel Faivisovich',
    avatar: 'https://i.pravatar.cc/150?img=12',
    verified: true,
  };

  // Generar post aleatorio
  const generateRandomPost = (): Post => {
    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    const randomContent = randomPosts[Math.floor(Math.random() * randomPosts.length)];
    
    return {
      id: `random_${Date.now()}_${Math.random()}`,
      user: randomUser,
      content: randomContent,
      date: new Date(),
      likes: Math.floor(Math.random() * 50),
      comments: [],
      shares: Math.floor(Math.random() * 10),
    };
  };

  // Manejar refresh
  const onRefresh = async () => {
    setRefreshing(true);
    
    setTimeout(() => {
      const newPosts: Post[] = [];
      const numNewPosts = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numNewPosts; i++) {
        newPosts.push(generateRandomPost());
      }
      
      setPosts([...newPosts, ...posts]);
      setRefreshing(false);
    }, 1500);
  };

  // Publicar nuevo post
  const onPublish = async () => {
    if (!newPost.trim()) return;

    setIsPosting(true);
    
    setTimeout(() => {
      const post: Post = {
        id: Date.now().toString(),
        user: currentUser,
        content: newPost.trim(),
        date: new Date(),
        likes: 0,
        comments: [],
        shares: 0,
      };

      setPosts([post, ...posts]);
      setNewPost('');
      setIsPosting(false);
    }, 1000);
  };

  // Abrir modal de comentarios
  const openComments = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  // Agregar comentario
  const addComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      user: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      content: newComment.trim(),
      date: new Date(),
    };

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: [...post.comments, comment]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setSelectedPost({
      ...selectedPost,
      comments: [...selectedPost.comments, comment]
    });
    setNewComment('');
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

  const PostItem = ({ item }: { item: Post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes);

    const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    const handleShare = () => {
      Alert.alert(
        'Compartir',
        '¿Cómo te gustaría compartir este post?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Copiar enlace', onPress: () => Alert.alert('Enlace copiado') },
          { text: 'Compartir en...', onPress: () => Alert.alert('Compartiendo...') }
        ]
      );
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

          <TouchableOpacity style={styles.actionButton} onPress={() => openComments(item)}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.actionText}>{item.comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="repeat-outline" size={20} color="#666" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CommentItem = ({ comment }: { comment: Comment }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUserName}>{comment.user.name}</Text>
          <Text style={styles.commentTime}>{formatTime(comment.date)}</Text>
        </View>
        <Text style={styles.commentText}>{comment.content}</Text>
      </View>
    </View>
  );

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
          <FlatList<Post>
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem item={item} />}
            contentContainerStyle={styles.feedContainer}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
              refreshing ? (
                <View style={styles.refreshingIndicator}>
                  <Text style={styles.refreshingText}>Cargando nuevos posts...</Text>
                </View>
              ) : null
            }
          />
        </KeyboardAvoidingView>

        {/* Modal de Comentarios */}
        <Modal
          visible={showComments}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowComments(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={() => setShowComments(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Comentarios</Text>
              <View style={{ width: 24 }} />
            </View>

            {selectedPost && (
              <>
                {/* Post original en el modal */}
                <View style={styles.originalPost}>
                  <View style={styles.postHeader}>
                    <Image source={{ uri: selectedPost.user.avatar }} style={styles.userAvatar} />
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{selectedPost.user.name}</Text>
                      <Text style={styles.postTime}>{formatTime(selectedPost.date)}</Text>
                    </View>
                  </View>
                  <Text style={styles.postContent}>{selectedPost.content}</Text>
                </View>

                {/* Lista de comentarios */}
                <FlatList<Comment>
                  data={selectedPost.comments}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <CommentItem comment={item} />}
                  style={styles.commentsList}
                  ListEmptyComponent={
                    <View style={styles.emptyComments}>
                      <Text style={styles.emptyCommentsText}>
                        Sé el primero en comentar
                      </Text>
                    </View>
                  }
                />

                {/* Input para nuevo comentario */}
                <View style={styles.commentInputContainer}>
                  <Image source={{ uri: currentUser.avatar }} style={styles.commentInputAvatar} />
                  <TextInput
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChangeText={setNewComment}
                    style={styles.commentInput}
                    multiline
                  />
                  <TouchableOpacity 
                    style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
                    onPress={addComment}
                    disabled={!newComment.trim()}
                  >
                    <Ionicons 
                      name="send" 
                      size={20} 
                      color={newComment.trim() ? "#667eea" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

// Estilos (igual que en tu código original)
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
  refreshingIndicator: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  refreshingText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
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
  
  // Estilos del Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  originalPost: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#667eea',
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyComments: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyCommentsText: {
    fontSize: 16,
    color: '#6b7280',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  commentInputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.3,
  },
});