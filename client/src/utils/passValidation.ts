export const validatePassword = (password: string) => {
  const minLength = 6;

  return {
    isValid: password.length >= minLength,
    requirements: [
      {
        met: password.length >= minLength,
        text: `At least ${minLength} characters`,
      },
    ],
  };
};
