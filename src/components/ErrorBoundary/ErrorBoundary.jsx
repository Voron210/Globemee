import React from "react";
import Modal from "../Modal/Modal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // Логирование ошибки и информации в консоль
    console.error("Ошибка:", error);
    console.error("Информация об ошибке:", errorInfo);

    // Отправка отчета об ошибке на сервер или сторонний сервис
    this.sendErrorReport(error, errorInfo);
  }

  sendErrorReport(error, errorInfo) {
    // Логика отправки ошибки на сервер или в сторонний сервис
    fetch("/api/logError", {
      method: "POST",
      body: JSON.stringify({
        error: error.toString(),
        errorInfo: errorInfo.componentStack,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  handleReset = () => {
    // Сбрасываем состояние, чтобы снова можно было поймать ошибки
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal>
          <h1>Что-то пошло не так.</h1>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.handleReset}>Попробовать снова</button>
        </Modal>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;