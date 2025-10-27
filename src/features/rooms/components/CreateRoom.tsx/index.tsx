import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GameMode } from '@/shared/types/common.types';
import { RANK_TIERS } from '@/shared/utils/constants';
import { useCreateRoom } from '@/features/rooms/api/roomsApi';

interface CreateRoomModalProps {
  mode: GameMode;
  onClose: () => void;
}

const createRoomSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  maxPlayers: z.number().min(2).max(4),
  duration: z.number().min(5).max(30),
  entryFee: z.number().min(0),
  isPrivate: z.boolean(),
  password: z.string().optional(),
});

type CreateRoomForm = z.infer<typeof createRoomSchema>;

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ mode, onClose }) => {
  const navigate = useNavigate();
  const createRoom = useCreateRoom();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Room`,
      maxPlayers: 4,
      duration: 15,
      entryFee: mode === 'rank' ? RANK_TIERS.AMATEUR.entryFee : 0,
      isPrivate: false,
    },
  });

  const isPrivate = watch('isPrivate');

  const onSubmit = async (data: CreateRoomForm) => {
    try {
      const result = await createRoom.mutateAsync({
        name: data.name,
        mode,
        settings: {
          maxPlayers: data.maxPlayers,
          entryFee: data.entryFee,
          duration: data.duration,
          isPrivate: data.isPrivate,
          password: data.password,
        },
      });
      navigate(`/lobby/${result.roomId}`);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Room</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Name
            </label>
            <input
              {...register('name')}
              type="text"
              className="input-field"
              placeholder="Enter room name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Max Players */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Players
            </label>
            <select {...register('maxPlayers', { valueAsNumber: true })} className="input-field">
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              {...register('duration', { valueAsNumber: true })}
              type="number"
              min={5}
              max={30}
              className="input-field"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>

          {/* Entry Fee (for rank/celebrity) */}
          {mode !== 'free' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Fee (₦)
              </label>
              {mode === 'rank' ? (
                <select {...register('entryFee', { valueAsNumber: true })} className="input-field">
                  <option value={RANK_TIERS.AMATEUR.entryFee}>
                    Amateur - ₦{RANK_TIERS.AMATEUR.entryFee}
                  </option>
                  <option value={RANK_TIERS.MASTER.entryFee}>
                    Master - ₦{RANK_TIERS.MASTER.entryFee}
                  </option>
                  <option value={RANK_TIERS.LORD.entryFee}>
                    Lord - ₦{RANK_TIERS.LORD.entryFee}
                  </option>
                </select>
              ) : (
                <input
                  {...register('entryFee', { valueAsNumber: true })}
                  type="number"
                  min={100}
                  className="input-field"
                />
              )}
            </div>
          )}

          {/* Private Room */}
          <div className="flex items-center space-x-2">
            <input
              {...register('isPrivate')}
              type="checkbox"
              id="isPrivate"
              className="w-4 h-4 text-primary-500 rounded"
            />
            <label htmlFor="isPrivate" className="text-sm text-gray-700">
              Make room private
            </label>
          </div>

          {/* Password (if private) */}
          {isPrivate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="input-field"
                placeholder="Enter room password"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createRoom.isPending}
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
            >
              {createRoom.isPending ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;