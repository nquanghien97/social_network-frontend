import { create } from 'zustand';
import { Socket } from 'socket.io-client';

type SocketStore = {
  socket: Socket | undefined;
  onlineUserIds: string[];
  setSocket: (socket: Socket) => void;
  setOnlineUserIds: (prevUserIds: string[] | ((prevUserIds: string[]) => string[])) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: undefined,
  onlineUserIds: [],
  setSocket: (socket) => set({ socket }),
  setOnlineUserIds: (prevUserIds) => set({ onlineUserIds: typeof prevUserIds === 'function' ? prevUserIds([]) : prevUserIds }),
}));
