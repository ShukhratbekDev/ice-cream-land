import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { clearCart } from '@/utils/api-requests';

export const useClearCart = (): UseMutationResult => {
  return useMutation({
    mutationFn: clearCart,
  });
};
