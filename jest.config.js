module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [require.resolve('@testing-library/jest-dom')],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
    },
};