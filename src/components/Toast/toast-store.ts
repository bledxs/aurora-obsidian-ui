import type * as React from 'react';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  altText?: string;
}

export interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number;
  action?: ToastAction;
  cancel?: ToastAction;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

type ToastSubscriber = (toasts: ToastData[]) => void;

let toastList: ToastData[] = [];
const subscribers = new Set<ToastSubscriber>();

function notify() {
  subscribers.forEach((sub) => {
    sub([...toastList]);
  });
}

export function subscribeToasts(subscriber: ToastSubscriber) {
  subscribers.add(subscriber);
  subscriber([...toastList]);
  return () => {
    subscribers.delete(subscriber);
  };
}

export function createToast(toastData: Omit<ToastData, 'id'> & { id?: string }): string {
  const id = toastData.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const newToast: ToastData = {
    id,
    duration: 4000,
    type: 'default',
    ...toastData,
  };

  toastList = [newToast, ...toastList.filter((t) => t.id !== id)].slice(0, 5);
  notify();
  return id;
}

export function dismissToast(id?: string) {
  if (id) {
    const target = toastList.find((t) => t.id === id);
    target?.onDismiss?.();
    toastList = toastList.filter((t) => t.id !== id);
  } else {
    toastList.forEach((t) => {
      t.onDismiss?.();
    });
    toastList = [];
  }
  notify();
}

export const toast = (title: React.ReactNode, options?: Omit<ToastData, 'id' | 'title'>) => {
  return createToast({ title, ...options });
};

toast.success = (title: React.ReactNode, options?: Omit<ToastData, 'id' | 'title' | 'type'>) => {
  return createToast({ title, type: 'success', ...options });
};

toast.error = (title: React.ReactNode, options?: Omit<ToastData, 'id' | 'title' | 'type'>) => {
  return createToast({ title, type: 'error', ...options });
};

toast.warning = (title: React.ReactNode, options?: Omit<ToastData, 'id' | 'title' | 'type'>) => {
  return createToast({ title, type: 'warning', ...options });
};

toast.info = (title: React.ReactNode, options?: Omit<ToastData, 'id' | 'title' | 'type'>) => {
  return createToast({ title, type: 'info', ...options });
};

toast.promise = async <T>(
  promise: Promise<T> | (() => Promise<T>),
  msgs: {
    loading: React.ReactNode;
    success: React.ReactNode | ((data: T) => React.ReactNode);
    error: React.ReactNode | ((err: unknown) => React.ReactNode);
  },
  options?: Omit<ToastData, 'id' | 'title'>,
) => {
  const id = createToast({
    title: msgs.loading,
    type: 'info',
    duration: Infinity,
    ...options,
  });
  try {
    const fn = typeof promise === 'function' ? promise() : promise;
    const result = await fn;
    dismissToast(id);
    const successTitle = typeof msgs.success === 'function' ? msgs.success(result) : msgs.success;
    createToast({ title: successTitle, type: 'success', ...options });
    return result;
  } catch (error) {
    dismissToast(id);
    const errorTitle = typeof msgs.error === 'function' ? msgs.error(error) : msgs.error;
    createToast({ title: errorTitle, type: 'error', ...options });
    throw error;
  }
};

toast.dismiss = dismissToast;
