import type { MessageState } from '@/types';
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    messages: ''
  }),
    actions: {
        updateMessage(messages: string):void {
            this.messages = messages;
        },
        resetMessage(): void {
            this.messages = '';
        }
    }
})
