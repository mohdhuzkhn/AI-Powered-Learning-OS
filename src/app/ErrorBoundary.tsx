import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled application error', error, info);
  }
  render() {
    return this.state.hasError ? (
      <main className="error-state">
        <h1>Something went wrong</h1>
        <p>Refresh the page to continue working in Learning OS.</p>
      </main>
    ) : (
      this.props.children
    );
  }
}
