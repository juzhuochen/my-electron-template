export default {
  preset: "ts-jest/presets/default-esm",
  // 指定测试环境
  testEnvironment: "jsdom",
  // 告诉 Jest 将 .ts 和 .tsx 视为 ES Module
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/renderer/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  // 测试环境准备文件
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  // 测试文件匹配规则
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
  ],
  // 收集覆盖率的来源文件
  collectCoverageFrom: [
    "src/renderer/**/*.(ts|tsx)",
    "!src/renderer/**/*.d.ts",
    "!src/renderer/main.tsx",
  ],
  // 转换规则
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
};
