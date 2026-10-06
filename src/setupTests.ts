import '@testing-library/jest-dom';

// Jest 29 + jsdom không luôn cung cấp fetch như môi trường trình duyệt thật.
// Tạo fetch mock mặc định để các test có thể dùng jest.spyOn(global, 'fetch').
Object.defineProperty(globalThis, 'fetch', {
  writable: true,
  configurable: true,
  value: jest.fn(),
});
