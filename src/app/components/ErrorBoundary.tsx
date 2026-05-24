import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
  context?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.context ? ` - ${this.props.context}` : ''}]`, error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-gray-900 mb-2">Algo salió mal</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Ocurrió un error inesperado. Puedes intentar de nuevo o volver al inicio.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details className="mb-6 w-full max-w-xs text-left">
              <summary className="text-xs text-gray-400 cursor-pointer mb-2">Detalles del error</summary>
              <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-auto text-red-600 whitespace-pre-wrap">
                {this.state.error.message}
              </pre>
            </details>
          )}
          <div className="flex gap-3">
            <Button
              onClick={this.handleReset}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
            >
              <RefreshCw className="h-4 w-4" />
              Intentar de nuevo
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ScreenErrorBoundaryProps {
  children: React.ReactNode;
  onGoHome?: () => void;
  context?: string;
}

interface ScreenErrorState {
  hasError: boolean;
  error: Error | null;
}

export class ScreenErrorBoundary extends Component<ScreenErrorBoundaryProps, ScreenErrorState> {
  constructor(props: ScreenErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ScreenErrorState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ScreenError${this.props.context ? ` - ${this.props.context}` : ''}]`, error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-50 p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-gray-900 mb-3">Pantalla no disponible</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
            Esta sección presentó un error. Tu información está segura.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details className="mb-6 w-full max-w-sm text-left">
              <summary className="text-xs text-gray-400 cursor-pointer mb-2">Detalles del error</summary>
              <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-auto text-red-600 whitespace-pre-wrap">
                {this.state.error.message}
              </pre>
            </details>
          )}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-12"
            >
              <RefreshCw className="h-4 w-4" />
              Intentar de nuevo
            </Button>
            {this.props.onGoHome && (
              <Button
                onClick={() => {
                  this.handleReset();
                  this.props.onGoHome?.();
                }}
                variant="outline"
                className="flex items-center justify-center gap-2 rounded-2xl h-12 border-2 text-blue-500 border-blue-200"
              >
                <Home className="h-4 w-4" />
                Ir al inicio
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
