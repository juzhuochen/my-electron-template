import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Vite and React logos', () => {
    render(<App />);

    const viteLogo = screen.getByAltText('Vite logo');
    const reactLogo = screen.getByAltText('React logo');

    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  test('renders the main heading', () => {
    render(<App />);

    const heading = screen.getByText('Vite + React');
    expect(heading).toBeInTheDocument();
  });

  test('counter button works correctly', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    // Click the button and check if count increases
    fireEvent.click(button);
    expect(screen.getByText('count is 1')).toBeInTheDocument();

    // Click again
    fireEvent.click(button);
    expect(screen.getByText('count is 2')).toBeInTheDocument();
  });

  test('renders custom message', () => {
    render(<App />);

    const customMessage = screen.getByText('hello world write by juzhuo');
    expect(customMessage).toBeInTheDocument();
  });
});
