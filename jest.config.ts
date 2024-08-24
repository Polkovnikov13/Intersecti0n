import type {Config} from 'jest';

const config: Config = {
  // Автоматически очищать мок-данные перед каждым тестом
  clearMocks: true,

  // Сборка покрытия тестов
  collectCoverage: true,
  coverageDirectory: "coverage",

  // Использование ts-jest для трансформации TypeScript файлов
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Для трансформации TypeScript файлов
  },

  // Игнорирование трансформации для node_modules
  transformIgnorePatterns: [
    '/node_modules/',
  ],

  // Поддержка файлов с расширением .ts и .tsx
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  // Среда выполнения тестов (node по умолчанию)
  testEnvironment: "node",

  // Паттерны для поиска тестовых файлов
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};

export default config;

