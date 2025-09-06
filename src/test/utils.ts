import { render } from "@testing-library/react";
import { ReactElement } from "react";

// Custom render function with common providers
export const renderWithProviders = (ui: ReactElement) => {
  // Add providers here as needed (Redux, Router, Theme, etc.)
  return render(ui);
};

// Mock Electron API for testing
export const mockElectronAPI = {
  openFile: jest.fn(),
  onMenuFileOpen: jest.fn(),
  onMenuFileNew: jest.fn(),
};

// Setup mock for window.electronAPI
Object.defineProperty(window, "electronAPI", {
  value: mockElectronAPI,
  writable: true,
});
