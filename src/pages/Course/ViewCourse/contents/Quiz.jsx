import React, { useEffect, useState } from "react";
import { Card, Typography, message, Button } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizQuestion from "../../../../components/QuizQuestion";
import { configs } from "../../../../configs";

const { Title } = Typography;

const Quiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataQuiz = async () => {
    try {
      const quiz = await axios.get(`${configs.API_BASE_URL}/quizSQL/${quizId}`);
      const response = await axios.get(
        `${configs.API_BASE_URL}/quizzes/${quiz.data.quizFB_id}/questions`
      );
      setQuiz(quiz.data);
      setQuestions(response.data.data);
      setIsQuizStarted(true);
      setCorrectAnswers(0);
    } catch (error) {
      message.error("Lỗi lấy câu hỏi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataQuiz();
  }, [quizId]);

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <Card style={{ maxWidth: 600, margin: "auto", marginTop: 40 }}>
        <Title level={4}>Đang tải câu hỏi...</Title>
      </Card>
    );
  }

  if (!isLoading && questions.length === 0) {
    return (
      <Card style={{ maxWidth: 600, margin: "auto", marginTop: 40 }}>
        <Title level={4}>Quiz này chưa có câu hỏi nào.</Title>
      </Card>
    );
  }

  return (
    <div className="container">
      <Title style={{ maxWidth: 600, margin: "auto", marginTop: 40 }} level={2}>
        {quiz.name}
      </Title>
      {currentIndex >= questions.length ? (
        <Card style={{ maxWidth: 600, margin: "auto", marginTop: 40 }}>
          <Title level={4}>Kết quả</Title>
          <Title
            level={2}
          >{`Điểm của bạn: ${correctAnswers} / ${questions.length}`}</Title>
          <Button type="primary" onClick={() => window.location.reload()}>
            Làm lại
          </Button>
        </Card>
      ) : (
        <Card style={{ maxWidth: 600, margin: "auto", marginTop: 10 }}>
          <Title level={4}>
            Câu {currentIndex + 1} / {questions.length}
          </Title>
          <QuizQuestion
            question={questions[currentIndex]}
            onNext={handleNext}
            isLast={currentIndex + 1 === questions.length}
            quizId={quiz.quizFB_id}
          />
        </Card>
      )}
    </div>
  );
};

export default Quiz;
