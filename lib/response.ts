export default ({ status = 200, message = '', data = null }: { status?: number; message?: string; data?: any }) => {
  return {
    status,
    message,
    data,
  };
};
