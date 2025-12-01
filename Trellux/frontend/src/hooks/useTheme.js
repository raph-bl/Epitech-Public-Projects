// This hook is now a wrapper around the ThemeContext
// Kept for backward compatibility with existing components
import { useTheme as useThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  return [darkMode, setDarkMode];
};