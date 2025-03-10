export default () => ({
    port: parseInt(process.env.PORT as string) || 3000,
  });