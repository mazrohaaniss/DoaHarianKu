import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import quizData from '../dataQuiz';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.25;
const TOTAL_TIME = 600; // 10 minutes in seconds

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [totalTimer, setTotalTimer] = useState(TOTAL_TIME);

  useEffect(() => {
    if (quizStarted && !showResults) {
      const countdown = setInterval(() => {
        setTotalTimer(prevTime => {
          if (prevTime === 1) {
            setShowResults(true);
            clearInterval(countdown);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [quizStarted, showResults]);

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption
    });
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(selectedAnswers).forEach(questionId => {
      if (selectedAnswers[questionId] === quizData[questionId - 1].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleFinish = () => {
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin mengumpulkan jawaban? Pastikan semua jawaban sudah benar.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Ya", onPress: () => setShowResults(true) }
      ]
    );
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#2D6A4F';
    if (score >= 6) return '#FFA500';
    return '#FF4444';
  };

  const renderTimer = () => (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        {`${
          Math.floor(totalTimer / 60)
        }:${totalTimer % 60 < 10 ? `0${totalTimer % 60}` : totalTimer % 60}`}
      </Text>
    </View>
  );

  const renderWelcomeCard = () => (
    <View style={styles.welcomeCard}>
      <Image 
        source={{ uri: 'https://i.pinimg.com/564x/79/12/d7/7912d7bdfc363885258a31a2a7fd5a88.jpg' }} 
        style={styles.welcomeImage} 
      />
      <Text style={styles.welcomeText}>
        Welcome to Quiz Doa HarianKu 📝 Jangan lupa baca Basmallah dulu yaa 😊✨
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => setQuizStarted(true)}
      >
        <Text style={styles.startButtonText}>Mulai</Text>
      </TouchableOpacity>
    </View>
  );

  const renderQuestion = () => {
    const question = quizData[currentQuestion];
    return (
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>Soal {currentQuestion + 1}/10</Text>
          {renderTimer()}
          <FontAwesome name="question-circle" size={24} color="#2D6A4F" />
        </View>
        
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.questionColumns}>
          {question.question_arabic && (
            <Text style={styles.arabicText}>{question.question_arabic}</Text>
          )}
          {question.question_latin && (
            <Text style={styles.latinText}>{question.question_latin}</Text>
          )}
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswers[question.id] === index && styles.selectedOption
              ]}
              onPress={() => handleAnswer(question.id, index)}
            >
              <Text style={[
                styles.optionText,
                selectedAnswers[question.id] === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.navigationButtonsContainer}>
          {currentQuestion > 0 && (
            <TouchableOpacity 
              style={styles.navigationButton} 
              onPress={handlePreviousQuestion}
            >
              <Text style={styles.navigationButtonText}>Sebelumnya</Text>
            </TouchableOpacity>
          )}
          {currentQuestion < quizData.length - 1 ? (
            <TouchableOpacity 
              style={styles.navigationButton} 
              onPress={handleNextQuestion}
            >
              <Text style={styles.navigationButtonText}>Selanjutnya</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>Selesai</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderResults = () => {
    const score = calculateScore();
    return (
      <View style={styles.resultsCard}>
        <View style={styles.scoreCircle}>
          <Text style={[styles.scoreText, { color: getScoreColor(score) }]}>
            {score}/10
          </Text>
        </View>
        <Text style={styles.resultTitle}>
          {score >= 8 ? 'Mashaa Allah!' : score >= 6 ? 'Alhamdulillah!' : 'Semangat!'}
        </Text>
        <Text style={styles.resultSubtitle}>
          {score >= 8 ? 'Pengetahuan doa-doa Anda sangat baik!' : 
           score >= 6 ? 'Terus tingkatkan pengetahuan doa-doa Anda!' :
           'Jangan menyerah, terus belajar!'}
        </Text>
        
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setCurrentQuestion(0);
            setSelectedAnswers({});
            setShowResults(false);
            setQuizStarted(false);
            setTotalTimer(TOTAL_TIME);
          }}
        >
          <FontAwesome name="refresh" size={20} color="white" />
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground 
          source={{ uri: 'https://cdn.pixabay.com/photo/2014/03/03/16/15/mosque-279015_640.jpg' }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(45, 106, 79, 0.5)', 'rgba(27, 67, 50, 0.9)']}
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Quiz Doa-doa</Text>
              <Text style={styles.headerSubtitle}>Uji Pengetahuan Anda</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <ScrollView style={styles.content}>
        {!quizStarted ? (
          renderWelcomeCard()
        ) : !showResults ? (
          <>
            {renderQuestion()}
          </>
        ) : (
          renderResults()
        )}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4332',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B7C9B5',
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    
  },
  welcomeCard: {
    backgroundColor: 'white', // Warna kartu putih
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  welcomeImage: {
    width: '100%',
    height: 230,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 22,
    
  },
  welcomeText: {
    fontSize: 18,
    color: '#567567',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  timerContainer: {
    backgroundColor: '#D4ECDD', // Background warna hijau muda
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D6A4F', // Warna teks timer hijau tua untuk kontras
  },
  
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D6A4F',
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  questionColumns: {
    flexDirection: 'column',
  },
  arabicText: {
    fontSize: 24,
    color: '#2D6A4F',
    textAlign: 'center',
    fontWeight: '',
    marginBottom: 10,
  },
  latinText: {
    fontSize: 18,
    color: '#C58F00',
    textAlign: 'center',
    fontWeight: '',
    marginBottom: 10,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#D9E3D9',
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#2D6A4F',
  },
  optionText: {
    color: 'black',
  },
  selectedOptionText: {
    color: 'white',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#A5A5A5',
  },
  navigationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  finishButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D6A4F',
    marginBottom: 10,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default QuizScreen;
