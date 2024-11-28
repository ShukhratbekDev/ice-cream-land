import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { createOrder, OrderPayload } from '@/utils/api-requests';

export const useCreateOrder = (): UseMutationResult<void, Error, OrderPayload> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, OrderPayload>({
    mutationFn: createOrder,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
